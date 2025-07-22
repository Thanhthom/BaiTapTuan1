import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind } from "lucide-react"
export function mapConditionToIcon(conditionText) {
  const lowerCaseText = conditionText.toLowerCase()

  if (lowerCaseText.includes("sunny") || lowerCaseText.includes("clear")) {
    return Sun
  } else if (lowerCaseText.includes("partly cloudy")) {
    return Cloud 
  } else if (lowerCaseText.includes("cloudy") || lowerCaseText.includes("overcast")) {
    return Cloud
  } else if (lowerCaseText.includes("rain") || lowerCaseText.includes("drizzle") || lowerCaseText.includes("shower")) {
    return CloudRain
  } else if (lowerCaseText.includes("snow") || lowerCaseText.includes("sleet") || lowerCaseText.includes("blizzard")) {
    return CloudSnow
  } else if (lowerCaseText.includes("thunder") || lowerCaseText.includes("lightning")) {
    return CloudLightning
  } else if (lowerCaseText.includes("fog") || lowerCaseText.includes("mist")) {
    return CloudFog
  } else if (lowerCaseText.includes("wind")) {
    return Wind
  }
  return Cloud
}

export function formatDateTime(dateTimeString) {
  const dateObj = new Date(dateTimeString)
  const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true }
  const dateOptions = { weekday: "short", month: "short", day: "numeric", year: "numeric" }

  const time = dateObj.toLocaleTimeString("en-US", timeOptions)
  const formattedDate = dateObj.toLocaleDateString("en-US", dateOptions)

  return { time, date: formattedDate }
}
