import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Register({ onRegister }) {
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
    onRegister(formValue.password, formValue.email);
  };

  return (
    <div className="entry">
      <h2 className="entry__title">Регистрация</h2>
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
        <button className="entry__submit">Зарегистрироваться</button>
      </form>
      <p className="entry__text">
        Уже зарегестрированы?{" "}
        <Link className="entry__link" to="/signin">
          Войти
        </Link>
      </p>
    </div>
  );
}
