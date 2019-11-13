import React, { Component } from 'react';
import Form from './Form';
import Result from './Result';

import './App.css';
const APIKey = 'b7129e529853a3632061695c4b98dde7';

//--Funkcja wyszukująca w tablicy prognozę na godz 12 kolejnego dnia--//  
const getForecastDay = (list) => {
  let dayName, hour;
  const index = list.findIndex((day) => {
    dayName = new Date(day.dt_txt);
    hour = dayName.getHours();
    day = dayName.getDay();
    return (hour === 12 & day !== 1);
  });
  return index;
}
//--Funkcja wyszukująca w tablicy prognozę na godz 3 kolejnego dnia--//
const getForecastNight = (list) => {
  let dayName, hour;
  const index = list.findIndex((day) => {
    dayName = new Date(day.dt_txt);
    hour = dayName.getHours();
    day = dayName.getDay();
    return (hour === 3 & day !== 1);
  });
  return index;
}

class App extends Component {
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    humidity: '',
    description:'',
    img: '',
    dayNameOne:'',
    forecastFirstDay: '',
    forecastFirstNight: '',
    dayNameTwo: '',
    forecastSecondDay: '',
    forecastSecondNight: '',
    dayNameThree:'',
    forecastThirdDay: '',
    forecastThirdNight: '',
    dayNameFour:'',
    forecastFourthDay: '',
    forecastFourthNight: '',
    err: false,
  }

//--Pozwala na zamiany w input--//
  handleInpoutChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

//--Obsługa potwierdenia miasta w formularzu--//
  handleCitySubmit = (e) => {
    e.preventDefault()

//--Adres API aktulnej pogody--//
    //const APIa =`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

 //--Adres API przewidywanej pogody--//
    const APIf =`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.value}&APPID=${APIKey}&units=metric`;

    
//--Wysyłanie żądania pod wskazany adres API(async)--//
//--fetch tworzy promise--//
//--promise ok-> .then; promise not ok-> .catch--//
//-- if promise is ok-> response
    fetch(APIf)
    .then(response => {
      if (response.ok) {//--sprawdza czy response jest ok--//
        return response//--jeśli true(200), przekazuje dalej response--//
      }
      throw Error("Valid data")//--jeśli false(404,500), zwraca error--//
    })
    .then(response => response.json())//--funkcja wyodrębnia plik json--//
    .then(data => {//--obiekt--//
      console.log(data)
      const time = new Date().toLocaleString();//--Aktualna data i godzina--//
      const dayList = data.list;//--Obsługa forecastWeather--//
      const dayIndex = getForecastDay(dayList);//-- jw --//
      const nightIndex = getForecastNight(dayList);//-- jw --//
      this.setState(state => ({
        err: false,
        date: time,
        img: data.list[0].weather[0].icon,
        description: data.list[0].weather[0].description,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
        temp: data.list[0].main.temp,
        humidity: data.list[0].main.humidity,
        pressure: data.list[0].main.pressure,
        wind: data.list[0].wind.speed,
        dayNameOne: data.list[dayIndex].dt_txt,
        forecastFirstDay: data.list[dayIndex].main.temp,
        forecastFirstNight: data.list[nightIndex].main.temp,
        dayNameTwo: data.list[dayIndex+8].dt_txt,
        forecastSecondDay: data.list[dayIndex+8].main.temp,
        forecastSecondNight: data.list[nightIndex+8].main.temp,
        dayNameThree: data.list[dayIndex+16].dt_txt,
        forecastThirdDay: data.list[dayIndex+16].main.temp,
        forecastThirdNight: data.list[nightIndex+16].main.temp,
        dayNameFour: data.list[dayIndex+24].dt_txt,
        forecastFourthDay: data.list[dayIndex+24].main.temp,
        forecastFourthNight: data.list[nightIndex+24].main.temp,
        city: state.value,
      }))
    })
    .catch(err => {
      console.log(err);
      this.setState(prevState => ({
        err: true,
        city: prevState.value//--Wartość wpisana w formularz do wykorzystania obsługi komunikatu błędu--//
      }))
    })
  }

  render() {
    return (
      <div className="App">
        <Form value={this.state.value} change={this.handleInpoutChange} submit={this.handleCitySubmit}/>
        <Result weather={this.state}/>
      </div>
    );
  }
}
export default App;
