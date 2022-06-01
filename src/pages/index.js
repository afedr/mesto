import '../pages/index.css';
import {initialCards} from '../utils/constants.js';

import {UserInfo} from '../components/UserInfo.js';
import {Card} from '../components/Card.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Section} from '../components/Section.js';
import {FormValidator} from '../components/FormValidator.js';

const userInfo = new UserInfo ('.profile__name', '.profile__about');
const imagePopup = new PopupWithImage('.popup_image');

function createCard(name, link) {
  const card = new Card (
    name,
    link,
    '.template-card',
    imagePopup.openPopup.bind(imagePopup));
return card.getContent();
}

// разметка для отрисовки элементов на странице
const cardsList = new Section ({
  items: initialCards,
  renderer: (cardItem) => {
    return createCard(cardItem.name, cardItem.link)
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
    cardsList.addItem((createCard(inputValues['title'], inputValues['link'])));
  });

const profileEditButton = document.querySelector('.profile__edit-button');
const cardPopupAdd = document.querySelector('.profile__button');
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
    formValidators[formName] = formValidator;
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputsSelector: '.popup__input',
  buttonSelector: '.popup__button',
  buttonDisabled: 'popup__button_state_disabled',
  inputError: 'popup__input_state_redline',
});
