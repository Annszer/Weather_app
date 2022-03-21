import React, {useEffect, useState} from 'react';
import './home.scss';
// import {API_KEY, API_URL, API_UNITS, API_TEST_DAY} from "../../api/constant.js";
import test from '../../icons/02d.png'

const Home = () => {
    const [city, setCity] = useState("Warszawa")
    const [date, setDate] = useState(new Date())
    const [error, setError] = useState(null)
    const [weather, setWeather] = useState({
        description: "",
        temperature: "",
        pressure: "",
        humidity: "",
        icon: "",
    })

    const API_TEST_DAY = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=73f3692454f53031f636e68c01dc1f9e&units=metric&lang=pl`;


    //
    // useEffect(() => {
    //     setDate(new Date())
    // }, []);


    const handleChange = (e) => {
        setCity(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(API_TEST_DAY)
            .then(res => {return res.json()
                // console.log(res);
                // if(res.ok) {
                //     return res.json()
                // }

                //.. ustaw blad do error
            })
            .then(res => {
                console.log(res);
                setWeather({
                    description: res.weather[0].description,
                    temperature: res.main.temp,
                    pressure: res.main.pressure,
                    humidity: res.main.humidity,
                    icon: res.weather[0].icon,
                    id: res.weather[0].id
                })
                // console.log(res.weather[0].main)
                // console.log(res.weather[0].icon)
                // console.log(res.wind.deg)
                console.log(res.main.temp)
                console.log(res.main.pressure)
                console.log(res.main.humidity)
                //
                // if (weather.id >= 200 && weather.id<=300 ){
                //
                // }
            })
            .catch(error => {
                console.error(error)
            })
    }

    // const renderImg = (arg) => {
    //     switch (arg) {
    //         case 'case':
    //             return <img   />
    //     }
    // }

    if (!city) {
        return <p>loading ... please wait, try again later or refresh page. Thank you!</p>
    }


    return (
        <div className="home">
            <p className="home_header"> </p>
            <h1 className="home_title">Prognoza pogody w dniu: {date.toLocaleDateString()}</h1>
            <form className="home_form" onSubmit={handleSubmit}>
                <label>Podaj miejscowość: </label>
                <input type="text"
                       name="city"
                       placeholder="Podaj miejscowość"
                       value={city}
                       onChange={handleChange}
                />
                <button className="home_btn">Szukaj</button>
            </form>
            <div className="home_result">
                <div>Pogoda dla: {city.charAt(0).toUpperCase()+ city.slice(1).toLowerCase()}</div>
                <div>Opis:  {weather.description}</div>
                {/*<div>{weather.icon}</div>*/}
                {/*<div>{weather.id}</div>*/}
                <div className="icon"><img src={test}/></div>
                <div>Temperatura: {weather.temperature} °C</div>
                <div>Ciśnienie: {weather.pressure} hPa</div>
                <div>Wilgotność: {weather.humidity} %</div>
            </div>
        </div>

    );
}

export default Home;