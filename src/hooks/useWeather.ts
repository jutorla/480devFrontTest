import { useState } from 'react';
import { getWeatherForecast, ForecastWeatherResponse } from '../services/api';

interface UseWeatherResult {
  data: ForecastWeatherResponse | null;
  loading: boolean;
  error: string | null;
  fetchByCity: (city: string, lang?: 'en' | 'es') => Promise<void>;
}

export function useWeather(): UseWeatherResult {
  const [data, setData] = useState<ForecastWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByCity = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await getWeatherForecast(city);
      setData(weather);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al obtener el clima');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchByCity,
  };
}
