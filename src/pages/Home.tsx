import { useState, useEffect } from 'react';
import HomeView from '../components/Home/HomeView';
import { useWeather } from '../hooks/useWeather';
import { CITY_LIST } from '../constants/cities';

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


  const { data, loading, fetchByCity } = useWeather();

  useEffect(() => {
    if (selectedCity) {
      fetchByCity(selectedCity, 'en');
    }
  }, [selectedCity]);

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

  const toggleDay = (dateKey: string) => {
    setOpenDays((prev) => ({
      ...prev,
      [dateKey]: !prev[dateKey],
    }));
  };

  return (
    <HomeView
      cities={CITY_LIST}
      selectedCity={selectedCity}
      onSelectCity={setSelectedCity}
      showContactModal={showContactModal}
      setShowContactModal={setShowContactModal}
      showExplorerModal={showExplorerModal}
      setShowExplorerModal={setShowExplorerModal}
      city={data?.city.name || ''}
      groupedForecasts={groupedForecasts}
      openDays={openDays}
      toggleDay={toggleDay}
      loading={loading}
    />
  );
}
