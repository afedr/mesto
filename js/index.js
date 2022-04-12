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

const profilePopup = document.querySelector('.popup__proflle');
const cardPopup = document.querySelector('.popup__card');
const imagePopup = document.querySelector('.popup__image');

const cardsContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('.template-card');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardPopupAdd = document.querySelector('.profile__button');

const profilePopupClose = profilePopup.querySelector('.popup__close');
const profliePopupForm = profilePopup.querySelector('.popup__form');

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

//open popup
function openPopup(popup) {
  popup.classList.add('popup_is-active');
}
//close popup
function closePopup(popup) {
  popup.classList.remove('popup_is-active');
}

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
    imagePopupPicture.src = link.src;
    imagePopupTitle.textContent = title.textContent;
    imagePopupPicture.alt = "123"; // imagePopupTitle.textContent;
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

  nameInput.value = nameEnter.textContent;
  jobInput.value = jobEnter.textContent;
  openPopup(profilePopup);
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameEnter.textContent = nameInput.value;
  jobEnter.textContent = jobInput.value;

  closeProfilePopup();
}

//add cards
function openCardPopup() {
  newCardTitle.value = "";
  newCardLink.value = "";
  openPopup(cardPopup);
}

function closeCardPopup() {
  closePopup(cardPopup);
}

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

profliePopupForm.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openProfilePopup);
profilePopupClose.addEventListener('click', closeProfilePopup);

cardPopupForm.addEventListener('submit', cardSubmitHandler);
cardPopupAdd.addEventListener('click', openCardPopup);
cardPopupClose.addEventListener('click', closeCardPopup);

imagePopupClose.addEventListener('click', closeImagePopup);