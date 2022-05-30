import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._currentPopupForm = this._currentPopup.querySelector('.popup__form');
    this._currentInputs = this._currentPopupForm.querySelectorAll('.popup__input');

    this._callbackSubmitForm = callbackSubmitForm;
  }

  getFormName() {
    return this._currentPopupForm.getAttribute('name');
  }

  //собирает данные всех полей формы
  _getInputValues() {
    const inputValues = {}
    this._currentInputs.forEach(element => {
      inputValues[element.getAttribute('name')] = element.value;
    });
    return inputValues;
  }

  //перезаписывает закрытие попапа и обрабатывает отпраку тек формы
  setEventListeners() {
    super.setEventListeners();
    this._currentPopupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
      this.closePopup();
    });
  }

  //перезаписывает закрытие и сброса попапа
  closePopup() {
    super.closePopup();
    this._currentPopupForm.reset();
  }
}


