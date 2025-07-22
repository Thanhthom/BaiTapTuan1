export function ForecastCard({ date, icon: Icon, humidity, isActive }) {
  return (
    <div className={`forecast-card ${isActive ? "forecast-card-active" : ""}`}>
      <div className="forecast-date">{date}</div>
      <Icon className="forecast-icon" />
      <div className="forecast-humidity-label">Humidity</div>
      <div className="forecast-humidity-value">{humidity}%</div>
    </div>
  )
}
