import { useEffect } from "react";

export default function InfoTooltip({ name, isOpen, onClose, response }) {
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
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`} onClick={handleBackDropClick}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
        <img className="popup__image" src={response.image} alt="result" />
        <p className="popup__text">{response.massege}</p>
      </div>
    </div>
  );
}
