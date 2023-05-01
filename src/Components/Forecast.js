import React from 'react';
import './Forecast.css';

function Forecast({forecast,city}){
    return(
        <div className='forecast'>
            <h4>Forecast for {city}</h4>
            <div className='forecastBody'>
                {forecast.forecastday.map((days)=>(
                    <div className='forecast_days'>
                    <div className='forecast_dates'>Date: {days.date}</div>
                    <div className='forecast_weatherImg'><img src={days.day.condition.icon}/></div>
                    <div className='forecast_weatherText'>{days.day.condition.text}</div>
                    
                    <div className='tempe_range'>Temp: {days.day.maxtemp_c} to {days.day.mintemp_c}</div>
                    <div className='rain_percent'>{days.day.daily_chance_of_rain}% of rain possible</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;