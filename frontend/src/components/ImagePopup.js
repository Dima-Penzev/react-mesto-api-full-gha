import { useEffect } from "react";

function ImagePopup({ card, onClose }) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}
      onClick={handleBackDropClick}
    >
      <div className="popup__container popup__container_type_image">
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        <figure className="module">
          <img className="module__image" src={card.link} alt={card.name} />
          <figcaption className="module__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
