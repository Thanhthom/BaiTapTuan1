import { useState, useEffect } from "react"
import { CurrentWeatherDisplay } from "./components/CurrentWeatherDisplay"
import { ForecastCard } from "./components/ForecastCard"
import { WeatherChart } from "./components/WeatherChart"
import { formatDateTime } from "./lib/weather-utils"
import "./App.css"

const API_KEY = "f5ac4be4a19c47d8a3e42522222112"
const BASE_URL = "http://api.weatherapi.com/v1/forecast.json"

function App() {
  const [city, setCity] = useState("Hanoi")
  const [inputCity, setInputCity] = useState("Hanoi")
  const [weather, setWeather] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMetric, setSelectedMetric] = useState("temperature")

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `${BASE_URL}?key=${API_KEY}&q=${city}&days=10&aqi=no&alerts=yes`
        )

        if (!response.ok) throw new Error("Failed to fetch weather")

        const data = await response.json()
        const { time, date } = formatDateTime(data.current.last_updated)

        const currentWeatherData = {
          city: data.location.name,
          currentTime: time,
          currentDate: date,
          currentTemp: data.current.temp_f,
          currentDescription: data.current.condition.text,
          currentHumidity: data.current.humidity,
          currentWindSpeed: data.current.wind_kph,
          currentIconUrl: data.current.condition.icon.startsWith("//")
            ? "https:" + data.current.condition.icon
            : data.current.condition.icon
        }

        const hours = data.forecast.forecastday[0].hour.filter((_, i) => i % 3 === 0).slice(0, 7)

        const chartData = {
          temperature: hours.map((h) => ({ value: h.temp_f })),
          humidity: hours.map((h) => ({ value: h.humidity })),
          uv: hours.map((h) => ({ value: h.uv }))
        }

        const forecast = data.forecast.forecastday.slice(0, 4).map((day, i) => ({
          date: i === 0 ? "Today" : new Date(day.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }),
          iconUrl: day.day.condition.icon.startsWith("//")
            ? "https:" + day.day.condition.icon
            : day.day.condition.icon,
          humidity: day.day.avghumidity
        }))

        setWeather({
          ...currentWeatherData,
          chartData,
          forecast
        })
      } catch (e) {
        console.error("Fetch error:", e)
        setError("Không thể tải dữ liệu thời tiết. Vui lòng kiểm tra lại.")
        setWeather(undefined)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [city])

  const handleCitySubmit = () => {
    if (inputCity.trim() !== "") setCity(inputCity)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCitySubmit()
  }

  const renderCityInput = () => (
    <div className="input-group">
      <label htmlFor="city-input" className="input-label">Your city</label>
      <input
        id="city-input"
        type="text"
        placeholder="Enter city name"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="city-input"
      />
    </div>
  )

  if (loading || error || !weather) {
    return (
      <div className="app-container">
        <div className="weather-card no-data-card">
          {loading ? (
            <p>Đang tải dữ liệu thời tiết cho "{city}"...</p>
          ) : (
            <p className="error-message">{error || `Không có dữ liệu thời tiết cho "${city}"`}</p>
          )}
          {renderCityInput()}
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="weather-card">
        <div className="weather-column left-column">
          {renderCityInput()}
          <CurrentWeatherDisplay
            currentTime={weather.currentTime}
            currentDate={weather.currentDate}
            currentTemp={weather.currentTemp}
            currentDescription={weather.currentDescription}
            currentHumidity={weather.currentHumidity}
            currentWindSpeed={weather.currentWindSpeed}
            currentIconUrl={weather.currentIconUrl} 
          />
        </div>

        <div className="weather-column right-column">
          <div className="chart-toggle">
            <button onClick={() => setSelectedMetric("temperature")} className={selectedMetric === "temperature" ? "active" : ""}>Temp</button>
            <button onClick={() => setSelectedMetric("humidity")} className={selectedMetric === "humidity" ? "active" : ""}>Humidity</button>
            <button onClick={() => setSelectedMetric("uv")} className={selectedMetric === "uv" ? "active" : ""}>UV</button>
          </div>

          <WeatherChart
            currentTemp={weather.currentTemp}
            chartData={weather.chartData}
            selectedMetric={selectedMetric}
          />

          <div className="forecast-grid">
            {weather.forecast.map((item, i) => (
              <ForecastCard
                key={item.date}
                date={item.date}
                iconUrl={item.iconUrl}
                humidity={item.humidity}
                isActive={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
