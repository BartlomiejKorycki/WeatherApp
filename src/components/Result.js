import React from 'react';

const Result = props => {

    const {
        city, sunrise, sunset, temp, humidity, pressure, wind, description, img, 
        dayNameOne, forecastFirstDay,forecastFirstNight,
        dayNameTwo,forecastSecondDay,forecastSecondNight,
        dayNameThree,forecastThirdDay,forecastThirdNight,
        dayNameFour,forecastFourthDay,forecastFourthNight,
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
                <div className="h1 city-name">
                    <dt className="text-capitalize">{city}</dt>
                    <div className="row city-data text-center">
                    <img src="./svg/pressure.svg" alt="pressure"></img>
                    <h6>{pressure} hPa </h6>
                        <h6>{ description}</h6>
                    </div>
                </div>
                <section className="row main-section">
                    <div className="temp-section col">
                        <div className="col">
                            <p className="temperature col text-center">{roundedNumber} &#176;C</p>
                            <div className="row temp-data">
                                <div className="col wind">Wind: {roundedWind} m/s</div>
                                <div className=" col humidity">Humidity: {humidity} %</div>
                            </div>
                        </div>
                    </div>
                    <div className="details col-md">
                        <p className="image col text-center">
                            <img src={image} alt={description}></img>
                        </p>
                        <h5>Sunrise: {sunriseTime}</h5>
                        <h5>Sunset: {sunsetTime}</h5>
                    </div>
                </section>
                <section className="forecast-weather">
                    <div className="one row justify-content-center">
                        <p className="text-left f-w">{days[thatDayOne]}</p>
                        <p className="text-right f-w">{Math.round(forecastFirstDay, 0)} &#176;C | {Math.round(forecastFirstNight, 0)} &#176;C</p>
                    </div>
                    <div className="two row justify-content-center">
                        <p className="text-left f-w">{days[thatDayTwo]}</p>
                        <p className="text-right f-w">{Math.round(forecastSecondDay, 0)} &#176;C | {Math.round(forecastSecondNight, 0)} &#176;C</p>
                    </div>
                    <div className="three row justify-content-center">
                        <p className="text-left f-w">{days[thatDayThree]}</p>
                        <p className="text-right f-w">{Math.round(forecastThirdDay, 0)} &#176;C | {Math.round(forecastThirdNight, 0)} &#176;C</p>
                    </div>
                    <div className="four row justify-content-center">
                        <p className="text-left f-w">{days[thatDayFour]}</p>
                        <p className="text-right f-w">{Math.round(forecastFourthDay, 0)} &#176;C | {Math.round(forecastFourthNight, 0)} &#176;C</p>
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