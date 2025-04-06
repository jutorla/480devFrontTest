import { render, screen, fireEvent } from '@testing-library/react';
import HomeView from './HomeView';
import { describe, it, expect, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

const mockCities = [
  {
    value: 'london',
    label: { en: 'London', es: 'Londres' },
  },
  {
    value: 'toronto',
    label: { en: 'Toronto', es: 'Toronto' },
  },
];

const mockForecast = {
  dt: 1681065600,
  main: { temp: 22, temp_min: 20, temp_max: 24 },
  weather: [{ description: 'clear sky', icon: '01d' }],
};

const defaultProps = {
  trendingCities: mockCities,
  selectedCity: 'london',
  onSelectCity: vi.fn(),
  showContactModal: false,
  setShowContactModal: vi.fn(),
  showExplorerModal: false,
  setShowExplorerModal: vi.fn(),
  groupedForecasts: {
    '2023-04-09': [mockForecast],
  },
  openDays: {
    '2023-04-09': true,
  },
  toggleDay: vi.fn(),
  loading: false,
  error: null,
};

function renderHomeView(propsOverride = {}) {
  const props = { ...defaultProps, ...propsOverride };

  return render(
    <I18nextProvider i18n={i18n}>
      <HomeView {...props} />
    </I18nextProvider>
  );
}

describe('HomeView', () => {
  it('renders trending cities and calls onSelectCity when clicked', () => {
    renderHomeView();

    const cityButton = screen.getByRole('button', { name: /london/i });
    fireEvent.click(cityButton);

    expect(defaultProps.onSelectCity).toHaveBeenCalledWith('london');
  });

  it('shows loading text when loading is true', () => {
    renderHomeView({ loading: true });

    expect(screen.getByText(/loading weather/i)).toBeInTheDocument();
  });

  it('shows error message if error is passed', () => {
    renderHomeView({ error: 'Something went wrong' });

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });


  it('opens contact modal when Contact is clicked', () => {
    renderHomeView();

    const contactButton = screen.getByText(/contact/i);
    fireEvent.click(contactButton);

    expect(defaultProps.setShowContactModal).toHaveBeenCalledWith(true);
  });

  it('opens city explorer modal when Search City is clicked', () => {
    renderHomeView();

    const explorerButton = screen.getByText(/search city/i);
    fireEvent.click(explorerButton);

    expect(defaultProps.setShowExplorerModal).toHaveBeenCalledWith(true);
  });

  it('renders WeatherCard when groupedForecasts are available', () => {
    renderHomeView();

    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(screen.getByText(/22/)).toBeInTheDocument(); 
  });
});
