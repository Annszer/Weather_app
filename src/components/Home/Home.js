import React, { useEffect, useState } from "react";
import "./home.scss";

const Home = () => {
    const [city, setCity] = useState("Londyn");
    const [date,] = useState(new Date());
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState({
        description: "",
        temperature: "",
        pressure: "",
        humidity: "",
        icon: "",
        feelsLike: "",
        wind: "",
        cityName: "",
    });

    const API_TEST_DAY = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=73f3692454f53031f636e68c01dc1f9e&units=metric&lang=pl`;

    const fetchFun = () => {
        fetch(API_TEST_DAY)
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error("Błąd sieci");
            })
            .then((res) => {
                setWeather({
                    description: res.weather[0].description,
                    temperature: res.main.temp.toFixed(),
                    pressure: res.main.pressure,
                    humidity: res.main.humidity,
                    icon: res.weather[0].icon,
                    id: res.weather[0].id,
                    feelsLike: res.main.feels_like.toFixed(),
                    wind: res.wind.speed.toFixed(),
                    cityName: city,
                });
                setCity("");
            })
            .catch((error) => {
                setError("Wpisz poprawne miasto");
            });
    };

    const handleChange = (e) => {
        setCity(e.currentTarget.value);
    };

    const handleSubmit = (e) => {
        setError("");
        e.preventDefault();
        fetchFun();
    };

    const image = () => {
        if (weather.id >= 200 && weather.id < 300) {
            return <img src={require("../../icons/11d.png")} alt="Burza" />;
        } else if (weather.id >= 300 && weather.id < 500) {
            return <img src={require("../../icons/09d.png")} alt="Mżawka" />;
        } else if (weather.id >= 500 && weather.id < 600) {
            return <img src={require("../../icons/10d.png")} alt="Deszcz" />;
        } else if (weather.id >= 600 && weather.id < 700) {
            return <img src={require("../../icons/13d.png")} alt="Śnieg" />;
        } else if (weather.id >= 700 && weather.id < 800) {
            return <img src={require("../../icons/50d.png")} alt="Mgła" />;
        } else if (weather.id === 800) {
            return <img src={require("../../icons/01d.png")} alt="Bezchmurnie" />;
        } else if (weather.id > 800 && weather.id < 900) {
            return <img src={require("../../icons/02d.png")} alt="Zachmurzenie" />;
        } else {
            return <img src={require("../../icons/unknown.png")} alt="Nieznana" />;
        }
    };

    useEffect(fetchFun,[]);

    useEffect(() => {
        const search = document.querySelector(".home_input"); //useRef
        search.focus();
    }, []);

    return (
        <div className="home">
            <p className="home_header"> </p>
            <h1 className="home_title">
                Prognoza pogody w dniu: {date.toLocaleDateString()}
            </h1>
            <form className="home_form" onSubmit={handleSubmit}>
                <label>Podaj miejscowość: </label>
                <input
                    type="text"
                    name="city"
                    placeholder="Podaj miejscowość"
                    value={city}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    onChange={handleChange}
                    className="home_input"
                />
                <button className="home_btn">Szukaj</button>
            </form>

            {weather.cityName && (
                <div className="home_result">
                    <div className="home_error">{error}</div>
                    <div>
                        Pogoda dla:
                        {weather.cityName.charAt(0).toUpperCase() +
                        weather.cityName.slice(1).toLowerCase()}
                    </div>
                    <div>Opis: {weather.description}</div>
                    <div className="icon">{image()}</div>
                    <div>Temperatura: {weather.temperature} °C</div>
                    <div>Temperatura odczuwalna: {weather.feelsLike} °C</div>
                    <div>Ciśnienie: {weather.pressure} hPa</div>
                    <div>Wilgotność: {weather.humidity} %</div>
                    <div>Wiatr: {weather.wind} km/h</div>
                </div>
            )}
        </div>
    );
};

export default Home;