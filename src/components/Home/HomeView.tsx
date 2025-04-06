import './HomeView.scss';
import Modal from '../Modal/Modal';
import ContactForm from '../ContactForm/ContactForm';
import CitieExplorer from '../CitieExplorer/CitieExplorer';
import WeatherCard from '../Weather/WeatherCard';
import { useTranslation } from 'react-i18next';
import { City } from '../../constants/cities';
import { getLang } from '../../utils/lang';

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
  trendingCities: City[] | null;
  selectedCity: string | null;
  showContactModal: boolean;
  setShowContactModal: (show: boolean) => void;
  showExplorerModal: boolean;
  setShowExplorerModal: (show: boolean) => void;
  groupedForecasts: Record<string, ForecastItem[]>;
  openDays: Record<string, boolean>;
  toggleDay: (dateKey: string) => void;
  onSelectCity: (city: string) => void;
  loading: boolean;
  error: string | null;
}

export default function HomeView({
  trendingCities,
  selectedCity,
  onSelectCity,
  showContactModal,
  setShowContactModal,
  showExplorerModal,
  setShowExplorerModal,
  groupedForecasts,
  openDays,
  toggleDay,
  loading,
  error
}: HomeProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className="home">
      <div className="sidebar">
        <h3>{t('selectCityPrompt')}</h3>
        <h4>{t('trendingCities')}</h4>
        {trendingCities &&
          trendingCities.map((city) => (
            <button
              key={city.value}
              onClick={() => onSelectCity(city.value)}
              style={{
                fontWeight: city.value === selectedCity ? 'bold' : 'normal',
              }}
            >
              {city.label[getLang(i18n.language)]}
            </button>
          ))}
        <h3 onClick={() => setShowExplorerModal(true)}>{t('searchCity')}</h3>
        <h3 onClick={() => setShowContactModal(true)}>{t('contact')}</h3>
      </div>
      <div className="weather-content">
        {loading && <p className="loading-text">{t('loadingWeather')}</p>}
        {!selectedCity && !loading && !error && (
          <p className="empty-text">{t('selectCityPrompt')}</p>
        )}
        {error && <p className="error-text">{error}</p>}
        {!loading && selectedCity && Object.keys(groupedForecasts).length > 0 && (
          <div className="grouped-forecast">
            {Object.entries(groupedForecasts).map(([dateKey, forecasts]) => {
              const readableDate = new Date(dateKey).toLocaleDateString(i18n.language, {
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
                            city={selectedCity}
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
