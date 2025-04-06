import './Navbar.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  login: boolean;
  setLogin: () => void; 
}

export default function Navbar({ login, setLogin }: Props) {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (lang: 'en' | 'es') => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="topbar">
      <select
        className="language-select"
        onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'es')}
        value={i18n.language}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>

      {login && (
        <button onClick={setLogin}>
          {t('logout', 'Logout')}
        </button>
      )}
    </div>
  );
}
