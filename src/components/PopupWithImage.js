import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupPicture = this._currentPopup.querySelector('.popup__img');
    this._imagePopupTitle = this._currentPopup.querySelector('.popup__title-img');
  }

  openPopup (name, link) {
    this._imagePopupPicture.src = link;
    this._imagePopupTitle.textContent = name;
    this._imagePopupPicture.alt = name;
    super.openPopup();
  }
}

