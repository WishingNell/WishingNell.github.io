let audioPlayer

window.addEventListener('DOMContentLoaded', (event) => {
	const container = document.querySelector('.demo-player-container')
	const tracklist = [
		{
			title: 'Character',
			filename: '1'
		},
		{
			title: 'Imaging',
			filename: '2'
		}
	]
	audioPlayer = EAP({
		container,
		tracklist,
		directory: '../assets/audios'
	})

	// Starting audio volume 0-1
	audioPlayer.setVolume(.7)
	document.addEventListener('trackChange', (e) => {
		const side = document.querySelector('.demo-player-side-display')
		if (e.detail.currentTrack === 0) {
			side.innerHTML = 'A'
		} else {
			side.innerHTML = 'B'
		}
	})
})
