const editProfile = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popup');
const modalCloseWindow = modalWindow.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let nameEnter = document.querySelector('.profile__name');
let jobEnter = document.querySelector('.profile__about');


function openModalWindow() {
  modalWindow.classList.toggle('popup_is-active');
  nameInput.value = nameEnter.textContent;
  jobInput.value = jobEnter.textContent;
}

function closeModalWindow() {
  modalWindow.classList.toggle('popup_is-active');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameEnter.textContent = nameInput.value;
  jobEnter.textContent = jobInput.value;

  closeModalWindow();
}

formElement.addEventListener('submit', formSubmitHandler);
editProfile.addEventListener('click', openModalWindow);
modalCloseWindow.addEventListener('click', closeModalWindow);