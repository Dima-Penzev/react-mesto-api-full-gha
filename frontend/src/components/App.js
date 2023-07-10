import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import successImg from "../images/img-success.png";
import errorImg from "../images/img-error.png";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";
import UnexistedPath from "./UnexistedPath";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", email: "" });
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [responseData, setResponseData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie === "loggedIn=true") {
      auth
      .getContent()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, initialCards]) => {
        setCurrentUser(user.data);
        setCards(initialCards.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(cardId, isLiked) {

    api
      .toggleLikeState(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === cardId ? newCard.data : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    setIsConfirmPopupOpen(true);
    setCardId(cardId);
  }

  function handleConfirmDelete(e) {
    e.preventDefault();

    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);

    api
      .setUserInfo({ username: name, activity: about })
      .then((response) => {
        setCurrentUser(response.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);

    api
      .setUserPhoto(avatar)
      .then((response) => {
        setCurrentUser(response.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);

    api
      .addNewCard(newCard)
      .then((response) => {
        setCards([response.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(userPassword, userEmail) {
    auth
      .login(userPassword, userEmail)
      .then(() => {
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut() {
    auth.logout().then((res) => {
      setLoggedIn(false);
      navigate("/sign-in");
    })
    .catch((err) => console.log(err));
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        navigate("/sign-in");
        setIsInfoTooltipOpen(true);
        setResponseData({
          image: successImg,
          massege: "Вы успешно зарегистрировались!",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setResponseData({
          image: errorImg,
          massege: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={currentUser.email}
          loggedIn={loggedIn}
          handleSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route path="/*" element={<UnexistedPath />}/>
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatart={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleConfirmDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          name="info"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          response={responseData}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
