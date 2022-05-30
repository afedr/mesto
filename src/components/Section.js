// отрисовка элементов на странице

export class Section {
  constructor({items, renderer}, selector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  //отрисовка всех элементов
  renderItems() {
    this._initialArray.forEach(item => this._container.append(this._renderer(item)));
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
