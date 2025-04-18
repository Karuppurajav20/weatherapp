import React,{useState,useEffect} from "react";
import axios from "axios";
import "./App.css"

const SearchBar=({onSearch})=>{
  const[city,setCity]=useState("");
  const handlesearch=()=>{
    onSearch(city);
  };
  return(
    <div  className="search-bar">
      <h1>WEATHER APP</h1>
      <div className="input-text">
        <input type="text" value={city}  onChange={(e)=> setCity(e.target.value)} placeholder="Enter city name"/>
        <button onClick={handlesearch}>search</button>
      </div>
    </div>
  );
};
const WeatherCard=({title,data})=>{
  return(
    <div className="Weather-card">
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
};
const WeatherDisplay=({city})=>{
  const[weatherData,setWeatherData]=useState(null);
  const[loading,setLoading]=useState(false);
  useEffect(()=>{
    if(city){
      setLoading(true);
      axios.get("https://api.weatherapi.com/v1/current.json",{
        params:{
          key:"1a2675ae8d5c4e058e582110232909",
          q:city,
        },
      })
      .then((response)=>{
        setWeatherData(response.data);
      })
      .catch((error)=>{
        console.log("Error fetching data:",error);
        alert("failed to fetch weather data");
       })
      .finally(()=>{
        setLoading(false);
      });
    }
  },[city]);
  return(
    <div className="Weather-display">
      {loading && <p>Loading data...</p>}
      {!loading && weatherData &&(
        <div className="weather-cards">
          <WeatherCard title="Temperature" data={`${weatherData.current.temp_c}°C`}/>
          <WeatherCard title="Huminity" data={`${weatherData.current.humidity}%`}/>
          <WeatherCard title="Condition" data={weatherData.current.condition.text}/>
          <WeatherCard title="Windspeed" data={`${weatherData.current.wind_kph}kph`}/>
          </div>
         )}
    </div>
  );
};
function Weather(){
  const[city,setCity]=useState("");
  const handleSearch=(searchCity)=>{
    setCity(searchCity);
  };
  return(
    <div className="App">
      <SearchBar onSearch={handleSearch}/>
      <WeatherDisplay city={city}/>
    </div>
  );
}
export default Weather;