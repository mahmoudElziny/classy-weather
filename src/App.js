import React, { useState } from 'react';
import { convertToFlag } from "./starter";
import Weather from './weather';
import Input from './input';

export default function App() {

  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  async function fetchWeather() { 
    try {
      setIsLoading(true);
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
        setDisplayLocation(`${name}, ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='app'>
      <h1>Classy Weather</h1>
      <Input location={location} setLocation={setLocation}/>
      <button onClick={fetchWeather}>Get Weather</button>
      {isLoading && <p className='loader'>Loading...</p>} 
      {weather.weathercode && <Weather weather={weather} location={displayLocation}/>}  
    </div>
  )
}
