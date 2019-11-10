import React from 'react';

const Result = props => {

    const {city, sunrise, sunset, temp, humidity, pressure, wind, description, img, err} = props.weather;

//--Startowy stan aplikacji--//
    let content = null;

    var number = temp;
    var roundedNumber = Math.round(number, 0);

//--Jeżeli nie ma błędu i jest podane city to...--//
    if (!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()
        
        let image = 'http://openweathermap.org/img/wn/'+ img +'@2x.png';

        content = (
            <>
            <section className="city-section row">
                <p className="h1 col-sm text-capitalize"><dt>{city}</dt></p>
                <div className="col-sm">
                    <p className="text-center"><img className="image" src={image} alt={description}></img></p>
                    <p className="h2 col-sm text-center">{roundedNumber} &#176;C</p>
                </div>
            </section>
            <br></br>
                <h5>Wind: {wind} m/s</h5>
                <h5>Humidity: {humidity} %</h5>
                <h5>Pressure: {pressure} hPa</h5>
                <h5>Sunrise: {sunriseTime}</h5>
                <h5>Sunset: {sunsetTime}</h5>
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