import { useState, useEffect } from "react";

export default function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormValue({ email: "", password: "" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue.password, formValue.email);
  };

  return (
    <div className="entry">
      <h2 className="entry__title">Вход</h2>
      <form className="entry__form" onSubmit={handleSubmit}>
        <input
          className="entry__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <input
          className="entry__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <button className="entry__submit">Войти</button>
      </form>
    </div>
  );
}
