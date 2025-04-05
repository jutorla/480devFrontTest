import './WeatherCard.scss';

interface Props {
  city: string;
  description: string;
  icon: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  timestamp: number;
}



export default function WeatherCard({
  city,
  description,
  icon,
  temp,
  tempMin,
  tempMax,
  timestamp,
}: Props) {

const date = new Date(timestamp * 1000);
const day = date.toLocaleDateString('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

const time = date.toLocaleTimeString('es-ES', {
  hour: '2-digit',
  minute: '2-digit',
});



  return (
<div className="weather-card">
  <h2>{city}</h2>
  <p className="weather-date">{day} - {time}</p>
  <div className="weather-main">
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
    />
    <div className="weather-info">
      <p className="desc">{description}</p>
      <p className="temp">{temp}°C</p>
      <p className="range">Min: {tempMin}° | Max: {tempMax}°</p>
    </div>
  </div>
</div>

  );
}
