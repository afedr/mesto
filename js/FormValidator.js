export class FormValidator {
  _form;
  _config;
  _inputs;
  _button;

  constructor (config, form) {
    this._form = form;
    this._config = config;
    this._inputs = this._form.querySelectorAll(this._config.inputsSelector);
    this._button = this._form.querySelector(this._config.buttonSelector);
  }

  // функция очистки ошибок и управления кнопкой
  resetValidation() {
    this._toggleButton();

    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }


  //включение валидации
  enableValidation() {
    this._form.addEventListener('input', (event) => {this._handleFormInput(event)});
    this._toggleButton();
  }


  //показывает либо не показывает ошибку при вводе текста в поле
  _handleFormInput(event) {
    const input = event.target;
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
    this._toggleButton();
  }

  //показать ошибку
  _showInputError(input) {
    const errorNode = document.querySelector(`#${input.id}-error`);
    errorNode.textContent = input.validationMessage;
    input.classList.add(this._config.inputError);
  }

  //скрыть ошибку
  _hideInputError(input) {
    const errorNode = document.querySelector(`#${input.id}-error`);
    errorNode.textContent = '';
    input.classList.remove(this._config.inputError);
  }

  //приведение кнопки "Сохранить" в правильное состояние
  _toggleButton() {
    this._button.disabled = !this._form.checkValidity(); // если форма не валидна то кнопка не работает
    this._button.classList.toggle(this._config.buttonDisabled, !this._form.checkValidity());
  }
}


