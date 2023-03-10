import { html } from '../../utils/utils';

const ALERT_SHOW_TIME = 3000;

export default class View {

  constructor(api) {
    this.api = api;
    this.app = document.querySelector('#app');

    this.title = this.createElement('h1', 'search-title', 'Github search users');
    this.searchCounter = this.createElement('div', 'users-count');
    this.searchInput = this.createElement('input', 'search-input');
    this.searchInput.type = 'search';
    this.searchInput.autofocus = true;
    this.searchInput.placeholder = 'Введите имя';
    this.searchButton = this.createElement('button', 'btn btn--green', 'Найти');
    this.searchButton.type = 'button';
    this.inputWrapper = this.createElement('div', 'input-wrapper');
    this.usersListWrapper = this.createElement('div', 'users-wrapper');
    this.usersList = this.createElement('ul', 'users-list');
    this.loadMore = this.createElement('button', 'load-more btn', 'Загрузить ещё');
    this.loadMore.style.display = 'none';


    this.usersListWrapper.append(this.usersList, this.loadMore);
    this.inputWrapper.append(this.searchInput, this.searchButton);
    this.app.append(this.title, this.inputWrapper, this.searchCounter, this.usersListWrapper);
  }

  createElement(elemTag, elemClass, text) {
    const element = document.createElement(elemTag);

    element.className = elemClass ? elemClass : '';
    element.textContent = text ? text : '';

    return element;
  }

  createUser(user) {
    const userElement = this.createElement('li', 'user-prev');

    userElement.innerHTML = html`<a class="user-link" href="${user.html_url}" target="_blank">
                                  <div class="img-wrapper">
                                    <img class="user-photo" src="${user.avatar_url}" alt="${user.login}_photo">
                                  </div>
                                  <h4 class="user-name">${user.login}</h4>
                                 </a>
                                 <div class="user-content">
                                   <a class="user-content__link" href="https://github.com/${user.login}?tab=repositories"   target="_blank">Repositories</a>
                                   <button class="btn-details" type="button">Подробнее</button>
                                 </div>
                                `;

    this.usersList.append(userElement);
    userElement.addEventListener('click', (event) => {

      if (event.target.classList.contains('btn-details')) {
        this.getMoreInfo(user, userElement);
        event.target.style.display = 'none';
      }
    });
  }

  getMoreInfo(userData, element) {
    const div = this.createElement('div', 'more-info');

    this.api.loadUserData(userData.login)
      .then((data) => {
        div.innerHTML = html`<p>Name: ${data.name ? data.name : data.login}</p>
                             <p>Data created: ${data.created_at.substr(0, 10)}</p>
                             <p>Repositories pub: ${data.public_repos}</p>
                            `;
        element.append(div);
      })
      .catch((err) => this.errorMessage(`Ошибка загрузки: ${err.message}`));
  }

  clearUsers() {
    this.usersList.innerHTML = '';
  }

  setUserCounter(message) {
    this.usersCounter.textContent = message;
  }

  toggleStateLoadMoreButton(flag) {
    this.loadMore.style.display = flag ? 'block' : 'none';
  }

  counterMessage(usersCount) {

    return (usersCount > 0) ? `Найдено: ${usersCount} пользователей` : 'По вашему запросу пользователей не найдено';
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
