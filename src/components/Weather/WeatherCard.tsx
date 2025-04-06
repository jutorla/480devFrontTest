import './WeatherCard.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  city: string | null;
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
  const {i18n } = useTranslation();

const date = new Date(timestamp * 1000);
const day = date.toLocaleDateString(i18n.language, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

const time = date.toLocaleTimeString(i18n.language, {
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
