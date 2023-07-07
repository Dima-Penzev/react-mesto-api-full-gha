export default function InfoTooltip({ name, isOpen, onClose, response }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
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
