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


function App() {

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
      </div>
    </>
  )
}

export default App
