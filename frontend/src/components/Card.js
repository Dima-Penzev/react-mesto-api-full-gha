import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  name,
  link,
  likes,
  ownerId,
  cardId,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = ownerId === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id || i === currentUser._id);
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked && "card__like-btn_active"
  }`;

  function handleClick() {
    onCardClick({ name, link });
  }

  function handleLikeClick() {
    onCardLike(cardId, isLiked);
  }

  function handleDeleteClick() {
    onCardDelete(cardId);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__delete"
          type="button"
          aria-label="удалить"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="card__wrap">
        <h2 className="card__text">{name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="нравится"
            onClick={handleLikeClick}
          />
          <p className="card__like-amount">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
