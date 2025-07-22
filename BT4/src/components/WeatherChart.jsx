export function WeatherChart({ chartData, selectedMetric }) {
  const metricConfig = {
    temperature: {
      label: "Temperature",
      color: "rgb(239, 68, 68)",
      fill: "rgba(239, 68, 68, 0.1)",
      unit: "\u00B0F",
    },
    humidity: {
      label: "Humidity",
      color: "rgb(59, 130, 246)",
      fill: "rgba(59, 130, 246, 0.1)",
      unit: "%",
    },
    uv: {
      label: "UV Index",
      color: "rgb(250, 204, 21)",
      fill: "rgba(250, 204, 21, 0.1)",
      unit: "",
    },
  };

  const data = chartData[selectedMetric] || []
  const maxVal = Math.max(...data.map((d) => d.value))
  const minVal = Math.min(...data.map((d) => d.value))
  const range = maxVal - minVal || 1
  const scaleY = (value) => ((value - minVal) / range) * 80 + 10

  const points = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${100 - scaleY(d.value)}`)
    .join(" ")

  const currentX = (2 / (data.length - 1)) * 100
  const currentY = 100 - scaleY(data[2]?.value || 0)
  const { label, color, fill, unit } = metricConfig[selectedMetric]

  return (
    <div className="weather-chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          {label} {unit ? `(${unit})` : ""}
        </h3>
      </div>
      <div className="chart-content">
        <div className="chart-svg-wrapper">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="chart-svg">
            <path d={`M0,100 L${points} L100,100 Z`} fill={fill} stroke="none" />
            <polyline points={points} fill="none" stroke={color} strokeWidth="1" />
            <circle cx={currentX} cy={currentY} r="1.5" fill={color} />
            <text
              x={currentX + 5}
              y={currentY + 5}
              fontSize="10"
              fontFamily="Arial"
              fill={color}
              className="chart-temp-label"
            >
              {data[2]?.value}{unit}
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
