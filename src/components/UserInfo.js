 // управление отображением информации о пользователе на странице
 export class UserInfo {
   constructor (nameSelector, infoSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
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
 }
