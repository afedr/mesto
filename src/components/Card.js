export class Card {
  _cardContent;
  _title;
  _image;
  _deleteButton;
  _likeButton;
  _id;
  _likeCount;

  constructor (name, link, id, ownerId, userId, selector, handleCardClick, handleLikeClick, handleDeleteClick) {
    const cardTemplate = document.querySelector(selector);
    this._cardContent = cardTemplate.content.cloneNode(true);

    this._performQuerySelectors();

    this._title.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    this._id = id;
    this._ownerId = ownerId;
    this._userId = userId;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._setEventListeners();

    console.log(this._ownerId,this._userId);
    if (this._ownerId != this._userId)

    {
    this._deleteButton.classList.add('popup_is_hidden')
    }
    else
    {
    this._deleteButton.classList.remove('popup_is_hidden')
    }
  }

  _performQuerySelectors() {
    this._title = this._cardContent.querySelector('.elements__title');
    this._image = this._cardContent.querySelector('.elements__photo');
    this._deleteButton = this._cardContent.querySelector('.elements__delete');
    this._likeButton = this._cardContent.querySelector('.elements__like-button');
    this._likeCount = this._cardContent.querySelector('.elements__like-number');
  }

  _setEventListeners() {

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('elements__like-button_active')) {
        this._handleLikeClick.deleteLikeClick({
          cardId: this._id,
        });
      } else {
        this._handleLikeClick.addLikeClick({
          cardId: this._id,
        })
      }

      this._toggleLikeButton();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

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

  updateLikeCount(count) {
    this._likeCount.textContent = count;
  }
}
