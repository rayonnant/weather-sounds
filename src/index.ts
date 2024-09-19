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

interface IPageElements {
    icon: Record<string, HTMLImageElement | null>
    btn: Record<string, HTMLDivElement | null>
    bg: HTMLImageElement | null,
    volumeController: HTMLInputElement | null
}

enum Seasons {
    SUMMER = 'summer',
    RAIN = 'rain',
    WINTER = 'winter'
}

const pageEls: IPageElements = {
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

const seasonNum: { [key: string]: Seasons } = {
    '1': Seasons.SUMMER,
    '2': Seasons.RAIN,
    '3': Seasons.WINTER
}

const weather: {
    [key in Seasons]: {
        audio: HTMLAudioElement | null,
        icon: string,
        bg: string,
        str: string
    }
} = {
    [Seasons.SUMMER]: {
        audio: new Audio(summerMP3),
        icon: sunSVG,
        bg: summerJPG,
        str: '1'
    },
    [Seasons.RAIN]: {
        audio: new Audio(rainMP3),
        icon: cloudSVG,
        bg: rainyJPG,
        str: '2'
    },
    [Seasons.WINTER]: {
        audio: new Audio(winterMP3),
        icon: snowSVG,
        bg: winterJPG,
        str: '3'
    }
}

const setBaseIcons = (): void => {
    for (const key in seasonNum) {
        const season: Seasons = seasonNum[key]
        if (pageEls.icon[key]) {
            const iconElement: HTMLImageElement | null = pageEls.icon[key]
            if (iconElement) {
                iconElement.src = weather[season].icon
            }
        }
    }
}

const changeTheWeather = (clickedWeather: Seasons): void => {
    if (pageEls.bg) {
        pageEls.bg.src = weather[clickedWeather].bg

        const iconElement: HTMLImageElement | null = pageEls.icon[weather[clickedWeather].str]
        if (iconElement) {

            for (const season in Seasons) {
                const audio: HTMLAudioElement | null = weather[Seasons[season as keyof typeof Seasons]].audio
                if (audio) {
                    if (clickedWeather !== Seasons[season as keyof typeof Seasons] && !audio.paused) {
                        audio.pause()
                        setBaseIcons()
                    }
                }
            }

            const audio: HTMLAudioElement | null = weather[clickedWeather].audio
            if (audio) {
                if (audio.paused) {
                    audio.play().then(function() {
                        iconElement.src = pauseSVG
                    })
                } else {
                    audio.pause()
                    iconElement.src = weather[clickedWeather].icon
                }
            }

        }
    }
}

setBaseIcons()

if (pageEls.bg) {
    pageEls.bg.src = summerJPG
}

if (pageEls.volumeController) {
    const volController: HTMLInputElement = pageEls.volumeController
    pageEls.volumeController.addEventListener('input', (): void => {
        for (const season in Seasons) {
            const audio: HTMLAudioElement | null = weather[Seasons[season as keyof typeof Seasons]].audio
            if (audio) {
                audio.volume = volController.valueAsNumber
            }
        }
    })
}

Object.keys(pageEls.btn).forEach((key: string): void => {
    const btn: HTMLDivElement | null = pageEls.btn[key]
    if (btn) {
        btn.addEventListener('click', (): void => {
            switch (key) {
                case '1':
                    changeTheWeather(Seasons.SUMMER)
                    break
                case '2':
                    changeTheWeather(Seasons.RAIN)
                    break
                case '3':
                    changeTheWeather(Seasons.WINTER)
                    break
                default:
                    changeTheWeather(Seasons.SUMMER)
            }
        })
    }
})
