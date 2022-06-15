import '../pages/index.css';
import {} from '../utils/constants.js';

import {UserInfo} from '../components/UserInfo.js';
import {Card} from '../components/Card.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Section} from '../components/Section.js';
import {FormValidator} from '../components/FormValidator.js';
import {Api} from '../components/Api.js';
import { OkPopup } from '../components/OkPopup.js';

const userInfo = new UserInfo ('.profile__name', '.profile__about', '.profile__avatar-icon');
const imagePopup = new PopupWithImage('.popup_image');

const okPopup = new OkPopup (
  '.popup_сontent_ok',
  (card) => {
    api.deleteCard(card._id)
    .then ((data) => {
      card._deleteCard();
      })

    .catch((err) => {
        console.log(err);
      });
    });

const api = new Api ({
  baseUrl:'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
      authorization: 'd52af071-f558-4cc4-aa44-16e72c2d9b78',
      'Content-Type': 'application/json'
    }
  }
);


function createCard(name, link, id, ownerId, count) {
  const card = new Card (
    name,
    link,
    id,
    ownerId,
    userInfo._userId,
    '.template-card',
    imagePopup.openPopup.bind(imagePopup),
    {
      addLikeClick: (data) => {
        api.likeCard(data)
        .then ((res) => {
          card.updateLikeCount(res.likes.length)
        })
        .catch((err) => {
          console.log(err);
        });
      },
      deleteLikeClick: (data) => {
        api.deleteLikeCard(data)
        .then ((res) => {
          card.updateLikeCount(res.likes.length)
        })
        .catch((err) => {
          console.log(err);
        });
      },

    },
    okPopup.openPopup.bind(okPopup),
    );
  card.updateLikeCount(count);
  return card.getContent();
}

// разметка для отрисовки элементов на странице
const cardsList = new Section ({

  renderer: (cardItem) => {
    return createCard(cardItem.name, cardItem.link, cardItem._id, cardItem.owner._id, cardItem.likes.length)
  }},
  '.elements__container'
);

api.getUserInfo()
.then ((data) => {
  userInfo.setUserInfo({
    name: data.name,
    info: data.about,

  })
  userInfo.setAvatar(
    data.avatar
  )
  userInfo.setUserId (
    data._id
  )
})
.catch((err) => {
  console.log(err);
});

api.getInitialCards()
.then ((data) => {
cardsList.renderItems(data);
})
.catch((err) => {
  console.log(err);
});


const profilePopup = new PopupWithForm(
  ".popup_profile",
  (inputValues) => {
    return api.patchUserProfile({
      name: inputValues['username'],
      about: inputValues['userabout']})
    .then ((data) => {
      userInfo.setUserInfo({
        name: inputValues['username'],
        info: inputValues['userabout'],
      })
    })
    .catch((err) => {
      console.log(err);
    });
  });


const cardPopup = new PopupWithForm(
  ".popup_card",
  (inputValues) => {
    return api.postNewCard({
      name:inputValues['title'],
      link:inputValues['link']
    })
    .then ((data) => {
      cardsList.addItem((createCard(inputValues['title'], inputValues['link'], data._id, data.owner._id, data.likes.length)));

    })
    .catch((err) => {
      console.log(err);
    });
  });

const avatarPopup = new PopupWithForm (
  ".popup_сontent_avatar",
  (inputValues) => {
    return api.editAvatar ({
      avatar: inputValues['link']
    })
    .then ((data) => {
      userInfo.setAvatar(
        data.avatar
      )
    })
    .catch((err) => {
      console.log(err);
    });
  }
)

const profileEditButton = document.querySelector('.profile__edit-button');
const cardPopupAdd = document.querySelector('.profile__button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const avatarButton = document.querySelector('.profile__avatar-button');

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

avatarButton.addEventListener('click', () => {
  formValidators[avatarPopup.getFormName()].resetValidation();
  avatarPopup.openPopup();
})


imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();
avatarPopup.setEventListeners();
okPopup._setEventListeners();

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

