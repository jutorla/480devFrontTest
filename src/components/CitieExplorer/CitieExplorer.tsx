import { useState, useEffect } from 'react';
import './CitieExplorer.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  onSearch: (city: string) => void;
  onClose: () => void;
}

export default function CitieExplorer({ onSearch, onClose }: Props) {
  const [form, setForm] = useState({
    city: '',
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!!form.city.trim());
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(form.city.trim());
    onClose();
  };
  const { t } = useTranslation();

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
       {t('cityName')}
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
        />
      </label>

      <button type="submit" disabled={!isValid}>
      {t('search')}
      </button>
    </form>
  );
}
