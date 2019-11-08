import React from 'react';

const Result = props => {

    const {date, city, sunrise, sunset, temp, pressure, wind, err} = props.weather;

    let content = null;

    if (!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()

        content = (
            <div>
                <h3>Result searching for <em>{city}</em></h3>
                <h4>Data for day and hour: {date}</h4>
                <h4>Actuall temp: {temp} &#176;C</h4>
                <h4>Sunrise: {sunriseTime}</h4>
                <h4>Sunset: {sunsetTime}</h4>
                <h4>Wind: {wind} m/s</h4>
                <h4>Pressure: {pressure} hPa</h4>
            </div>
        )
    }

    return (
        <div className="result">
            {err ? `Not found ${city}` : content}
        </div>
    );
};
export default Result;