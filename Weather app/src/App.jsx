import { useState } from 'react'
import './App.css'

/*Import images*/
import cloudyIcon from "./assets/cloudy.jpeg"
import frostyIcon from "./assets/frosty.jpeg"
import heavy_rainIcon from "./assets/heavy_rain.jpeg"
import humidityIcon from "./assets/humidityicon.jpeg"
import mistyIcon from "./assets/misty.jpeg"
import overcastIcon from "./assets/overcast.jpeg"
import partly_cloudyIcon from "./assets/partly_cloudy.jpeg"
import rainyIcon from "./assets/rainy.jpeg"
import searchIcon from "./assets/search.jpeg"
import showersIcon from "./assets/showers.jpeg"
import sunnyIcon from "./assets/sunny.jpeg"
import thunderstormIcon from "./assets/thunderstorm.jpeg"
import windIcon from "./assets/windicon.jpeg"

const WeatherDetails=({icon,temp,city,country,lat,long})=>{
  return(<>
    <div className="image">
      <img src={icon} alt="cloudy"/>
    </div>
    <div className="temp">
    {temp}&deg;C
    </div>
    <div className="location">
    {city}
    </div>
    <div className="country">
    {country}
    </div>
    <div className="cord">
      <div>
        <span className="lat">latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="long">longitude</span>
        <span>{long}</span>
      </div>
    </div>
    </>
    );
};

function App() {
  const [icon,setIcon]=useState(cloudyIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("Chennai");
  const [country,setCountry]=useState("IN");
  const [lat,setLat]=useState(0);
  const [long,setLong]=useState(0);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" 
          className="cityInput" 
          placeholder="Search any city"/>
          <div className="search-icon">
            <img src={searchIcon} alt="Search"/>
          </div>
        </div>
        <WeatherDetails icon={icon} 
        temp={temp} 
        city={city}
        country={country}
        lat={lat}
        long={long} />
      </div>
    </>
  );
}

export default App
