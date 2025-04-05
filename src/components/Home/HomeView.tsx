import './HomeView.scss';
import Modal from '../Modal/Modal';
import ContactForm from '../ContactForm/ContactForm';
import CitieExplorer from '../CitieExplorer/CitieExplorer';
import WeatherCard from '../Weather/WeatherCard';

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface HomeProps {
  cities: string[] | null;
  selectedCity: string | null;
  showContactModal: boolean;
  setShowContactModal: (show: boolean) => void;
  showExplorerModal: boolean;
  setShowExplorerModal: (show: boolean) => void;
  city: string;
  groupedForecasts: Record<string, ForecastItem[]>;
  openDays: Record<string, boolean>;
  toggleDay: (dateKey: string) => void;
  onSelectCity: (city: string) => void;
  loading: boolean;
}

export default function HomeView({
  cities,
  selectedCity,
  onSelectCity,
  showContactModal,
  setShowContactModal,
  showExplorerModal,
  setShowExplorerModal,
  city,
  groupedForecasts,
  openDays,
  toggleDay,
  loading,
}: HomeProps) {
  return (
    <div className="home">
      <div className="sidebar">
        <h3>Trending cities</h3>
        {cities &&
          cities.map((cityName) => (
            <button
              key={cityName}
              onClick={() => onSelectCity(cityName)}
              style={{
                fontWeight: cityName === selectedCity ? 'bold' : 'normal',
              }}
            >
              {cityName}
            </button>
          ))}
        <h3 onClick={() => setShowExplorerModal(true)}>Search City</h3>
        <h3 onClick={() => setShowContactModal(true)}>Contact</h3>
      </div>

      <div className="weather-content">
        {loading && <p className="loading-text">Cargando clima...</p>}

        {!selectedCity && !loading && (
          <p className="empty-text">Selecciona una ciudad para ver el clima</p>
        )}

        {!loading && selectedCity && Object.keys(groupedForecasts).length > 0 && (
          <div className="grouped-forecast">
            {Object.entries(groupedForecasts).map(([dateKey, forecasts]) => {
              const readableDate = new Date(dateKey).toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              });

              const isOpen = openDays[dateKey];

              return (
                <div key={dateKey} className="day-group">
                  <h3 className="group-title" onClick={() => toggleDay(dateKey)}>
                    {readableDate} {isOpen ? '▲' : '▼'}
                  </h3>

                  {isOpen && (
                    <div className="forecast-grid">
                      {forecasts.map((forecast) => {
                        const { temp, temp_min, temp_max } = forecast.main;
                        const { description, icon } = forecast.weather[0];

                        return (
                          <WeatherCard
                            key={forecast.dt}
                            city={city}
                            description={description}
                            icon={icon}
                            temp={temp}
                            tempMin={temp_min}
                            tempMax={temp_max}
                            timestamp={forecast.dt}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)}>
        <ContactForm />
      </Modal>

      <Modal isOpen={showExplorerModal} onClose={() => setShowExplorerModal(false)}>
        <CitieExplorer
          onSearch={(cityName) => onSelectCity(cityName)}
          onClose={() => setShowExplorerModal(false)}
        />
      </Modal>
    </div>
  );
}
