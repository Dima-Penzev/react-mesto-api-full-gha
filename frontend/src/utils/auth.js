const BASE_URL = "https://api.mesto.full.nomoredomains.work";

function requestData(url, option) {
  return fetch(url, option).then(getResponseData);
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function register(password, email) {
  return requestData(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  });
}

export function login(password, email) {
  return requestData(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  });
}

export function logout() {
  return requestData(`${BASE_URL}/signout`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });
}

export function getContent() {
  return requestData(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });
}
