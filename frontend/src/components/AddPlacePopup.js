import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: cardName, link: cardLink });
  }

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setCardName(e.target.value);
  }

  function handleChangeLink(e) {
    setCardLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="card-editor"
      title="Новое место"
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="popup__input-container">
        <input
          className="popup__input"
          id="card-title-input"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={cardName}
          onChange={handleChangeName}
        />
        <span className="popup__error card-title-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          className="popup__input"
          id="card-link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={cardLink}
          onChange={handleChangeLink}
        />
        <span className="popup__error card-link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
