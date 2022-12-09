/*
* Приложение должно запрашивать у пользователя его координаты через html5 geolocation api браузера.
* Если все получилось, то запрашивать погоду по этим координатам. Для этого есть метод
* */

const show = document.getElementById('demo')
const btn = document.body.querySelector('.heart__btn')
const err = 'Геолокация не поддерживается этим браузером.'
const temperature = document.querySelector('.heart__degreeCelsius')
const city = document.querySelector('.heart__locations')



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




}
/*font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 36px;
/* identical to box height, or 180% */




function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition, err => {
            temperature.innerHTML= 'Ooops. Something went wrong.'
            temperature.style.fontWeight = "400px"
            temperature.style.fontSize = "20px"
            temperature.style.lineHeight = "36px"

            city.innerHTML = 'Error info'
            city.style.opacity = '0.75'
            city.style.fontWeight = "400px"
            city.style.fontSize = "12px"
            city.style.lineHeight = "15px"


            btn.style.backgroundColor = 'white'
            btn.style.width = '140px'
            btn.style.height = '48px'
            btn.style.borderRadius = '8px'
            btn.style.backgroundColor = 'white'
            btn.style.fontFamily = 'Inter'
            btn.style.textDecoration = 'none'
            btn.style.color = '#4C01E0'
            btn.style.fontWeight = '400'
            btn.style.fontSize = '20px'
            btn.style.lineHeight = '36px'



        })
}
getLocation()

