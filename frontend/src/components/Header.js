import headerLogo from "../images/header-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header({ userEmail, loggedIn, handleSignOut }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const location = useLocation();

  function signOut() {
    handleSignOut();
    toggleBtnMenu();
  }

  function toggleBtnMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <header className="header root__content">
      <div className="header__container">
        <button type="button" className="header__link">
          <img
            className="header__logo"
            src={headerLogo}
            alt="Логотип-надпись место Россия"
          />
        </button>
        {location.pathname === "/signin" && (
          <Link className="header__entry header__entry_small" to="/signup">
            Регистрация
          </Link>
        )}
        {location.pathname === "/signup" && (
          <Link className="header__entry header__entry_small" to="/signin">
            Войти
          </Link>
        )}
        {location.pathname === "/main" && (
          <button
            className={`header__menu ${
              isMenuOpened ? "header__menu_close" : ""
            }`}
            type="button"
            aria-label="меню"
            onClick={toggleBtnMenu}
          />
        )}
      </div>
      {loggedIn && (
        <nav
          className={`header__navigation ${
            isMenuOpened ? "header__navigation_opened" : ""
          }`}
        >
          <p className="header__user-email">{userEmail}</p>
          <Link className="header__entry" onClick={signOut}>
            Выйти
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
