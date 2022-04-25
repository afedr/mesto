// функция включения проверки ошибок
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(function(form) {
    const inputs = form.querySelectorAll(config.inputsSelector);
    const button = form.querySelector(config.buttonSelector);

    form.addEventListener('input', function(event) {
      handleFormInput(event, form, button, config);
    });

    toggleButton(form, button, config);
  });
}

//показывает либо не показывает ошибку при вводе текста в поле
function handleFormInput(event, form, button, config) {
  const input = event.target;
  if (input.validity.valid) {
    hideInputError(input, config);
  } else {
    showInputError(input, config);
  }

  toggleButton(form, button, config);
}

//показать ошибку
function showInputError(input, config) {
  const errorNode = document.querySelector(`#${input.id}-error`);
  errorNode.textContent = input.validationMessage;
  input.classList.add(config.inputError);
}

//скрыть ошибку
function hideInputError(input, config) {
  const errorNode = document.querySelector(`#${input.id}-error`);
  errorNode.textContent = '';
  input.classList.remove(config.inputError);
}

//приведение кнопки "Сохранить" в правильное состояние
function toggleButton(form, button, config) {
  button.disabled = !form.checkValidity(); // если форма не валидна то кнопка не работает
  button.classList.toggle(config.buttonDisabled, !form.checkValidity());
}

//получить форму
enableValidation({
  formSelector: '.popup__form',
  inputsSelector: '.popup__input',
  buttonSelector: '.popup__button',
  buttonDisabled: 'popup__button_state_disabled',
  inputError: 'popup__input_state_redline',
});
