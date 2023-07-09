class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, option) {
    return fetch(url, option).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { 
      headers: this._headers,
      credentials: 'include',
     });
  }

  addNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    });
  }

  setUserInfo({ username, activity }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: username,
        about: activity,
      }),
    });
  }

  setUserPhoto(link) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  toggleLikeState(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";

    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this._headers,
      credentials: 'include',
    });
  }
}

const api = new Api({
  // baseUrl: "http://api.mesto.full.nomoredomains.work",
  baseUrl: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api, Api };
