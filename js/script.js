import API_KEY from './apiKey.js'

const apiCountryURL = 'https://countryflagsapi.com/png/'

const cityInput = document.querySelector('#cityInput')
const searchBtn = document.querySelector('#search')

const iconElement = document.querySelector('#weatherIcon')
const tempElement = document.querySelector('#temperature')
const descElement = document.querySelector('#weatherDescription')
const cityElement = document.querySelector('#city')
const countryElement = document.querySelector('#country')
const countryFlagElement = document.querySelector('#countryFlag')
const feelsLikeElement = document.querySelector('#feelsLike')
const humidityElement = document.querySelector('#humidity')

const weatherDataCard = document.querySelector('#weatherData')

const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=en`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    return data
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city)

    iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    tempElement.innerText = data.main.temp
    descElement.innerText = data.weather[0].description
    cityElement.innerText = data.name + ', '
    countryElement.innerText = data.sys.country
    countryFlagElement.setAttribute('src', apiCountryURL + data.sys.country)
    feelsLikeElement.innerText = data.main.feels_like
    humidityElement.innerText = data.main.humidity

    weatherDataCard.classList.remove('hide')
}

searchBtn.addEventListener('click', (e) => {   
    e.preventDefault()
    const city = cityInput.value
    showWeatherData(city)
})

cityInput.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        const city = e.target.value
        showWeatherData(city)
    }
})
