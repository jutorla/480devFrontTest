const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const APP_ID = 'a05060bd73aaaa92127f1ffc5b132f9f';

export interface ForecastWeatherResponse {
  city: {
    name: string;
    country: string;
  };
  list: {
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
  }[];
}


export async function getWeatherForecast(city: string, lang: string): Promise<ForecastWeatherResponse> {

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${APP_ID}&units=metric&lang=${lang}`; 

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('genericError');
  }

  return await response.json();
}
