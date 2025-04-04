import { useState } from 'react';
import HomeView from '../components/Home/HomeView';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('London');


  return (
    <HomeView
      cities={['London', 'Toronto', 'Singapore']}
      selectedCity={selectedCity}
      onSelectCity={setSelectedCity}
    />
  );
}
