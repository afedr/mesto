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

import {UserInfo} from './UserInfo.js';
import {Card} from './Card.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {Section} from './Section.js';
import {FormValidator} from './FormValidator.js';

const userInfo = new UserInfo ('.profile__name', '.profile__about');

const imagePopup = new PopupWithImage('.popup_image');

// разметка для отрисовки элементов на странице
const cardsList = new Section ({
  items: initialCards,
  renderer: (cardItem) => {
    const name = cardItem.name;
    const link = cardItem.link;
    const card = new Card (
        name,
        link,
        '.template-card',
        imagePopup.openPopup.bind(imagePopup));
    return card.getContent();
  }},
  '.elements__container'
);

cardsList.renderItems();

const profilePopup = new PopupWithForm(
  ".popup_profile",
  (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues['username'],
      info: inputValues['userabout']
    })
  });

const cardPopup = new PopupWithForm(
  ".popup_card",
  (inputValues) => {
    const card = new Card (
        inputValues['title'],
        inputValues['link'],
        '.template-card',
        imagePopup.openPopup.bind(imagePopup));
    cardsList.addItem(card.getContent());
  });

//.resetValidation();

const profileEditButton = document.querySelector('.profile__edit-button'); // редактирование профиля
const cardPopupAdd = document.querySelector('.profile__button'); //добавление карточки
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');

profileEditButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.info;

  formValidators[profilePopup.getFormName()].resetValidation();
  profilePopup.openPopup();
});

cardPopupAdd.addEventListener('click', () => {
  formValidators[cardPopup.getFormName()].resetValidation();
  cardPopup.openPopup();
});

imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();

const formValidators = {}

// функция включения проверки ошибок
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(function(form) {
    const formValidator = new FormValidator(config, form);
    formValidator.enableValidation();

    const formName = form.getAttribute('name')
    formValidators[formName] = formValidator; // записываем в словарь ключ formname со зрачением formvalidator
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputsSelector: '.popup__input',
  buttonSelector: '.popup__button',
  buttonDisabled: 'popup__button_state_disabled',
  inputError: 'popup__input_state_redline',
});
