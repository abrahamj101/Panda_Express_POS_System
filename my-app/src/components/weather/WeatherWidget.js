import React from "react";

/**
 * A React component that displays a weather widget.
 * It shows the weather details such as city, temperature, description, and an icon.
 * Handles loading and error states.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.weather - The weather data object from the OpenWeatherMap API.
 * @param {string} props.weather.name - The name of the city.
 * @param {Object[]} props.weather.weather - An array containing weather information.
 * @param {string} props.weather.weather[].icon - The icon code representing the weather condition.
 * @param {string} props.weather.weather[].description - A textual description of the weather condition.
 * @param {Object} props.weather.main - The main weather data object.
 * @param {number} props.weather.main.temp - The current temperature in Fahrenheit.
 * @param {string} [props.error] - An error message to display if there is a problem fetching the weather data.
 * @returns {JSX.Element} A weather widget or error/loading message.
 */
function WeatherWidget({ weather, error }) {
  if (error) {
    return <div className="weather-error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-loading">Loading weather...</div>;
  }

  return (
    <div className="weather-widget">
      {/* City Name */}
      <p className="weather-city">{weather.name}</p>
      <div className="weather-info">
        {/* Weather Icon */}
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <div className="weather-details">
          {/* Temperature */}
          <p className="weather-temp">{Math.round(weather.main.temp)}°F</p>
          {/* Weather Description */}
          <p className="weather-description">
            {weather.weather[0].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
