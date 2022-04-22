const API_KEY = `b929aeff-9d64-42ac-af54-3efb14e60730`



document.querySelector('#aq-btn').addEventListener('click', () => {
    getAirQuality()

})


function getAirQuality() {
    let stateInput = document.querySelector('#state').value.trim()
    const cityInput = document.querySelector('#city').value.trim()

    const URL = `https://api.airvisual.com/v2/city?city=${cityInput}&state=${stateInput}&country=USA&key=${API_KEY}`

    if (!stateInput || !cityInput) {
        alert('Please enter a valid State and City')
    } else {
        fetch(URL)
            .then(response => response.json())
            .then(data =>  {
                console.log(data)
                let cityData = data.data
                if(data.status === 'fail') {
                    alert('Sorry, there was a malfunction. Did you enter the city and state names correctly?')
                }
                
            
                populateTheInfo(cityData)
            })
            .catch(error => console.log(error))
    }
   
}




function populateTheInfo(cityData) {
    let dataDiv = document.querySelector('#aq-data-div')
    let newDiv = document.createElement('div')

    let fahrenheit = ((cityData.current.weather.tp) * (9/5)) + 32
    let aqiUS = cityData.current.pollution.aqius
    let aqiClass = ''
    let temperaturePicture = ``

    let hdPic = document.querySelector('#aqi-info-hd-pic')

    if (aqiUS > 300) {
        aqiClass = 'dark-red'
        temperaturePicture = `
        <div class="temp-pic dark-red"> 
            <i class="fas fa-radiation-alt"></i>
        </div>`
        hdPic.src = 'images/purple-hd.png'
    } else if (aqiUS > 200) {
        aqiClass = 'red'
        temperaturePicture = `
        <div class="temp-pic red"> 
            <i class="fas fa-radiation"></i>
        </div>`
        hdPic.src = 'images/red-hd.png'
    } else if (aqiUS > 100) {
        aqiClass = 'orange'
        temperaturePicture = `
        <div class="temp-pic orange"> 
            <i class="fas fa-lungs"></i>
        </div>`
        hdPic.src = 'images/orange-hd.png'
    } else if (aqiUS > 50) {
        aqiClass = 'yellow'
        temperaturePicture = `
        <div class="temp-pic yellow"> 
            <i class="far fa-frown"></i>
        </div>`
        hdPic.src = 'images/yellow-hd.png'
    } else {
        aqiClass = 'green'
        temperaturePicture = `
        <div class="temp-pic green"> 
            <i class="far fa-laugh-beam"></i>
        </div>`
        hdPic.src = 'images/green-hd.png'
    }

    newDiv.innerHTML = `
        <h1>${cityData.city}, ${cityData.state}</h1>
        <div class="aq-temp">
            <p>AQ: <span class="aqi ${aqiClass}">${aqiUS}<span></p>
            <p>Temp: <span class="temp">${fahrenheit}<span>˚F</p>
        </div>
        ${temperaturePicture}
    `
    dataDiv.appendChild(newDiv)

}
