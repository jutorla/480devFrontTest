import './HomeView.scss';

interface HomeProps {
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export default function HomeView({
  cities,
  selectedCity,
  onSelectCity,
}: HomeProps) {
  return (
    <div className="home">
      <div className="sidebar">
        <h3>Cities</h3>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onSelectCity(city)}
            style={{
              fontWeight: city === selectedCity ? 'bold' : 'normal',
            }}
          >
            {city}
          </button>
        ))}
        <a href="/contact">Contact</a>
      </div>
      WEATHER
    </div>
  );
}
