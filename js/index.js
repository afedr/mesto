const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

import {imagePopupPicture, imagePopupTitle, imagePopup, openPopup, closePopup, closeCurrentPopup} from './utils.js';

const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_card');

const cardsContainer = document.querySelector('.elements__container');

const profileEditButton = document.querySelector('.profile__edit-button'); // редактирование профиля
const cardPopupAdd = document.querySelector('.profile__button'); //добавление карточки

const profilePopupClose = profilePopup.querySelector('.popup__close');
const profilePopupForm = profilePopup.querySelector('.popup__form');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_about');
const nameEnter = document.querySelector('.profile__name');
const jobEnter = document.querySelector('.profile__about');

const imagePopupClose = imagePopup.querySelector('.popup__close');

const cardPopupForm = cardPopup.querySelector('.popup__form');
const cardPopupClose = cardPopup.querySelector('.popup__close');

const newCardTitle = cardPopup.querySelector('.popup__input_type_title');
const newCardLink = cardPopup.querySelector('.popup__input_type_link');

const profilePopupButton = profilePopup.querySelector('.popup__button');
const cardPopupButton = cardPopup.querySelector('.popup__button');


import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// visualization of cards on the page
function render() {
  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '.template-card');
    cardsContainer.append(card.getContent());
  });
}

render();

//edit profile
function openProfilePopup() {
  profilePopupForm.reset();

  nameInput.value = nameEnter.textContent;
  jobInput.value = jobEnter.textContent;

  openPopup(profilePopup);
}

//закрываем попап редактирования профиля
function closeProfilePopup() {
  closePopup(profilePopup);
}

// сохраняет новые данные проифля
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameEnter.textContent = nameInput.value;
  jobEnter.textContent = jobInput.value;

  closeProfilePopup();
}

//открытие попапа по добавлению крточки
function openCardPopup() {
  cardPopupForm.reset();
  openPopup(cardPopup);
}

//закрытие попапа
function closeCardPopup() {
  closePopup(cardPopup);
}
//обработчик кнопки Отправить при добавлении карточки
function cardSubmitHandler(evt) {
  evt.preventDefault();

  const card = new Card(newCardTitle.value, newCardLink.value, '.template-card');
  cardsContainer.prepend(card.getContent());

  closeCardPopup();
}

//close image window
function closeImagePopup() {
  closePopup(imagePopup);
}

//Закрытие попапов при нажатии на оверлей
function setOverlayListener(popup) {
  popup.addEventListener('mousedown', function(evt) {

    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
}

setOverlayListener(profilePopup);
setOverlayListener(cardPopup);
setOverlayListener(imagePopup);

profilePopupForm.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openProfilePopup);

cardPopupForm.addEventListener('submit', cardSubmitHandler);
cardPopupAdd.addEventListener('click', openCardPopup);


// функция включения проверки ошибок
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(function(form) {
    const formValidator = new FormValidator(config, form);
    formValidator.enableValidation();
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputsSelector: '.popup__input',
  buttonSelector: '.popup__button',
  buttonDisabled: 'popup__button_state_disabled',
  inputError: 'popup__input_state_redline',
});
