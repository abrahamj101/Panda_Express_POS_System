// src/hooks/useWeather.js
import { useState, useEffect } from "react";
import axios from "axios";

const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "c220ff896e58679f4db0dfb56f67ec99";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
        );
        setWeather(response.data);
      } catch (err) {
        setError("Failed to fetch weather data.");
        console.error("Error details:", err);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, error };
};

export default useWeather;
