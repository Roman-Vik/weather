/*
* Приложение должно запрашивать у пользователя его координаты через html5 geolocation api браузера.
* Если все получилось, то запрашивать погоду по этим координатам. Для этого есть метод
* */

const show = document.getElementById('demo')
const btn = document.body.querySelector('.heart__btn')
const err = 'Геолокация не поддерживается этим браузером.'


async function showPosition(position) {
    const key = 'ee0974e840afecf7dccad218cf9a5207'
    let exclude = 'current'
    let lat = position.coords.latitude
    let long = position.coords.longitude


    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${key}`

    async function getWeatherApi() {
        const promise = await fetch(URL)
        const data = await promise.json()
        return data
    }

    let data = await getWeatherApi()
    let temperature = document.querySelector('.heart__degreeCelsius')
    let city = document.querySelector('.heart__locations')

    // temperature.innerHTML =  (data.main.temp -32)   / 1.8
    temperature.innerHTML =  (data.main.temp - 273).toFixed(1) + '℃'
    city.innerHTML = data.name

    console.data

}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    }
}

getLocation()

