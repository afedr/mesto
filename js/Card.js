export class Card {
  _cardContent;
  _title;
  _image;
  _deleteButton;
  _likeButton;

  constructor (name, link, selector, handleCardClick) {
    const cardTemplate = document.querySelector(selector);
    this._cardContent = cardTemplate.content.cloneNode(true);

    this._performQuerySelectors();

    this._title.textContent = name;
    this._image.src = link;
    this._image.alt = name;

    this._handleCardClick = handleCardClick;

    this._setEventListeners();
  }

  _performQuerySelectors() {
    this._title = this._cardContent.querySelector('.elements__title');
    this._image = this._cardContent.querySelector('.elements__photo');
    this._deleteButton = this._cardContent.querySelector('.elements__delete');
    this._likeButton = this._cardContent.querySelector('.elements__like-button');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {this._toggleLikeButton()});
    this._deleteButton.addEventListener('click', () => {this._deleteCard()});

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._title.textContent, this._image.src);
    });
  }

  _toggleLikeButton() {
    this._likeButton.classList.toggle('elements__like-button_active');
  }

  _deleteCard() {
    const listItem = this._deleteButton.closest('.elements__card');
    listItem.remove();
  }

  getContent() {
    return this._cardContent;
  }
}
