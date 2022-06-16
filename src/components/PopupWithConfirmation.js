import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor (popupSelector, deleteCardRequest) {
    super(popupSelector);
    this._button = this._currentPopup.querySelector('.popup__button')
    this._deleteCardRequest = deleteCardRequest;
  }

  openPopup(card) {
   this.currentCard = card;
   super.openPopup();
  }

  _setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._deleteCardRequest(this.currentCard)
    });
  }
}
