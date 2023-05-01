import React from 'react';
import './Current.css';

function Current({current , city}){
    return(
        <div className='current'>
            <h4>{city} current weather</h4>
            <div className='currentBody'>
                
                <img src={current.condition.icon}/>
                <span>{current.condition.text}</span>
                <span><b>Temp:</b> {current.temp_c} deg</span>
                <span><b>Feels like:</b> {current.feelslike_c} deg</span>
                <span><b>Wind:</b> {current.wind_kph} kph</span>

            </div>
        </div>
    );
}

export default Current;