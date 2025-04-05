import { useState, useEffect } from 'react';
import './CitieExplorer.scss';

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

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        City Name
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Ej. Madrid"
        />
      </label>

      <button type="submit" disabled={!isValid}>
        Search
      </button>
    </form>
  );
}
