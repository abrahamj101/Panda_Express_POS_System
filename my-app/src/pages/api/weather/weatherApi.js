/**
 * @file weatherApi.js
 * @module pages/api/weatherApi
 * @description Custom hook to fetch weather data for a given city using the OpenWeatherMap API.
 * @requires react
 * @requires axios
 */

import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom React hook to fetch weather data for a specified city.
 *
 * @function useWeather
 * @param {string} city - The name of the city for which weather data will be fetched.
 * @returns {{weather: Object|null, error: string|null}} An object containing weather data or an error message.
 *
 * @example
 * const { weather, error } = useWeather("Houston");
 * if (error) console.error(error);
 * else console.log(weather);
 */
const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Fetches weather data from the OpenWeatherMap API.
     *
     * @async
     * @function fetchWeather
     * @throws {Error} If the API call fails, an error is logged, and the error state is set.
     */
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
