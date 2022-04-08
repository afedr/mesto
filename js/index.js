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

const editProfile = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popup');
const modalCloseWindow = modalWindow.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let nameEnter = document.querySelector('.profile__name');
let jobEnter = document.querySelector('.profile__about');

const cardsContainer = document.querySelector('.elements__container');
const template = document.querySelector('.template-card');

// visualization of cards on the page
function render() {
  const htmlCards = initialCards.map(createElement);
  cardsContainer.append(...htmlCards);
}

function createElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const title = getElementTemplate.querySelector('.elements__title');
  const link = getElementTemplate.querySelector('.elements__photo')
  title.textContent = item.name;
  link.src = item.link;


  getElementTemplate.querySelector('.elements__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });
  return getElementTemplate;

};

render();


//edit profile
function openModalWindow() {
  modalWindow.classList.toggle('popup_is-active');
  nameInput.value = nameEnter.textContent;
  jobInput.value = jobEnter.textContent;
} // Открытие popup и сохрание данных из профиля

function closeModalWindow() {
  modalWindow.classList.toggle('popup_is-active');
} // Закрытие popup

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameEnter.textContent = nameInput.value;
  jobEnter.textContent = jobInput.value;

  closeModalWindow();
} // Сохранение введенных данных в профиль

formElement.addEventListener('submit', formSubmitHandler);
editProfile.addEventListener('click', openModalWindow);
modalCloseWindow.addEventListener('click', closeModalWindow);

//add cards


const popupAddCard = document.querySelector('#popup-add');
const toggleFormButton = document.querySelector('.profile__button');
const submitCardForm = document.querySelector('.popup__form_submit-card');
const closeCardButton = document.querySelector('.popup__close_submit-card');
let newCardTitle = document.querySelector('.popup__input_type_title');
let newCardLink = document.querySelector('.popup__input_type_link');

function openAddCardWindow() {
  popupAddCard.classList.toggle('popup_is-active');
  newCardTitle.value = "";
  newCardLink.value = "";
}

function closeAddCardWindow() {
  popupAddCard.classList.toggle('popup_is-active');
}

function cardSubmitHandler(evt) {
  evt.preventDefault();

  let cardData = {
    name: newCardTitle.value,
    link: newCardLink.value
  };

  cardsContainer.prepend(createElement(cardData));

  closeAddCardWindow();
}

submitCardForm.addEventListener('submit', cardSubmitHandler);
toggleFormButton.addEventListener('click', openAddCardWindow);
closeCardButton.addEventListener('click', closeAddCardWindow);

//like button

const LikeButton = document.querySelector('.elements__like-button');

function toggleLikeButton() {
  LikeButton.classList.toggle('.elements__like-button_active');
}

LikeButton.addEventListener('click', toggleLikeButton);