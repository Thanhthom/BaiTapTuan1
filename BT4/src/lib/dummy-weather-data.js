import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react"

/**
 * @typedef {Object} WeatherData
 * @property {string} city
 * @property {string} currentTime
 * @property {string} currentDate
 * @property {number} currentTemp
 * @property {string} currentDescription
 * @property {number} currentHumidity
 * @property {number} currentWindSpeed
 * @property {{ value: number }[]} chartData
 * @property {{ date: string, icon: React.ElementType, humidity: number }[]} forecast
 */

/** @type {Record<string, WeatherData>} */
export const weatherData = {
  london: {
    city: "London",
    currentTime: "5:05 PM",
    currentDate: "Mon, Nov 23, 2020",
    currentTemp: 72,
    currentDescription: "Cloudy",
    currentHumidity: 45,
    currentWindSpeed: 19.2,
    chartData: [
      { value: 68 },
      { value: 70 },
      { value: 72 },
      { value: 71 },
      { value: 73 },
      { value: 75 },
      { value: 74 },
    ],
    forecast: [
      { date: "Today", icon: Cloud, humidity: 30 },
      { date: "Nov 24", icon: Cloud, humidity: 36 },
      { date: "Nov 25", icon: Sun, humidity: 20 },
      { date: "Nov 26", icon: Sun, humidity: 15 },
    ],
  },
  "new york": {
    city: "New York",
    currentTime: "10:30 AM",
    currentDate: "Mon, Nov 23, 2020",
    currentTemp: 55,
    currentDescription: "Partly Cloudy",
    currentHumidity: 60,
    currentWindSpeed: 15.0,
    chartData: [
      { value: 50 },
      { value: 52 },
      { value: 55 },
      { value: 53 },
      { value: 56 },
      { value: 58 },
      { value: 57 },
    ],
    forecast: [
      { date: "Today", icon: Cloud, humidity: 60 },
      { date: "Nov 24", icon: CloudRain, humidity: 75 },
      { date: "Nov 25", icon: Sun, humidity: 40 },
      { date: "Nov 26", icon: CloudSnow, humidity: 80 },
    ],
  },
  paris: {
    city: "Paris",
    currentTime: "8:00 PM",
    currentDate: "Mon, Nov 23, 2020",
    currentTemp: 60,
    currentDescription: "Rainy",
    currentHumidity: 80,
    currentWindSpeed: 22.5,
    chartData: [
      { value: 58 },
      { value: 59 },
      { value: 60 },
      { value: 59 },
      { value: 61 },
      { value: 63 },
      { value: 62 },
    ],
    forecast: [
      { date: "Today", icon: CloudRain, humidity: 80 },
      { date: "Nov 24", icon: CloudRain, humidity: 85 },
      { date: "Nov 25", icon: Cloud, humidity: 70 },
      { date: "Nov 26", icon: Sun, humidity: 50 },
    ],
  },
}

/**
 * @param {string} city
 * @returns {WeatherData | undefined}
 */
export function getWeatherData(city) {
  return weatherData[city.toLowerCase()]
}
