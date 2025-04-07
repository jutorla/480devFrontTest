import { useState, useEffect } from 'react';
import './ContactForm.scss';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    dob: '',
    city: '',
    email: '',
    phone: '',
  });

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    dob: '',
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const { name, dob, city, email, phone } = form;

    const birthDate = new Date(dob);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dobIsValid = birthDate < today;

    setErrors({
      dob: dob && !dobIsValid ? t('dobError') : ''
    });

    const allFieldsFilled = !!(name && dob && city && email && phone);

    setIsValid(allFieldsFilled && dobIsValid);
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, '');
      setForm((prev) => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        {t('name')}
        <input name="name" value={form.name} onChange={handleChange} />
      </label>

      <label>
        {t('dateOfBirth')}
        <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        {errors.dob && <p className="error">{errors.dob}</p>}
      </label>

      <label>
        {t('city')}
        <input name="city" value={form.city} onChange={handleChange} />
      </label>

      <label>
        {t('email')}
        <input type="email" name="email" value={form.email} onChange={handleChange} />
      </label>

      <label>
        {t('mobile')}
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
      </label>

      <button type="submit" disabled={!isValid}>
        {t('send')}
      </button>
      {showToast && (
        <div className="toast">
          {t('reachingUs')}
        </div>
      )}
    </form>
  );
}
