import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard', () => {
  it('renders with given props', () => {
    render(
      <WeatherCard
        city="London"
        description="scattered clouds"
        icon="03d"
        temp={20}
        tempMin={18}
        tempMax={22}
        timestamp={Math.floor(Date.now() / 1000)}
      />
    );

    expect(screen.getByText(/London/i)).toBeInTheDocument();
    expect(screen.getByText(/scattered clouds/i)).toBeInTheDocument();
  });
});
