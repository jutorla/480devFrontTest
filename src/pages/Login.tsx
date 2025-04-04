import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginView from '../components/Login/LoginView';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      navigate('/home');
    }
    else {
      setError(true);
    }
  };

  return (
    <LoginView
      email={email}
      password={password}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleSubmit}
      error={error}
    />
  );
}
