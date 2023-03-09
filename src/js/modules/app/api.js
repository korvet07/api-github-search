const ALERT_SHOW_TIME = 3000;
const USER_PER_PAGE = 50; // max 100
const URL = 'https://api.github.com/';
export default class Api {

  constructor() {
  }

  async loadUsers(searchValue) {

    return await fetch(`${URL}search/users?q=${searchValue}&per_page=${USER_PER_PAGE}`)
      .then((response) => {

        if (response.ok) {

          return response.json();
        } else {
          this.errorMessage(`Ошибка (response.status: ${response.status})`);
        }
      });
  }

  async loadUserData(user) {

    return await fetch(`${URL}users/${user}`).then((response) => response.json());
  }


  errorMessage(message) {
    const alertContainer = document.createElement('div');

    alertContainer.style.zIndex = '100';
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '0';
    alertContainer.style.top = '0';
    alertContainer.style.right = '0';
    alertContainer.style.padding = '20px 5px';
    alertContainer.style.fontSize = '40px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';
    alertContainer.style.color = 'black';
    alertContainer.textContent = message;

    document.body.append(alertContainer);

    setTimeout(() => {
      alertContainer.remove();
    }, ALERT_SHOW_TIME);
  }
}
