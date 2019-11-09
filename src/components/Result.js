import React from 'react';

const Result = props => {

    const {city, sunrise, sunset, temp, humidity, pressure, wind, description, img, err} = props.weather;

//--Startowy stan aplikacji--//
    let content = null;

//--Jeżeli nie ma błędu i jest podane city to...--//
    if (!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()
        let image = 'http://openweathermap.org/img/wn/'+ img +'@2x.png';

        content = (
            <>
            <section className="city-section row">
                <p className="h1 col-sm"><em>{city}</em></p>
                <p className="col-sm"><img className="image" src={image} alt={description}></img></p>
                <p className="col-sm text-center"><i className="fas fa-temperature-low"></i>{temp} &#176;C</p>
            </section>
                
                
                <h4><i className="fas fa-wind"></i>{wind} m/s</h4>
                <h4>Humidity: {humidity} %</h4>
                <h4>Pressure: {pressure} hPa</h4>
                <h4>Sunrise: {sunriseTime}</h4>
                <h4>Sunset: {sunsetTime}</h4>
            </>
        )
    }

//--Jeżeli err jest f":"<-(lub)t...--//
//--"city" pobiera z .catch--//
    return (
        <div className="result container text-center"> 
            {err ? `Not found ${city}` : content} 
        </div>
    );
};
export default Result;