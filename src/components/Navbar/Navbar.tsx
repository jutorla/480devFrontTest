import './Navbar.scss';

interface Props {
  onLanguageChange: (lang: 'en' | 'es') => void;
  currentLang: 'en' | 'es';
  login: boolean;
  setLogin: (login: boolean) => void;
}

export default function Navbar({ onLanguageChange, currentLang, login, setLogin }: Props) {
  return (
    <div className="topbar">
      <select className='language-select'
        onChange={(e) => onLanguageChange(e.target.value as 'en' | 'es')}
        value={currentLang}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    {login && (
      <button onClick={() => setLogin(false)}>Logout</button>
    )}
    </div>
  );
}
