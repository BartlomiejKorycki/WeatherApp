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
    err: false,
  }

  handleInpoutChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleCitySubmit = (e) => {
    e.preventDefault()
    const API =`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

    fetch(API)
    .then(response => {
      if (response.ok) {
        return response
      }
      throw Error("Valid data")
    })
    .then(response => response.json())
    .then(data => {
      const time = new Date().toLocaleString();
      this.setState(state => ({
        err: false,
        date: time,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunrise,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        city: state.value,
      }))
    })
    .catch(err => {
      console.log(err);
      this.setState(prevState => ({
        err: true,
        city: prevState.value
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
