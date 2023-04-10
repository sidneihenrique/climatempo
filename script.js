const apikey = "2129fd0d09d3b0af52ec836f8ae8a2fe"

let localName = document.querySelector('.temperature-now > .location > strong')



function recebeCoordenadas(latitude, longitude){
    let lat = latitude
    let lon = longitude

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`

    fetch(url)
        .then( (resp) => resp.json() )
        .then( function(data) {
            
            localName.innerHTML = data.name


            
        } )

        .catch( (error) => {
            console.log("Deu zebra menó " + error)
        } )

}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => { 
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude

        recebeCoordenadas(latitude, longitude)

    });

} else {
    console.log("Geolocation is not supported by this browser.");
}



