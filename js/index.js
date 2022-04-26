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

const profilePopup = document.querySelector('.popup_profile');
const cardPopup = document.querySelector('.popup_card');
const imagePopup = document.querySelector('.popup_image');

const cardsContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('.template-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardPopupAdd = document.querySelector('.profile__button');

const profilePopupClose = profilePopup.querySelector('.popup__close');
const profilePopupForm = profilePopup.querySelector('.popup__form');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_about');
const nameEnter = document.querySelector('.profile__name');
const jobEnter = document.querySelector('.profile__about');

const imagePopupPicture = imagePopup.querySelector('.popup__img');
const imagePopupTitle = imagePopup.querySelector('.popup__title-img');
const imagePopupClose = imagePopup.querySelector('.popup__close');


const cardPopupForm = cardPopup.querySelector('.popup__form');
const cardPopupClose = cardPopup.querySelector('.popup__close');

const newCardTitle = cardPopup.querySelector('.popup__input_type_title');
const newCardLink = cardPopup.querySelector('.popup__input_type_link');

const profilePopupButton = profilePopup.querySelector('.popup__button');
const cardPopupButton = cardPopup.querySelector('.popup__button');

//открываем попам
function openPopup(popup) {
  popup.classList.add('popup_is-active');
  document.addEventListener('keydown', closePopupByEsc);
}

//закрываем попап
function closePopup(popup) {
  popup.classList.remove('popup_is-active');
  document.removeEventListener('keydown', closePopupByEsc);
}

//закрывает открытый попап
function closeCurrentPopup() {
  const openedPopup = document.querySelector('.popup_is-active');
  closePopup(openedPopup);
}

//обрабатывает нажатие кнопки esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closeCurrentPopup();
  }
}

//создание карточки
function createElement(item) {
  const getElementTemplate = cardTemplate.content.cloneNode(true);
  const title = getElementTemplate.querySelector('.elements__title');
  const link = getElementTemplate.querySelector('.elements__photo')
  const deleteButton = getElementTemplate.querySelector('.elements__delete');

  title.textContent = item.name;
  link.src = item.link;
  link.alt = item.name;

  // add like button
  getElementTemplate.querySelector('.elements__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });

  // delete card
  deleteButton.addEventListener('click', function() {
    const listItem = deleteButton.closest('.elements__card');
    listItem.remove();
  });

  // open image
  link.addEventListener('click', function() {
    imagePopupPicture.src = item.link;
    imagePopupTitle.textContent = item.name;
    imagePopupPicture.alt = item.name;
    openPopup(imagePopup);
  });

  return getElementTemplate;
};

// visualization of cards on the page
function render() {
  const htmlCards = initialCards.map(createElement);
  cardsContainer.append(...htmlCards);
}

render();

//edit profile
function openProfilePopup() {
  profilePopupForm.reset();

  nameInput.value = nameEnter.textContent;
  jobInput.value = jobEnter.textContent;

  toggleButton(profilePopupForm, profilePopupButton, {
    buttonDisabled: 'popup__button_state_disabled',
  });

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

  toggleButton(cardPopupForm, cardPopupButton, {
    buttonDisabled: 'popup__button_state_disabled',
  });

  openPopup(cardPopup);
}

//закрытие попапа
function closeCardPopup() {
  closePopup(cardPopup);
}
//обработчик кнопки Отправить при добавлении карточки
function cardSubmitHandler(evt) {
  evt.preventDefault();

  let cardData = {
    name: newCardTitle.value,
    link: newCardLink.value
  };

  cardsContainer.prepend(createElement(cardData));

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
