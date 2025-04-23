import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import axios from 'axios'

const api = {
    key: '425044c3cbaa6505752f122b9972dc34',
    base: 'https://api.openweathermap.org/data/2.5/'
}

const Weather = () => {
   
    const [search, setSearch] = useState('');
    const [weatherData, setWeatherdata] = useState({});
    const [error, setError] = useState(null);

    const searchPressed = () => {
        try {
            fetch(`${api.base}weather?q=${search}&units=metric&&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                if(!result) {
                    // setError(result.messsage);
                    // console.log(error);
                }
                else {
                    // console.log(result)
                    setError(result.message)
                    setWeatherdata(result);
                    console.log(error);
                }
           
        })
        
        } catch (error) {
            console.log(`Error: ${error}`)
            setError(error);
        }
        setSearch('');
    }

    // useEffect(() => {

    // })

  return (
    <div className='weather'>
        <h1 className='title'>Weather App</h1>
        <div className="search-bar">
            <input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
            <img src={search_icon} alt="" onClick={searchPressed} />
        </div>
        {typeof weatherData.main != 'undefined'? 
            <>
                <img src={clear_icon} alt="" className='weather-icon' />
                <p className='temperature'>{Math.floor(weatherData.main.temp)}°c</p>
                <p className='location'>{weatherData.name}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData.main.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="" />
                        <div>
                            <p>{weatherData.wind.speed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </>
        : 
         <p className='error-message'>{error}</p>   }
        
    </div>
  )
}

export default Weather