// отрисовка элементов на странице

export class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  //отрисовка всех элементов
  renderItems(data) {
    data.forEach(item => this._container.append(this._renderer(item)));
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
