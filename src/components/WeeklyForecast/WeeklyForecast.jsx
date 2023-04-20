import { useWeatherContext } from "../../store/WeatherContext";
import "./WeeklyForecast.css";

function WeeklyForecast() {
  const { weeklyForecast, units } = useWeatherContext();
  console.log("WeeklyForecast: ", weeklyForecast)
  
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="weekly-forecast-container">
      {weeklyForecast && weeklyForecast.slice(0, 7).map((day, index) => (
        <div key={day.date} className="weekly-forecast-card">
          <h3>{weekdays[new Date(day.date).getDay()]}</h3>
          <img src={`http://openweathermap.org/img/w/${day.icon}.png`} alt={day.description} />
          <div>
            {units === "metric" ? `${day.temp}°C` : `${day.temp}°F`}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeeklyForecast;