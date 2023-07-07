import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatart, isLoading }) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatart({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="photo-editor"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="popup__input-container">
        <input
          className="popup__input"
          id="photo-link-input"
          type="url"
          name="link"
          placeholder="Ссылка на фото"
          required
          ref={avatarRef}
        />
        <span className="popup__error photo-link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
