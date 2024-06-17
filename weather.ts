import { WeatherResponse } from "./response";

const { WeatherResponse } = require("./response");

export async function getData(key, location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`,
      { mode: "cors" }
    );
    const weatherData: WeatherResponse = await response.json();
    const weatherObject = {
      name: weatherData.location,
    };
    return weatherObject;
  } catch (error) {
    alert("Enter a valid location");
  }
}
