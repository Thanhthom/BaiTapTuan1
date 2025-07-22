import { useState, useEffect } from "react"
import { CurrentWeatherDisplay } from "./components/CurrentWeatherDisplay"
import { ForecastCard } from "./components/ForecastCard"
import { WeatherChart } from "./components/WeatherChart"
import { mapConditionToIcon, formatDateTime } from "./lib/weather-utils"
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const { time: currentTime, date: currentDate } = formatDateTime(data.current.last_updated)

        const currentWeatherData = {
          city: data.location.name,
          currentTime: currentTime,
          currentDate: currentDate,
          currentTemp: data.current.temp_f,
          currentDescription: data.current.condition.text,
          currentHumidity: data.current.humidity,
          currentWindSpeed: data.current.wind_kph
        }

        const hours = data.forecast.forecastday[0].hour.filter((_, index) => index % 3 === 0).slice(0, 7)

        const chartData = {
          temperature: hours.map((hour) => ({ value: hour.temp_f })),
          humidity: hours.map((hour) => ({ value: hour.humidity })),
          uv: hours.map((hour) => ({ value: hour.uv }))
        }

        const forecastData = data.forecast.forecastday.slice(0, 4).map((day, index) => ({
          date: index === 0 ? "Today" : new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          icon: mapConditionToIcon(day.day.condition.text),
          humidity: day.day.avghumidity
        }))

        setWeather({
          ...currentWeatherData,
          chartData: chartData,
          forecast: forecastData
        })
      } catch (e) {
        console.error("Lỗi khi lấy dữ liệu thời tiết:", e)
        setError("Không thể tải dữ liệu thời tiết. Vui lòng thử lại hoặc kiểm tra tên thành phố.")
        setWeather(undefined)
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      fetchWeatherData()
    }
  }, [city])

  const handleCitySubmit = () => {
    if (inputCity.trim() !== "") {
      setCity(inputCity)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCitySubmit()
    }
  }

  const renderCityInput = () => (
    <div className="input-group">
      <label htmlFor="city-input" className="input-label">
        Your city
      </label>
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
            <p className="error-message">{error || `Không tìm thấy dữ liệu thời tiết cho "${city}".`}</p>
          )}
          {renderCityInput()}
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="weather-card">
        {/* Cột trái */}
        <div className="weather-column left-column">
          {renderCityInput()}
          <CurrentWeatherDisplay
            currentTime={weather.currentTime}
            currentDate={weather.currentDate}
            currentTemp={weather.currentTemp}
            currentDescription={weather.currentDescription}
            currentHumidity={weather.currentHumidity}
            currentWindSpeed={weather.currentWindSpeed}
          />
        </div>

        {/* Cột phải */}
        <div className="weather-column right-column">
          {/* NEW: Metric selection */}
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
            {weather.forecast.map((item, index) => (
              <ForecastCard
                key={item.date}
                date={item.date}
                icon={item.icon}
                humidity={item.humidity}
                isActive={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
