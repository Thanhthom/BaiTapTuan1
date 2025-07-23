// export function ForecastCard({ date, icon: Icon, humidity, isActive }) {
//   return (
//     <div className={`forecast-card ${isActive ? "forecast-card-active" : ""}`}>
//       <div className="forecast-date">{date}</div>
//       <Icon className="forecast-icon" />
//       <div className="forecast-humidity-label">Humidity</div>
//       <div className="forecast-humidity-value">{humidity}%</div>
//     </div>
//   )
// }

export function ForecastCard({ date, iconUrl, humidity, isActive }) {
  return (
    <div className={`forecast-card ${isActive ? "forecast-card-active" : ""}`}>
      <div className="forecast-date">{date}</div>

      <img
        src={iconUrl}
        alt="Weather Icon"
        className="forecast-icon w-10 h-10 mx-auto mb-2"
      />

      <div className="forecast-humidity-label">Humidity</div>
      <div className="forecast-humidity-value">{humidity}%</div>
    </div>
  );
}
