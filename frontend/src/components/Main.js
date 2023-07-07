import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="content root__content">
      <section className="user">
        <div className="user__photo-wrap">
          <img className="user__photo" src={avatar} alt="Фото пользователя" />
          <button
            className="user__photo-edit"
            type="button"
            aria-label="заменить фото пользователя"
            onClick={onEditAvatar}
          />
        </div>
        <div className="user__edit-wrap">
          <h1 className="user__name">{name}</h1>
          <button
            className="user__edit"
            type="button"
            aria-label="редактировать"
            onClick={onEditProfile}
          />
        </div>
        <p className="user__activity">{about}</p>
        <button
          className="user__add-card"
          type="button"
          aria-label="добавить"
          onClick={onAddPlace}
        />
      </section>
      <section>
        <ul className="cards-container">
          {cards.map(({ name, link, likes, _id, owner }) => (
            <Card
              name={name}
              link={link}
              likes={likes}
              ownerId={owner._id || owner}
              cardId={_id}
              key={_id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
