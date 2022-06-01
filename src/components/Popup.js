// открытие и закрытие попапа

export class Popup {

  constructor (popupSelector) {
    this._currentPopup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //открытие попапа
  openPopup() {
    this._currentPopup.classList.add('popup_is-active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа
  closePopup() {
    this._currentPopup.classList.remove('popup_is-active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //нажатие на кнопку esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._currentPopup.addEventListener('mousedown', function(evt) {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    }.bind(this));
  }
}
