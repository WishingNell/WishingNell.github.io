const sprite = `
.                                       .
)).               -===-               .((
))).                                 .(((
))))).            .:::.           .((((((
))))))))).        :. .:        .(((((((('
\`))))))))))).     : - :    .((((((((((((
 ))))))))))))))))_:' ':_((((((((((((((('
 \`)))))))))))).-' \\___/ '-._(((((((((((
  \`))))_._.-' __)(     )(_  '-._._(((('
   \`))'---)___)))'\\_ _/'((((__(---'(('
     \`))))))))))))|' '|(((((((((((('
       \`)))))))))/'   '\((((((((('
         \`)))))))|     |((((((('
          \`))))))|     |(((((('
                /'     '\\
               /'       '\\
              /'         '\\
             /'           '\\
             '---..___..---'
`

const sprite2 = `
.                                       .
)).               -===-               .((
))).                                 .(((
))))).            .:::.           .((((((
))))))))).        :_ _:        .(((((((('
\`))))))))))).     : - :    .((((((((((((
 ))))))))))))))))_:' ':_((((((((((((((('
 \`)))))))))))).-' \\___/ '-._(((((((((((
  \`))))_._.-' __)(     )(_  '-._._(((('
   \`))'---)___)))'\\_ _/'((((__(---'(('
     \`))))))))))))|' '|(((((((((((('
       \`)))))))))/'   '\((((((((('
         \`)))))))|     |((((((('
          \`))))))|     |(((((('
                /'     '\\
               /'       '\\
              /'         '\\
             /'           '\\
             '---..___..---'
`

const sprite3 = `
.                                       .
)).               -===-               .((
))).                                 .(((
))))).            .:::.           .((((((
))))))))).        :. .:        .(((((((('
\`))))))))))).     : o :    .((((((((((((
 ))))))))))))))))_:' ':_((((((((((((((('
 \`)))))))))))).-' \\___/ '-._(((((((((((
  \`))))_._.-' __)(     )(_  '-._._(((('
   \`))'---)___)))'\\_ _/'((((__(---'(('
     \`))))))))))))|' '|(((((((((((('
       \`)))))))))/'   '\((((((((('
         \`)))))))|     |((((((('
          \`))))))|     |(((((('
                /'     '\\
               /'       '\\
              /'         '\\
             /'           '\\
             '---..___..---'
`

const sprite4 = `
.                                       .
)).               -===-               .((
))).                                 .(((
))))).            .:::.           .((((((
))))))))).        :* *:        .(((((((('
\`))))))))))).     : - :    .((((((((((((
 ))))))))))))))))_:' ':_((((((((((((((('
 \`)))))))))))).-' \\___/ '-._(((((((((((
  \`))))_._.-' __)(     )(_  '-._._(((('
   \`))'---)___)))'\\_ _/'((((__(---'(('
     \`))))))))))))|' '|(((((((((((('
       \`)))))))))/'   '\((((((((('
         \`)))))))|     |((((((('
          \`))))))|     |(((((('
                /'     '\\
               /'       '\\
              /'         '\\
             /'           '\\
             '---..___..---'
`

const sprite5 = `
*                                       *
))*              ~-===-~              *((
)))*                                 *(((
)))))*            .:::.           *((((((
)))))))))*        :. .:        *((((((((*
\*)))))))))))*     : - :    *((((((((((((
 ))))))))))))))))_:' ':_(((((((((((((((*
 \*)))))))))))).-' \\___/ '-._(((((((((((
  \*))))_*_.-' __)(     )(_  '-._*_((((*
   \*))'---)___)))'\\_ _/'((((__(---'((*
     \*))))))))))))|' '|((((((((((((*
       \*)))))))))/'   '\(((((((((*
         \*)))))))|     |(((((((*
          \*))))))|     |((((((*
               */'     '\\*
              */'       '\\*
             */'         '\\*
            */'           '\\*
           * '---..___..---'*
`

/*** HTML Elements ***/
// Sprite
const spriteHTML = document.querySelector('.sprite')

// Buttons
const feedHTML = document.querySelector('.feed')
const prayHTML = document.querySelector('.pray')
const cleanHTML = document.querySelector('.clean')

// Stats
const hungerHTML = document.querySelector('.hunger')
const powerHTML = document.querySelector('.power')
const purityHTML = document.querySelector('.purity')


/*** Game behavior ***/
const tamogachi = {
    hunger: 10,
    power: 1,
    purity: 100,
    feed: function(amount) {
        this.hunger = this.hunger + amount
        updateStatDisplay()
    },
    pray: function(amount) {
        this.power = this.power + amount
        updateStatDisplay()
    },
    cleanse: function(amount) {
        this.purity = this.purity + amount
        updateStatDisplay()
    }
}

feedHTML.addEventListener('click', () => {
    tamogachi.feed(1)
    eat()
})

prayHTML.addEventListener('click', () => {
    tamogachi.pray(1)
    glow()
})

cleanseHTML.addEventListener('click', () => {
    tamogachi.cleanse(1)
    getClean()
})

/*** Display on HTML things ***/
function updateStatDisplay() {
    hungerHTML.innerHTML = tamogachi.hunger
    powerHTML.innerHTML = tamogachi.power
    purityHTML.innerHTML = tamogachi.purity
}

function blink() {
    spriteHTML.innerHTML = sprite2
    setTimeout(() => {
        spriteHTML.innerHTML = sprite
    }, 250);
}

function eat() {
    spriteHTML.innerHTML = sprite3
    setTimeout(() => {
        spriteHTML.innerHTML = sprite
    }, 250);
}

function glow() {
    spriteHTML.innerHTML = sprite4
    setTimeout(() => {
        spriteHTML.innerHTML = sprite
    }, 250);
}

function getClean() {
    spriteHTML.innerHTML = sprite5
    setTimeout(() => {
        spriteHTML.innerHTML = sprite
    }, 250);
}

/*** Things happening on intervals ***/
// It blinks!
setInterval(blink, 5000)

// It hungers over time :(
setInterval(() => {
    tamogachi.hunger = tamogachi.hunger-1
    updateStatDisplay()
}, 60000)

/*** Initial setup ***/
spriteHTML.innerHTML = sprite
updateStatDisplay()