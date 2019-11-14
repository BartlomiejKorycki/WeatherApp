import React from 'react';

const Result = props => {

    const {
        city, 
        sunrise, 
        sunset, 
        temp, 
        humidity, 
        pressure, 
        wind, 
        description, 
        img, 
        dayNameOne, 
        forecastFirstDay,
        forecastFirstNight,
        dayNameTwo,
        forecastSecondDay,
        forecastSecondNight,
        dayNameThree,
        forecastThirdDay,
        forecastThirdNight,
        dayNameFour,
        forecastFourthDay,
        forecastFourthNight,
        err} = props.weather;
//--Startowy stan aplikacji--//
    let content = null;
//--Dane potrzebne do prawidłowego wyświetlania prognozy--//
    var myDateOne = new Date(dayNameOne);
    var myDateTwo = new Date(dayNameTwo);
    var myDateThree = new Date(dayNameThree);
    var myDateFour = new Date(dayNameFour);
    let thatDayOne = myDateOne.getDay();
    let thatDayTwo = myDateTwo.getDay();
    let thatDayThree = myDateThree.getDay();
    let thatDayFour = myDateFour.getDay();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//--Zaokrąglenia--//
    var number = temp;
    var roundedNumber = Math.round(number, 0);

    var windy = wind;
    var roundedWind = Math.round(windy, 0);
//--Jeżeli nie ma błędu i jest podane city to...--//
    if (!err && city) {
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString()
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString()
//--Adres do grafik--//
        let image = 'http://openweathermap.org/img/wn/'+ img +'@2x.png';

        content = (
            <>
                <section className="row">
                    <div className="city-section col">
                        <p className="h1 text-capitalize"><dt>{city}</dt></p>
                        <div className="row">
                            <p className="temperature col text-center">{roundedNumber} &#176;C</p>
                            <p className="image col text-center"><img src={image} alt={description}></img></p>
                        </div>
                    </div>
                    <div className="details col-md">
                        <h5>Wind: {roundedWind} m/s</h5>
                        <h5>Humidity: {humidity} %</h5>
                        <h5>Pressure: {pressure} hPa</h5>
                        <h5>Sunrise: {sunriseTime}</h5>
                        <h5>Sunset: {sunsetTime}</h5>
                    </div>
                </section>
                <section className="forecast-weather">
                    <div className="one row">
                        <p>{days[thatDayOne]}</p>
                        <p>{Math.round(forecastFirstDay, 0)} &#176;C</p>
                        <p>{Math.round(forecastFirstNight, 0)} &#176;C</p>
                    </div>
                    <div className="two row">
                        <p>{days[thatDayTwo]}</p>
                        <p>{Math.round(forecastSecondDay, 0)} &#176;C</p>
                        <p>{Math.round(forecastSecondNight, 0)} &#176;C</p>
                    </div>
                    <div className="three row">
                        <p>{days[thatDayThree]}</p>
                        <p>{Math.round(forecastThirdDay, 0)} &#176;C</p>
                        <p>{Math.round(forecastThirdNight, 0)} &#176;C</p>
                    </div>
                    <div className="four row">
                        <p>{days[thatDayFour]}</p>
                        <p>{Math.round(forecastFourthDay, 0)} &#176;C</p>
                        <p>{Math.round(forecastFourthNight, 0)} &#176;C</p>
                    </div>
                </section>
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