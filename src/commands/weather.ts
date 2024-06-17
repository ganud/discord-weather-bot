import { WeatherResponse } from "../weather-response";
import { API_KEY } from "../config.json";
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

async function getEmbed(location: string) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`,
      { mode: "cors" }
    );
    const weatherData: WeatherResponse = await response.json();

    // WeatherAPI's response for invalid locations
    if (weatherData.hasOwnProperty("error")) {
      throw new Error("Response was an error");
    }

    const embed = new EmbedBuilder()
      .setTitle(
        `Current weather in ${weatherData.location.name}, ${weatherData.location.country}`
      )
      .addFields(
        {
          name: "Weather",
          value: `${weatherData.current.condition.text}`,
          inline: true,
        },
        {
          name: "Temperature",
          value: `${weatherData.current.temp_c}°C / ${weatherData.current.temp_f}°F`,
          inline: true,
        },
        {
          name: "Wind Speed",
          value: `${weatherData.current.wind_mph} mph / ${weatherData.current.wind_kph} kph`,
          inline: true,
        },
        {
          name: "Humidity",
          value: `${weatherData.current.humidity}%`,
          inline: true,
        }
      )
      .setThumbnail("https://cdn.weatherapi.com/weather/64x64/day/116.png")
      .setColor("#00b0f4")
      .setFooter({
        text: "Weatherbot",
        iconURL: "https://avatars.githubusercontent.com/u/107737568?v=4",
      })
      .setTimestamp();

    return embed;
  } catch (error) {
    const embed = new EmbedBuilder()
      .setTitle("There was an error trying to get the location.")
      .setColor("#00b0f4")
      .setTimestamp();
    return embed;
  }
}

export const data = new SlashCommandBuilder()
  .setName("weather")
  .setDescription("Get the weather of a location")
  .addStringOption((option) =>
    option.setName("location").setDescription("The location").setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const input = interaction.options.getString("location")!;
  const embed = await getEmbed(input);

  return interaction.reply({ embeds: [embed!] });
}
