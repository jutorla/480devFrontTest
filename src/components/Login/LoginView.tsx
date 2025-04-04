import './LoginView.scss';

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
}: LoginProps) {return (
    <div className={'login-container'}>
      <div className={'login-card'}>
        <h2 className={'login-title'}>WIRT? (Will It Rain Today)</h2>
        {error && <p className={'login-error'}>Please enter valid email and password</p>}
        <form onSubmit={onSubmit}>
        <div className={'login-group ' + (error ? 'error' : '')}>
          <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={onEmailChange}
            />
          </div>

          <div className={'login-group ' + (error ? 'error' : '')}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
            />
          </div>

          <button type="submit" className={'login-button'}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
