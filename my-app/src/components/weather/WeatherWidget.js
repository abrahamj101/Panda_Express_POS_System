import React from "react";

function WeatherWidget({ weather, error }) {
  if (error) {
    return <div className="weather-error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-loading">Loading weather...</div>;
  }

  return (
    <div className="weather-widget">
      <p className="weather-city">{weather.name}</p>
      <div className="weather-info">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <div className="weather-details">
          <p className="weather-temp">{Math.round(weather.main.temp)}°F</p>
          <p className="weather-description">
            {weather.weather[0].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
