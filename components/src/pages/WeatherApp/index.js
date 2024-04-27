import React, { useState } from "react";
import './weatherapp.scss';

import notfound from '../../images/404.png';
import clear from '../../images/clear.png';
import rain from '../../images/rain.png';
import snow from '../../images/snow.png';
import clouds from '../../images/cloud.png';
import haze from '../../images/mist.png';

import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaWater, FaWind } from "react-icons/fa";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    const APIKey = '71dc117c1ecb9200c5072cbed0cc85bb';
    if (city === '') {
      setError(true);
      setWeatherData(null);
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .then(response => response.json())
      .then(json => {
        if (json.cod === '404') {
          setError(true);
          setWeatherData(null);
        } else {
          setError(false);
          setWeatherData(json);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError(true);
        setWeatherData(null);
      });
  };

  return (
    <div className="weatherapp">
      <div className="container">
        <div className="search-box">
          <FaLocationDot />
          <input type="text" placeholder="Enter your location" value={city} onChange={(e) => setCity(e.target.value)} />
          <button type="button" onClick={handleSearch}><IoSearch /></button>
        </div>

        {error && (
          <div className="not-found">
            <img src={notfound} alt="Not Found" />
            <p>Oops! Invalid location :/</p>
          </div>
        )}

        {weatherData && (
          <>
            <div className="weather-box">
              <img src={getWeatherIcon(weatherData.weather[0].main)} alt="Weather Icon" />
              <p className="temperature">{parseInt(weatherData.main.temp)}°C</p>
              <p className="description">{weatherData.weather[0].description}</p>
            </div>

            <div className="weather-details">
              <div className="humidity">
                <FaWater />
                <div className="text">
                  <span>{weatherData.main.humidity}%</span>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="wind">
                <FaWind />
                <div className="text">
                  <span>{parseInt(weatherData.wind.speed)} Km/h</span>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function getWeatherIcon(weather) {
  switch(weather) {
    case 'Clear':
      return clear;
    case 'Rain':
      return rain;
    case 'Snow':
      return snow;
    case 'Clouds':
      return clouds;
    case 'Haze':
      return haze;
    default:
      return '';
  }
}




// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&display=swap"
//         rel="stylesheet">
//     <link rel="stylesheet" href="style.css">
//     <title>Day #10 - Weather App | AsmrProg</title>
// </head>

// <body>

//     <div class="container">
//         <div class="search-box">
//             <i class="fa-solid fa-location-dot"></i>
//             <input type="text" placeholder="Enter your location">
//             <button class="fa-solid fa-magnifying-glass"></button>
//         </div>

//         <div class="not-found">
//             <img src="images/404.png">
//             <p>Oops! Invalid location :/</p>
//         </div>

//         <div class="weather-box">
//             <img src="">
//             <p class="temperature"></p>
//             <p class="description"></p>
//         </div>

//         <div class="weather-details">
//             <div class="humidity">
//                 <i class="fa-solid fa-water"></i>
//                 <div class="text">
//                     <span></span>
//                     <p>Humidity</p>
//                 </div>
//             </div>
//             <div class="wind">
//                 <i class="fa-solid fa-wind"></i>
//                 <div class="text">
//                     <span></span>
//                     <p>Wind Speed</p>
//                 </div>
//             </div>
//         </div>

//     </div>

//     <script src="https://kit.fontawesome.com/7c8801c017.js" crossorigin="anonymous"></script>
//     <script src="index.js"></script>
// </body>

// </html>




// const container = document.querySelector('.container');
// const search = document.querySelector('.search-box button');
// const weatherBox = document.querySelector('.weather-box');
// const weatherDetails = document.querySelector('.weather-details');
// const error404 = document.querySelector('.not-found');

// search.addEventListener('click', () => {

//     const APIKey = 'Your Api Key';
//     const city = document.querySelector('.search-box input').value;

//     if (city === '')
//         return;

//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
//         .then(response => response.json())
//         .then(json => {

//             if (json.cod === '404') {
//                 container.style.height = '400px';
//                 weatherBox.style.display = 'none';
//                 weatherDetails.style.display = 'none';
//                 error404.style.display = 'block';
//                 error404.classList.add('fadeIn');
//                 return;
//             }

//             error404.style.display = 'none';
//             error404.classList.remove('fadeIn');

//             const image = document.querySelector('.weather-box img');
//             const temperature = document.querySelector('.weather-box .temperature');
//             const description = document.querySelector('.weather-box .description');
//             const humidity = document.querySelector('.weather-details .humidity span');
//             const wind = document.querySelector('.weather-details .wind span');

//             switch (json.weather[0].main) {
//                 case 'Clear':
//                     image.src = 'images/clear.png';
//                     break;

//                 case 'Rain':
//                     image.src = 'images/rain.png';
//                     break;

//                 case 'Snow':
//                     image.src = 'images/snow.png';
//                     break;

//                 case 'Clouds':
//                     image.src = 'images/cloud.png';
//                     break;

//                 case 'Haze':
//                     image.src = 'images/mist.png';
//                     break;

//                 default:
//                     image.src = '';
//             }

//             temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
//             description.innerHTML = `${json.weather[0].description}`;
//             humidity.innerHTML = `${json.main.humidity}%`;
//             wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

//             weatherBox.style.display = '';
//             weatherDetails.style.display = '';
//             weatherBox.classList.add('fadeIn');
//             weatherDetails.classList.add('fadeIn');
//             container.style.height = '590px';


//         });


// });