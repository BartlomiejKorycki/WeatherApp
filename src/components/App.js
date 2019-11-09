import React, { Component } from 'react';
import Form from './Form';
import Result from './Result';

import './App.css';
const APIKey = 'b7129e529853a3632061695c4b98dde7';

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

//--Adres API--//
    const API =`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

//--Wysyłanie żądania pod wskazany adres API(async)--//
//--fetch tworzy promise--//
//--promise ok-> .then; promise not ok-> .catch--//
//-- if promise is ok-> response
    fetch(API)
    .then(response => {
      if (response.ok) {//--sprawdza czy response jest ok--//
        return response//--jeśli true(200), przekazuje dalej response--//
      }
      throw Error("Valid data")//--jeśli false(404,500), zwraca error--//
    })
    .then(response => response.json())//--funkcja wyodrębnia plik json--//
    //.then(data => console.log(data))
    .then(data => {//--obiekt--//
      const time = new Date().toLocaleString();//--Aktualna data i godzina--//
      this.setState(state => ({
        err: false,
        date: time,
        img: data.weather[0].icon,
        description: data.weather[0].description,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind.speed,
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
