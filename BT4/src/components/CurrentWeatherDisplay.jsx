export function CurrentWeatherDisplay({
  currentTime,
  currentDate,
  currentTemp,
  currentDescription,
  currentHumidity,
  currentWindSpeed,
  currentIconUrl
}) {
  return (
    <div className="current-weather-display">
      <div className="time-date">
        {currentTime}, {currentDate}
      </div>

      <div className="temp-icon-group" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src={currentIconUrl}
          alt={currentDescription}
          style={{ width: "64px", height: "64px", marginBottom: "0.5rem" }}
        />
        <div className="temperature">
          {Math.round(currentTemp)}
          <span className="temp-unit">°F</span>
        </div>
      </div>

      <div className="description">{currentDescription}</div>

      <div className="details-group">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span>{currentHumidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind speed</span>
          <span>{currentWindSpeed} km/j</span>
        </div>
      </div>
    </div>
  )
}
