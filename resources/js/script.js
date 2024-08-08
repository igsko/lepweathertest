"use strict";

const apiKey = "5fd145011d8739e23ff8a50b457f2e0c";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=suwalki&appid=${apiKey}&units=metric`;

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
  }

async function drawText(text = "no text given", elementID = ".description"){
    document.querySelector(elementID).textContent = '';
    for(let i=0; i<text.length; i++){
        document.querySelector(elementID).textContent += text[i];
        await sleep(35); // Text speed
    }
}

async function drawWeatherText(data) {
    let weatherid = data.weather[0].id;
    if (weatherid < 801) {
        await drawText('There is  ', '.before');
    } else {
        await drawText('There are  ', '.before');
    }
    await drawText(data.weather[0].description, '.description');
    await drawText('  outside...', '.after');
}

async function getWeather() {
    let response = await fetch(apiURL);
    let data = await response.json();

    let weatherid = data.weather[0].id;
    document.querySelector('#location').textContent = data.name;
    document.querySelector('#temperature').textContent = Math.round(data.main.temp) + '°C';

    drawWeatherText(data);

    if(weatherid<300) { document.querySelector('.weather-image').src= 'resources/images/desc-img/thunder.png'} else
    if(weatherid<500) { document.querySelector('.weather-image').src= 'resources/images/desc-img/heavy.png'} else
    if(weatherid<510) { document.querySelector('.weather-image').src ='resources/images/desc-img/rain.png'} else
    if(weatherid<520) { document.querySelector('.weather-image').src ='resources/images/desc-img/snow.png'} else
    if(weatherid<600) { document.querySelector('.weather-image').src ='resources/images/desc-img/heavy.png'} else
    if(weatherid<700) { document.querySelector('.weather-image').src ='resources/images/desc-img/snow.png'} else
    if(weatherid<800) { document.querySelector('.weather-image').src ='resources/images/desc-img/mist.png'} else
    if(weatherid==800) { document.querySelector('.weather-image').src ='resources/images/desc-img/full.png'} else
    if(weatherid==801) { document.querySelector('.weather-image').src ='resources/images/desc-img/partial.png'} else
    if(weatherid==802) { document.querySelector('.weather-image').src ='resources/images/desc-img/cloudy.png'} else /* no suitable img yet */
    if(weatherid>802) { document.querySelector('.weather-image').src ='resources/images/desc-img/cloudy.png' }
}

getWeather();
