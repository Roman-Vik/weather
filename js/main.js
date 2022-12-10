/*
* Приложение должно запрашивать у пользователя его координаты через html5 geolocation api браузера.
* Если все получилось, то запрашивать погоду по этим координатам. Для этого есть метод
* */

const show = document.getElementById('demo')
const btn = document.body.querySelector('.heart__btn')
const err = 'Геолокация не поддерживается этим браузером.'
const temperature = document.querySelector('.heart__degreeCelsius')
const city = document.querySelector('.heart__locations')
const heart = document.querySelector('.heart')
const input = document.createElement('input')


async function showPosition(position) {
    /*=====================Данные,ключ, кординаты =============================*/
    const key = 'ee0974e840afecf7dccad218cf9a5207'
    let exclude = 'current'
    let lat = position.coords.latitude
    let long = position.coords.longitude
    /*=========================================================================*/



    /*====================Данные по ключу==============================*/
    async function getWeatherApi() {
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${key}`
        const promise = await fetch(URL)
        const data = await promise.json()

        return await  data
    }
    //возвращаю данные
     let temp = await getWeatherApi()

    /*=============================================================================================*/


    /*===================================Передаю эти данные==========================================================*/
    let temperature = document.querySelector('.heart__degreeCelsius')
    let city = document.querySelector('.heart__locations')
    temperature.innerHTML =  (temp.main.temp - 273).toFixed(1) + '℃'
    city.innerHTML = temp.name
}
/*=============================================================================================*/






/*=====================Проверяем широту и долготу =============================*/
function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition, async function ( err) {
        let data = await callNameCity(reqCity)
           temperature.innerHTML =  (data - 273).toFixed(1) + '℃'

console.log(data)
        })
}
getLocation()

/*============================================================================*/




/*=1====================Получаем город=============================*/
const reqCity = await  determineIP()
//console.log(reqCity)
async  function determineIP (){
    const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_j7ORR9WWSPn9DslGWWQmzJn7PNWRq&ip`
    let promise = await fetch(URL)
    const data = await promise.json()
    return data.location.city
}
/*==================================================*/


/*=2====================Получаем погоду по найденому городу  =============================*/
const call = await callNameCity(reqCity)
//console.log(call)
async function callNameCity (city){
    const key = 'ee0974e840afecf7dccad218cf9a5207'
    const URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    let promise = await fetch(URL)
    const data = await  promise.json()
    return  await data.main.temp
}
/*==================================================*/



/*==================Кнопка==========================*/
function searchCity (){
    /*<input id="search" type="text" placeholder="Type your city here">*/
    btn.textContent = 'Find'
    btn.className = 'btn__heart-err'
    city.style.display = 'none'
    temperature.style.display = 'none'
    input.placeholder='Type your city here'
    input.type='text'
    heart.prepend(input)
}
btn.addEventListener('click', searchCity)
/*============================================*/
