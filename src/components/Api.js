export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl=baseUrl;
    this._headers=headers;
  }

  _checkResponse(res) {
    if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

  getUserInfo () {
   return fetch(`${this._baseUrl}/users/me`, {
     method: 'GET',
     headers: this._headers
   })
   .then (this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then (this._checkResponse)
  }

  patchUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then (this._checkResponse)
  }

  postNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(item),
    })
    .then (this._checkResponse)
  }

  likeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data.cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then (this._checkResponse)
  }

  deleteLikeCard(data){
  return fetch(`${this._baseUrl}/cards/${data.cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then (this._checkResponse)
  }

editAvatar(data) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(data),
  })
  .then (this._checkResponse)
}

deleteCard(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this._headers,
  })
  .then (this._checkResponse)
}
}




