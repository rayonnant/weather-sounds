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
		'1': document.querySelector('.btn_1'),
		'2': document.querySelector('.btn_2'),
		'3': document.querySelector('.btn_3')
	},
	bg: document.querySelector('.bg-img'),
	volumeController: document.querySelector('.volume-controller')
}

const weather = {
	summer: {
		audio: new Audio(summerMP3),
		icon: sunSVG,
		bg:  summerJPG,
		str: '1'
	},
	rain: {
		audio: new Audio(rainMP3),
		icon: cloudSVG,
		bg: rainyJPG,
		str: '2'
	},
	winter: {
		audio: new Audio(winterMP3),
		icon: snowSVG,
		bg: winterJPG,
		str: '3'
	}
}

const changeTheWeather = (clickedWeather) => {
	pageEls.bg.src = weather[clickedWeather].bg

	Object.keys(weather).forEach(key => {
		if (clickedWeather !== key && !weather[key].audio.paused) {
			weather[key].audio.pause()
			pageEls.icon[weather[key].str].src	= weather[key].icon
		}
	})

	if (weather[clickedWeather].audio.paused) {
		weather[clickedWeather].audio.play()
		pageEls.icon[weather[clickedWeather].str].src = pauseSVG
	} else {
		weather[clickedWeather].audio.pause()
		pageEls.icon[weather[clickedWeather].str].src = weather[clickedWeather].icon
	}

}

Object.keys(weather).forEach(key => {
	pageEls.icon[weather[key].str].src = weather[key].icon
})

pageEls.bg.src = summerJPG

pageEls.volumeController.addEventListener('input', () => {
	Object.keys(weather).forEach(key => {
		weather[key].audio.volume = pageEls.volumeController.value
	})
})

Object.keys(pageEls.btn).forEach(key => {
	pageEls.btn[key].addEventListener('click', () => {
		switch (key) {
			case '1':
				changeTheWeather('summer')
				break
			case '2':
				changeTheWeather('rain')
				break
			case '3':
				changeTheWeather('winter')
				break
			default:
				changeTheWeather('summer')
		}
	})
})
