import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';


export default function AppRouter() {
    const [lang, setLang] = useState<'en' | 'es'>('en');
    const [login, setLogin] = useState(true);

  return (
    <BrowserRouter>
          <Navbar currentLang={lang} onLanguageChange={setLang} login={login} setLogin={setLogin}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
