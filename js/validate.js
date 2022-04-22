// функция включения проверки ошибок
function enableValidation(config) {
  const card = document.querySelector(config.cardSelector);
  const form = card.querySelector(config.formSelector);
  const inputs = form.querySelectorAll(config.inputsSelector);


  form.addEventListener('input', function(event) {
    handleFormInput(event, form, config);
  });

  toggleButton(form, config);
}

//выдача ошибки при вводе текста в поле
function handleFormInput(event, form, config) {
  const input = event.target;
  toggleInput(input, config);
  toggleButton(form, config);
}
//функция проверки валидности поля в форме
function toggleInput(input, config) {
  const errorNode = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorNode.textContent = '';
  } else {
    errorNode.textContent = input.validationMessage;
  }
  input.classList.toggle(config.inputError, !input.validity.valid);
}

//блокировка отправки кнопки "Сохранить" при не валидности
function toggleButton(form, config) {
  const button = form.querySelector(config.buttonSelector);
  button.disabled = !form.checkValidity(); // если форма не валидна то кнопка не работает
  button.classList.toggle(config.buttonDisabled, !form.checkValidity());
}

//получить форму
enableValidation({
  cardSelector: '.popup_card',
  formSelector: '.popup__form',
  inputsSelector: '.popup__input',
  buttonSelector: '.popup__button',
  buttonDisabled: 'popup__button_state_disabled',
  inputError: 'popup__input_state_redline',
});

enableValidation({
  cardSelector: '.popup_profile',
  formSelector: '.popup__form',
  inputsSelector: '.popup__input',
  buttonSelector: '.popup__button',
  buttonDisabled: 'popup__button_state_disabled',
  inputError: 'popup__input_state_redline',
});
