import { useState, useEffect } from 'react';
import HomeView from '../components/Home/HomeView';
import { useWeather } from '../hooks/useWeather';
import { CITY_LIST } from '../constants/cities';
import { useTranslation } from 'react-i18next';

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

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showExplorerModal, setShowExplorerModal] = useState(false);
  const [groupedForecasts, setGroupedForecasts] = useState<Record<string, ForecastItem[]>>({});
  const { i18n } = useTranslation();


  const { data, loading, error, fetchByCity } = useWeather();

  useEffect(() => {
    if (selectedCity) {
      fetchByCity(selectedCity, i18n.language as 'en' | 'es');
    }
  }, [selectedCity, i18n.language]);

  const groupForecastsByDay = (list: ForecastItem[]) => {
    return list.reduce<Record<string, ForecastItem[]>>((acc, forecast) => {
      const dateKey = new Date(forecast.dt * 1000).toISOString().split('T')[0];
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(forecast);
      return acc;
    }, {});
  };

  useEffect(() => {
    if (data?.list) {
      const sliced = data.list.slice(0, 40);
      const grouped = groupForecastsByDay(sliced);
      setGroupedForecasts(grouped);

      const today = new Date().toISOString().split('T')[0];
      setOpenDays({ [today]: true });
    }
  }, [data]);

  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (Object.keys(groupedForecasts).length > 0) {
      const today = new Date().toISOString().split('T')[0];
      setOpenDays({ [today]: true });
    }
  }, [groupedForecasts]);

  useEffect(() => {
    if (error) {
      setSelectedCity(null);
      setGroupedForecasts({});
      setOpenDays({});
    }
  }, [error]);



  const toggleDay = (dateKey: string) => {
    setOpenDays((prev) => ({
      ...prev,
      [dateKey]: !prev[dateKey],
    }));
  };

  return (
    <HomeView
      trendingCities={CITY_LIST}
      selectedCity={selectedCity}
      onSelectCity={setSelectedCity}
      showContactModal={showContactModal}
      setShowContactModal={setShowContactModal}
      showExplorerModal={showExplorerModal}
      setShowExplorerModal={setShowExplorerModal}
      groupedForecasts={groupedForecasts}
      openDays={openDays}
      toggleDay={toggleDay}
      loading={loading}
      error={error}
    />
  );
}
