import React from 'react';
import humidityy from './svg/0humidity.svg';
import sunrisee from './svg/0sunrise.svg';
import sunsett from './svg/0sunset.svg';
import windd from './svg/0wind.svg';

import w01d from './svg/01d.svg';
import w01n from './svg/01n.svg';
import w02d from './svg/02d.svg';
import w02n from './svg/02n.svg';
import w03d from './svg/03d.svg';
import w03n from './svg/03n.svg';
import w04d from './svg/04d.svg';
import w04n from './svg/04n.svg';
import w09d from './svg/09d.svg';
import w09n from './svg/09n.svg';
import w10d from './svg/10d.svg';
import w10n from './svg/10n.svg';
import w11d from './svg/11d.svg';
import w11n from './svg/11n.svg';
import w13d from './svg/13d.svg';
import w13n from './svg/13n.svg';
import w50d from './svg/50d.svg';
import w50n from './svg/50n.svg';

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
//--WYświetlanie ikony pogody--//
    var picture = "w" + img;
    var icons = [w01d, w01n, w02d, w02n, w03d, w03n, w04d, w04n, w09d, w09n, w10d, w10n, w11d, w11n, w13d, w13n, w50d, w50n];
    icons[picture];
    
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
    
        content = (
            <>  
                <div className="h1 city-name">
                    <dt className="text-capitalize">{city}</dt>
                    <div className="row city-data text-center">
                        <h6>{pressure} hPa </h6>
                        <h6 className="text-capitalize">{description}</h6>
                    </div>
                </div>
                <section className="row main-section">
                    <div className="temp-section col">
                        <div className="col">
                            <p className="temperature col text-center">{roundedNumber} &#176;C</p>
                            <div className="row temp-data">
                                <div className="col wind"><img className="windsvg" src={windd} alt="wind"></img>{roundedWind} m/s</div>
                                <div className=" col humidity"><img className="humiditysvg" src={humidityy} alt="humidity"></img> {humidity} %</div>
                            </div>
                        </div>
                    </div>
                    <div className="details col-md">
                        <p className="image col text-center">
                            <img src ={w10n} alt={description}></img>
                        </p>
                        <h5><img className="sunrisesvg" src={sunrisee} alt="sunrise"></img>{sunriseTime}</h5>
                        <h5><img className="sunsetsvg" src={sunsett} alt="sunset"></img>{sunsetTime}</h5>
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