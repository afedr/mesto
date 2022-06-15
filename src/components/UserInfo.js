 // управление отображением информации о пользователе на странице
 export class UserInfo {
   constructor (nameSelector, infoSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector)
    this._userId = 0;
   }

   // возвращает объект с данными пользователя
   getUserInfo() {
    const user = {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    }
    return user;
   }

  // принимает новые данные пользователя и добавляет их на страницу
   setUserInfo({name, info}) {
    this._userName.textContent = name;
    this._userInfo.textContent = info;

   }
   setAvatar(avatar) {
    this._userAvatar.src=avatar;
   }

   setUserId(id) {
     this._userId = id;
   }
 }
