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

  const data = chartData[selectedMetric] || [];
  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;
  const scaleY = (value) => ((value - minVal) / range) * 80 + 10;

  const getX = (i) => (i / (data.length - 1)) * 100;
  const getY = (i) => 100 - scaleY(data[i].value);

  let pathD = `M ${getX(0)},${getY(0)}`;
  for (let i = 1; i < data.length; i++) {
    const x = getX(i);
    const y = getY(i);
    const xMid = (getX(i - 1) + x) / 2;
    const yMid = (getY(i - 1) + y) / 2;

    pathD += ` Q ${getX(i - 1)},${getY(i - 1)} ${xMid},${yMid}`;
    if (i === data.length - 1) {
      pathD += ` T ${x},${y}`;
    }
  }

  const areaPath = `${pathD} L 100,100 L 0,100 Z`;

  const currentX = getX(2);
  const currentY = getY(2);
  const { label, color, fill, unit } = metricConfig[selectedMetric];

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
            <path d={areaPath} fill={fill} stroke="none" />
            <path d={pathD} fill="none" stroke={color} strokeWidth="1" />
            <circle cx={currentX} cy={currentY} r="1" fill={color} />
            <text
              x={currentX + 3}
              y={currentY + 8}
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
  );
}
