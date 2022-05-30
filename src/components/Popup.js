// открытие и закрытие попапа

export class Popup {

  constructor (popupSelector) {
    this._currentPopup = document.querySelector(popupSelector);
  }

  //открытие попапа
  openPopup() {
    this._currentPopup.classList.add('popup_is-active');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
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

// при клике мыши закрывать попап
  setEventListeners() {
    this._currentPopup.addEventListener('mousedown', function(evt) {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    }.bind(this));
  }
}



// //открываем попам
// function openPopup(popup) {
//   popup.classList.add('popup_is-active');
//   document.addEventListener('keydown', closePopupByEsc);
// }

// //закрываем попап
// function closePopup(popup) {
//   popup.classList.remove('popup_is-active');
//   document.removeEventListener('keydown', closePopupByEsc);

// }

// //закрываем открытый попап
// function closeCurrentPopup() {
//   const openedPopup = document.querySelector('.popup_is-active');
//   closePopup(openedPopup);
// }

// //обрабатываем нажатие кнопки esc
// function closePopupByEsc(evt) {
//   if (evt.key === "Escape") {
//     closeCurrentPopup();
//   }
// }

// // Закрытие попапов при нажатии на оверлей
// function setOverlayListener(popup) {
//   popup.addEventListener('mousedown', function(evt) {

//     if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
//       closePopup(popup);
//     }
//   });
// }
