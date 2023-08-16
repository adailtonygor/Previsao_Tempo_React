import React, { useState } from "react";
import "./clima.css";
import canada from "../components/Canada.jpg";

const apiKey = "bddfdc22f1e72eb17385dc555d4b93a6";

function ClimaApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
      const res = await fetch(apiWeatherURL);
      if (!res.ok) {
        throw new Error("Cidade não encontrada. Verifique o nome e tente novamente.");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const showWeatherData = async () => {
    setIsLoading(true);
    setErrorMessage("");


    if (!city.match(/^[A-Za-z\s]+$/)) {
      setErrorMessage("Digite um nome de cidade válido (sem números).");
      setIsLoading(false);
      return;
    }

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <img src={canada} alt="Imagem de Fundo" id="background-image" />
      <div className="form">
        <h3>Confira o clima de uma cidade:</h3>
        <div className="form-input-container">
          <input
            type="text"
            placeholder="Digite o nome da cidade"
            value={city}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                showWeatherData();
              }
            }}
            onChange={(e) => setCity(e.target.value)}
            
          />
          <button onClick={showWeatherData}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      {isLoading && (
        <div id="loader">
          <i className="fa-solid fa-spinner"></i>
        </div>
      )}
      {errorMessage && (
        <div id="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      {weatherData && (
        <div id="weather-data">
          <h2>
            <i className="fa-solid fa-location-dot"></i>
            <span id="city">{weatherData.name}</span>
            
          </h2>
          <p id="temperature">
            <span>{parseInt(weatherData.main.temp)}</span>&deg;C
          </p>
          <div id="description-container">
            <p id="description">{weatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              id="weather-icon"
              alt="Condições atuais"
            />
          </div>
          <div id="details-container">
            <p id="humidity">
              <i className="fa-solid fa-droplet"></i>
              <span>{weatherData.main.humidity}%</span>
            </p>
            <p id="wind">
              <i className="fa-solid fa-wind"></i>
              <span>{weatherData.wind.speed}km/h</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClimaApp;
