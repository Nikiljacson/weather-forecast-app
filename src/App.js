import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Forecast from './Components/Forecast';
import Current from './Components/Current';


const autoComplete= 'https://api.weatherapi.com/v1/search.json?key=0660d110f7034666ab170717230105&q=';

const weatherURL = (city) => `https://api.weatherapi.com/v1/forecast.json?key=0660d110f7034666ab170717230105&q=${city}&days=7&aqi=no&alerts=no`;

function App() {
  const [city,setCity] = useState('');
  const [citySuggestion,setCitySuggestion] = useState([]);
  const [clicked,setClicked]=useState(false);

  const [current,setCurrent] = useState();
  const [forecast,setForecast] = useState();

  const [location,setLocation]= useState('');


  const handleClick=async (clickedCity)=>{
    setCity(clickedCity);
    setClicked(true);

    const resp = await fetch(weatherURL(city));
    const data = await resp.json();
    console.log(data);
    setCurrent(data.current);
    setForecast(data.forecast);
    setLocation(data.location.name);
  }

  useEffect(()=>{
    const getDataAfterTimeout = setTimeout(()=>{
      const fetchCitySuggestion = async ()=>{
        const resp = await fetch(autoComplete + city);
        const data = await resp.json();
        const citySuggestionData= data.map((curData)=>`${curData.name},${curData.region},${curData.country}` 
        );
        setCitySuggestion(citySuggestionData);
      }
      if (!clicked && city.length > 2){
        fetchCitySuggestion();
      }
      else{
        setCitySuggestion([]);
        setClicked(false);
      }
    },500)
    
    
    return ()=> clearTimeout(getDataAfterTimeout);
  },[city]);
  
  return (
    <div className="App">
      <div className='header'><b>Weather Report</b></div>
      <div className='app_body'>
        <input type='text' value={city} placeholder='Enter the city name' 
        className='citytextbox' onChange={(e)=>setCity(e.target.value)}/>
       
       {citySuggestion.length > 0 && 
        (
         <div className='city_suggestion_wrap'>
         {citySuggestion.map((currentCity)=>(
           <div className='city_suggestion' onClick={()=>handleClick(currentCity)}>{currentCity}</div>
         ))}
         </div>)
         }

         {current && <Current current={current} city={location}/>}
         {forecast && <Forecast forecast={forecast} city={location}/>}
      </div>
    </div>
  );
}

export default App;
