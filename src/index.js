import './index.scss'
import cloudSVG from './assets/icons/cloud-rain.svg'
import snowSVG from './assets/icons/cloud-snow.svg'
import pauseSVG from './assets/icons/pause.svg'
import sunSVG from './assets/icons/sun.svg'
import rainyJPG from './assets/rainy-bg.jpg'
import summerJPG from './assets/summer-bg.jpg'
import winterJPG from './assets/winter-bg.jpg'
import summerMP3 from './assets/sounds/summer.mp3'
import rainMP3 from './assets/sounds/rain.mp3'
import winterMP3 from './assets/sounds/winter.mp3'

const pageEls = {
	icon: {
		'1': document.querySelector('.btn__icon_1'),
		'2': document.querySelector('.btn__icon_2'),
		'3': document.querySelector('.btn__icon_3')
	},
	btn: {
		'1': document.querySelector('.btn__icon_1'),
		'2': document.querySelector('.btn__icon_2'),
		'3': document.querySelector('.btn__icon_3')
	},
	bg: document.querySelector('.bg-img'),
	volumeController: document.querySelector('.volume-controller')
}

pageEls.icon['1'].src = sunSVG
pageEls.icon['2'].src = cloudSVG
pageEls.icon['3'].src = snowSVG
pageEls.bg.src = summerJPG


const weather = {
	summer: {
		audio: new Audio(summerMP3),
		icon: sunSVG,
		bg:  summerJPG
	},
	rain: {
		audio: new Audio(rainMP3),
		icon: cloudSVG,
		bg: rainyJPG
	},
	winter: {
		audio: new Audio(winterMP3),
		icon: snowSVG,
		bg: winterJPG
	}
}



pageEls.volumeController.addEventListener('input', () => {
	weather.summer.audio.volume = pageEls.volumeController.value
	weather.rain.audio.volume = pageEls.volumeController.value
	weather.winter.audio.volume = pageEls.volumeController.value
})

pageEls.btn['1'].addEventListener('click', () => {
	pageEls.bg.src = summerJPG
	if (weather.summer.audio.paused) {
		weather.summer.audio.play()
		pageEls.icon['1'].src = pauseSVG
	} else {
		weather.summer.audio.pause()
		pageEls.icon['1'].src = sunSVG
	}
})

pageEls.btn['2'].addEventListener('click', () => {
	pageEls.bg.src = rainyJPG
	if (weather.rain.audio.paused) {
		weather.rain.audio.play()
		pageEls.icon['2'].src = pauseSVG
	} else {
		weather.rain.audio.pause()
		pageEls.icon['2'].src = cloudSVG
	}
})

pageEls.btn['3'].addEventListener('click', () => {
	pageEls.bg.src = winterJPG
	if (weather.winter.audio.paused) {
		weather.winter.audio.play()
		pageEls.icon['3'].src = pauseSVG
	} else {
		weather.winter.audio.pause()
		pageEls.icon['3'].src = snowSVG
	}
})
