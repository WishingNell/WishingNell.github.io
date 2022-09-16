const EAP = ({
	container,
	tracklist,
	directory
} = {}) => {
	if (!(container instanceof Element)) {
		console.error('Invalid audio container given. Needs to be an HTML Element.')
		return
	}

	const state = new Proxy({}, {
		set(target, key, value) {
			if (stateActions[key] && value !== state[key]) {
				stateActions[key](value)
			}
			const audio = target.audio || {}
			if (!Reflect.has(target, key) && Reflect.has(audio, key)) {
				target.audio[key] = value
			} else {
				target[key] = value
			}
			return true
		},
		get(target, prop, receiver) {
			const audio = target.audio || {}
			if (!Reflect.has(target, prop) && Reflect.has(audio, prop)) {
				if (typeof audio[prop] === 'function') {
					return audio[prop].bind(audio)
				}
				return Reflect.get(audio, prop, audio)
			}
			return Reflect.get(...arguments)
		}
	})

	const stateActions = {
		currentTrack(track) {
			// TODO: track title options
			// TODO: Absolute vs relative path
			state.audio.src = `./${state.directory}/${state.tracklist[track].filename}.mp3`
			state.trackTitleDOM.forEach(trackTitle => {
				trackTitle.innerHTML = state.tracklist[track].title
			})
			state.audio.load()
		}
	}

	// TODO: Separate out DOM elements into array then build list
	// TODO: Build things in chunks that make sense and order less relevant
	const setInitialState = () => {
		state.bodyDOM = document.querySelector('body')
		state.containerDOM = container
		state.durationDOM = state.containerDOM.querySelectorAll('.eap-duration')
		state.nextTrackDOM = state.containerDOM.querySelectorAll('.eap-next-track')
		state.pauseDOM = state.containerDOM.querySelectorAll('.eap-pause')
		state.playDOM = state.containerDOM.querySelectorAll('.eap-play')
		state.playPauseDOM = state.containerDOM.querySelectorAll('.eap-play-pause')
		state.previousTrackDOM = state.containerDOM.querySelectorAll('.eap-previous-track')
		state.replayTrackDOM = state.containerDOM.querySelectorAll('.eap-replay-track')
		state.trackTitleDOM = state.containerDOM.querySelectorAll('.eap-track-title')
		state.volumeDOM = state.containerDOM.querySelectorAll('.eap-volume')
		state.audio = new Audio()
		state.directory = directory
		state.tracklist = tracklist
		state.currentTrack = 0
		state.audio.volume = .7
		state.containerDOM.classList.add('eap-paused')
	}

	const setters = {
		canPlay(event) { },
		nextTrack() { setTrack(state.currentTrack + 1)},
		pause() {
			state.pause()
			state.playPauseDOM.forEach(playPauseDOM => {
				container.classList.remove('eap-playing')
				container.classList.add('eap-paused')
			})
		},
		play() {
			state.play()
			state.playPauseDOM.forEach(playPauseDOM => {
				container.classList.remove('eap-paused')
				container.classList.add('eap-playing')
			})
		},
		playPause() {
			state.paused ? state.play() : state.pause()
		},
		previousTrack() { setTrack(state.currentTrack - 1)},
		resetDuration() { state.audio.currentTime = 1 },
		setTrack(index) { setTrack(index)},
		setVolume(volume) { state.audio.volume = volume },
		timeUpdate() {
			const progress = (state.audio.currentTime / state.audio.duration) * 100
			state.duration = progress
		}
	}

	const DOMListeners = {
		play() { state.playDOM.forEach(play => play.addEventListener('click', setters.play)) },
		pause() { state.pauseDOM.forEach(play => play.addEventListener('click', setters.pause)) },
		playPause() { state.playPauseDOM.forEach(play => play.addEventListener('click', setters.playPause)) },
		previousTrack() { state.previousTrackDOM.forEach(play => play.addEventListener('click', setters.previousTrack)) },
		replayTrack() { state.replayTrackDOM.forEach(play => play.addEventListener('click', setters.resetDuration)) },
		nextTrack() { state.nextTrackDOM.forEach(play => play.addEventListener('click', setters.nextTrack)) }
	}

	const audioListeners = {
		canplay() { state.audio.addEventListener('canplay', setters.canPlay) },
		play() { state.audio.addEventListener('play', setters.play) },
		pause() {
			['pause', 'ended'].forEach(eventType => state.audio.addEventListener(eventType, setters.pause))
		},
		timeUpdate() {
			state.audio.addEventListener('timeupdate', durationUpdate)
		},
		volumeUpdate() {
			state.audio.addEventListener('volumechange', volumeUpdate)
		}
	}

	/*** MISC FUNCTIONS ***/
	const setTrack = (index) => {
		console.log('Track changed!')
		if (typeof index !== 'number') {
			state.currentTrack = 0
		} else if (index < 0 || index >= state.tracklist.length) {
			state.currentTrack = 0
		} else {
			state.currentTrack = index
		}
		state.play()
		durationUpdate()
		const event = new CustomEvent('trackChange', {
			bubbles: true,
			detail: {
				currentTrack: state.currentTrack
			}
		})
		state.containerDOM.dispatchEvent(event)
	}

	const volumeUpdate = () => {
		state.volumeDOM.forEach(volumeDOM => {
			const volumePercentage = state.audio.volume * 100
			const volumeProgress = volumeDOM.querySelector('.eap-volume-progress')
			volumeProgress.style.width = `${volumePercentage}%`
		})
	}

	const durationUpdate = () => {
		state.durationDOM.forEach(durationDOM => {
			const durationIndicator = durationDOM.querySelector('.eap-duration-indicator')
			durationIndicator.style.left = `${getPercentProgress()}%`
		})
	}

	const getPercentProgress = () => {
		if (Number.isNaN(state.currentTime) || Number.isNaN(state.duration)) {
			return 0
		}
		return (state.currentTime / state.duration) * 100
	}

	setInitialState()
	for (listener in DOMListeners) {
		DOMListeners[listener]()
	}
	for (listener in audioListeners) {
		audioListeners[listener]()
	}

	const getPositionPercentage = e => {
		const bounds = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - bounds.left
		const y = e.clientY - bounds.top
		return {
			x: x / bounds.width,
			y: y / bounds.height
		}
	}

	// TODO: Make general for vertical bars
	const scrubAudio = e => {
		const { x } = getPositionPercentage(e)
		const audioTime = x * state.audio.duration
		state.audio.currentTime = audioTime
	}

	// TODO: Make general for vertical bars
	const scrubVolume = e => {
		const { x } = getPositionPercentage(e)
		state.audio.volume = x
	}

	state.durationDOM.forEach(durationDOM => {
		durationDOM.addEventListener('mousedown', e => {
			scrubAudio(e)
			const mouseMove = durationDOM.addEventListener('mousemove', scrubAudio)
			const mouseUp = state.bodyDOM.addEventListener('mouseup', e => {
				durationDOM.removeEventListener('mousemove', scrubAudio)
			})
		})
	})

	state.volumeDOM.forEach(volumeDOM => {
		volumeDOM.addEventListener('mousedown', e => {
			scrubVolume(e)
			const mouseMove = volumeDOM.addEventListener('mousemove', scrubVolume)
			const mouseUp = state.bodyDOM.addEventListener('mouseup', e => {
				volumeDOM.removeEventListener('mousemove', scrubVolume)
			})
		})
	})
	

	return {
		...setters,
		state
	}
}
