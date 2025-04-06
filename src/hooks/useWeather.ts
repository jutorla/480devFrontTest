import { useState, useCallback } from 'react';
import { getWeatherForecast, ForecastWeatherResponse } from '../services/api';
import { useTranslation } from 'react-i18next';

interface UseWeatherResult {
  data: ForecastWeatherResponse | null;
  loading: boolean;
  error: string | null;
  fetchByCity: (city: string, lang?: 'en' | 'es') => Promise<void>;
}

export function useWeather(): UseWeatherResult {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'es' ? 'es' : 'en';
  const [data, setData] = useState<ForecastWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const weather = await getWeatherForecast(city,lang);
      setData(weather);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const translated = err.message === 'genericError' ? t('genericError') : err.message;
        setError(translated);
      } else {
        setError(t('genericError'));
      }
    } finally {
      setLoading(false);
    }
  }, [t]);

  return {
    data,
    loading,
    error,
    fetchByCity,
  };
}
