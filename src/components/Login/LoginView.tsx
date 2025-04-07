import './LoginView.scss';
import { useTranslation } from 'react-i18next';

interface LoginProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: boolean;
}


export default function LoginView({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
}: LoginProps) {
  const { t } = useTranslation();

  return (
    <div className={'login-container'}>
      <div className={'login-card'}>
        <h2 className={'login-title'}>WIRT</h2>
        {error && <p className={'login-error'}> {t('validEmailPassword')}</p>}
        <form onSubmit={onSubmit}>
        <div className={'login-group ' + (error ? 'error' : '')}>
          <label htmlFor="email">{t('email')}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder='test@test.com'
          />
        </div>

          <div className={'login-group ' + (error ? 'error' : '')}>
            <label htmlFor="password">{t('password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder='test'
            />
          </div>

          <button type="submit" className={'login-button'}>
          {t('login')}
          </button>
        </form>
      </div>
    </div>
  );
}
