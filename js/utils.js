const imagePopup = document.querySelector('.popup_image');
const imagePopupPicture = imagePopup.querySelector('.popup__img');
const imagePopupTitle = imagePopup.querySelector('.popup__title-img');


//открываем попам
export function openPopup(popup) {
    popup.classList.add('popup_is-active');
    document.addEventListener('keydown', closePopupByEsc);
  }
  
//закрываем попап
export function closePopup(popup) {
    popup.classList.remove('popup_is-active');
    document.removeEventListener('keydown', closePopupByEsc);
  
}

//закрывает открытый попап  
export function closeCurrentPopup() {
    const openedPopup = document.querySelector('.popup_is-active');
    closePopup(openedPopup);
}

//обрабатывает нажатие кнопки esc
function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
      closeCurrentPopup();
    }
  }
export {imagePopupPicture, imagePopupTitle, imagePopup};