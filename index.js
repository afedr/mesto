const editProfile = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popup');
const modalCloseWindow = modalWindow.querySelector('.popup__close');

function toggleModalWindow() {
  modalWindow.classList.toggle('popup_is-active');
}

editProfile.addEventListener('click', toggleModalWindow);

modalCloseWindow.addEventListener('click', toggleModalWindow);


let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
let nameEnter = document.querySelector('.profile__name');
let jobEnter = document.querySelector('.profile__about');

function formSubmitHandler(evt) {

  evt.preventDefault();


  nameEnter.textContent = nameInput.value;
  jobEnter.textContent = jobInput.value;

  toggleModalWindow();
}

formElement.addEventListener('submit', formSubmitHandler);