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

const WeatherDetails=({icon,temp,city,country,lat,long,humidity,wind})=>{
  return(<>
    <div className="image">
      <img src={icon} alt="image"/>
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
    <div className="data-container">
      <div className="element">
      <img src={humidityIcon} alt="humidity" className="icon"/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windIcon} alt="wind" className="icon"/>
        <div className="data">
          <div className="wind-percent">{wind}km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
    </>
    );
};


function App() {
  let api_key="594b9aae4f0d18963145b6c4e8c80979";
  const [text,setText]=useState("Chennai");
  const [icon,setIcon]=useState(cloudyIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("Chennai");
  const [country,setCountry]=useState("IN");
  const [lat,setLat]=useState(0);
  const [long,setLong]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);
  const weatherIconMap={
    "01d":cloudyIcon,
    "01n":cloudyIcon,
    "02d":sunnyIcon,
    "02n":sunnyIcon,
    "03d":thunderstormIcon,
    "03n":thunderstormIcon,
    "04d":showersIcon,
    "04n":showersIcon,
    "09d":rainyIcon,
    "09n":rainyIcon,
    "10d":rainyIcon,
    "10n":rainyIcon,
    "13d":mistyIcon,
    "13n":mistyIcon,
  };

  const search= async()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res=await fetch(url);
      let data=await res.json();
      //console.log(data);
      if(data.cod=="404"){
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      const weatherIconCode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || cloudyIcon);
      setCityNotFound(false);
    }
    catch(error){
      console.error("An error occured:",error.message);
    }
    finally{
      setLoading(false);


    }
  };
  const handleCity=(e)=>{
    setText(e.target.value)

  };
  const handleKeyDown=(e)=>{
    if(e.key=="Enter"){
      search();
    }

  };
  
  


  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" 
          className="cityInput" 
          placeholder="Search any city" onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={()=> search()}>
            <img src={searchIcon} alt="Search"/>
          </div>
        </div>
        <WeatherDetails icon={icon} 
        temp={temp} 
        city={city}
        country={country}
        lat={lat}
        long={long}
        humidity={humidity}
        wind={wind} />
        <p className="copyright">
          Designed By <span>DDH</span>
        </p>
      </div>
    </>
  );
}

export default App
