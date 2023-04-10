const apikey = "2129fd0d09d3b0af52ec836f8ae8a2fe"

let localName = document.querySelector('.temperature-now > .location > strong')
let currentTemp = document.querySelector('.temp .number')



function recebeCoordenadas(latitude, longitude){
    let lat = latitude
    let lon = longitude

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt-br&appid=${apikey}&units=metric`

    fetch(url)
        .then( (resp) => resp.json() )
        .then( function(data) {
            console.log(data)

            // Weather icon ::before
            let weather = data.weather[0].main.toLowerCase()

            const temperatureNow = document.querySelector('.temperature-now');
            const before = window.getComputedStyle(temperatureNow, "::before");
            temperatureNow.style.setProperty("--background-image", `url(./assets/weather-${weather}.svg)`)


            // City name
            localName.innerHTML = data.name

            // Current temperature
            currentTemp.innerHTML = parseInt(data.main.temp)

            // Min temperature
            let tempMin = document.createElement('div')
            tempMin.setAttribute("class", "maxmin")
            tempMin.innerHTML = parseInt(data.main.temp_min) + "°"
            currentTemp.appendChild(tempMin)

            // Max temperature
            let tempMax = document.createElement('span')
            tempMax.innerHTML = parseInt(data.main.temp_max) + "°"
            document.querySelector('.maxmin').appendChild(tempMax)

            // Wind speed
            let windSpeed = parseInt((data.wind.speed) * 3.6)

            let wind = document.querySelector('.statistics :nth-child(1) .info h5')
            wind.innerHTML = windSpeed

            function createSpan() {
                let span
                return span = document.createElement('span')
            }
                
            wind.appendChild(createSpan()).innerHTML = "km/h"

            // Humidity
            let humidity = data.main.humidity
            let humidityHTML = document.querySelector('.statistics :nth-child(2) .info h5')
            humidityHTML.innerHTML = humidity

            let percentHumidity = humidityHTML.appendChild(createSpan())
            percentHumidity.innerHTML = "%"

            // Rain
            let rain = data.clouds.all
            let rainHTML = document.querySelector('.statistics :nth-child(3) .info h5')
            rainHTML.innerHTML = rain

            let percentRain = rainHTML.appendChild(createSpan())
            percentRain.innerHTML = "%"




            
        } )

        .catch( (error) => {
            console.log("Deu zebra menó " + error)
        } )

}


// Verifica se o navegador possuí geolocalização
// Caso não possua mostrará um erro no console, caso possua irá chamar o método getCurrentPosition()
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => { 
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude

        //Chama a função recebeCoordenadas() com os parâmetros de latitude e longitude
        recebeCoordenadas(latitude, longitude)

    });

} else {
    console.log("Geolocation is not supported by this browser.");
}



