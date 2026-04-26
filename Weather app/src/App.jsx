 import { useState, useEffect } from 'react'
import './App.css';
import PropTypes from "prop-types";

/*Import images*/
import brokenCloudIcon from "./assets/brokenclouds.jpeg"
import clearIcon from "./assets/clear.jpeg"
import fewCloudsIcon from "./assets/fewclouds.jpeg"
import humidityIcon from "./assets/humidityicon.jpeg"
import rainIcon from "./assets/rain.jpeg"
import scatteredIcon from "./assets/scattered.jpeg"
import snowIcon from "./assets/snow.jpeg"
import searchIcon from "./assets/search.jpeg"
import showersIcon from "./assets/showers.jpeg"
import thunderstormIcon from "./assets/thunderstorm.jpeg"
import windIcon from "./assets/windicon.jpeg"

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
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
        <span>{log}</span>
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
WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,

};

function App() {
  let api_key="594b9aae4f0d18963145b6c4e8c80979";
  const [text,setText]=useState("Chennai");
  const [icon,setIcon]=useState(clearIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("Chennai");
  const [country,setCountry]=useState("IN");
  const [lat,setLat]=useState(0);
  const [log,setLog]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const [cityNotFound,setCityNotFound]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error, setError] = useState(null);
  const weatherIconMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":fewCloudsIcon,
    "02n":fewCloudsIcon,
    "03d":scatteredIcon,
    "03n":scatteredIcon,
    "04d":brokenCloudIcon,
    "04n":brokenCloudIcon,
    "09d":showersIcon,
    "09n":showersIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "11d":thunderstormIcon,
    "11n":thunderstormIcon,
    "13d":snowIcon,
    "13n":snowIcon,
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
      setLog(data.coord.lon);
      const weatherIconCode=data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    }
    catch(error){
      console.error("An error occured:",error.message);
      setError("An error occured while fetching weather data.");
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
  useEffect(function (){
    search();
  }, []);
  


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
       
        {loading && <div className="Loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not found</div>}
        {!loading && !cityNotFound && <WeatherDetails icon={icon} 
        temp={temp} 
        city={city}
        country={country}
        lat={lat}
        log={log}
        humidity={humidity}
        wind={wind} />}
        <p className="copyright">
          Designed By <span>DDH</span>
        </p>
      </div>
    </>
  );
}

export default App
