import React from 'react';

const Result = props => {

    const {city, sunrise, sunset, temp, humidity, pressure, wind, description, img, err} = props.weather;

//--Startowy stan aplikacji--//
    let content = null;

    var number = temp;
    var roundedNumber = Math.round(number, 0);

    var windy = wind;
    var roundedWind = Math.round(windy, 0);


//--Jeżeli nie ma błędu i jest podane city to...--//
    if (!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()
        
        let image = 'http://openweathermap.org/img/wn/'+ img +'@2x.png';

        content = (
            <>
                <section className="city-section col">
                    <p className="h1 text-capitalize"><dt>{city}</dt></p>
                    <div className="row">
                        <p className="temperature col text-center">{roundedNumber} &#176;C</p>
                        <p className="image col text-center"><img src={image} alt={description}></img></p>
                    </div>
                </section>
                <section className="details col-md">
                    <h5>Wind: {roundedWind} m/s</h5>
                    <h5>Humidity: {humidity} %</h5>
                    <h5>Pressure: {pressure} hPa</h5>
                    <h5>Sunrise: {sunriseTime}</h5>
                    <h5>Sunset: {sunsetTime}</h5>
                </section>
            </>
        )
    }

//--Jeżeli err jest f":"<-(lub)t...--//
//--"city" pobiera z .catch--//
    return (
        <div className="result container text-center row"> 
            {err ? `Not found ${city}` : content} 
        </div>
    );
};
export default Result;