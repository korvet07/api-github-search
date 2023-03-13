const AMOUNT_USERS = 10;

export default class Search {
  #users;

  constructor(view, api) {
    this.view = view;
    this.api = api;
    this.#users = null;

    this.view.loadMore.addEventListener('click', this.handleLoadMoreClick.bind(this));
    this.view.searchButton.addEventListener('click', this.handleSearchButtonClick.bind(this));
    this.view.searchInput.addEventListener('keydown', this.handleSearchUsersKey.bind(this));
    this.view.searchInput.addEventListener('input', this.handleSearchUsersInput.bind(this));
  }

  searchUser() {

    if (this.view.searchInput.value) {
      this.api.loadUsers(this.view.searchInput.value)
        .then((response) => {

          if (response.ok) {

            return response.json();
          } else {
            this.view.errorMessage(`Ошибка (response.status: ${response.status})`);
          }
        })
        .then((data) => this.renderUsers(data))
        .catch((error) => this.view.errorMessage(`Ошибка загрузки: ${error.message}`));
    }
  }

  renderUsers(data) {
    this.#users = data.items.slice();
    this.view.searchCounter.textContent = this.view.counterMessage(data.total_count);
    this.view.toggleStateLoadMoreButton(this.#users.length);

    this.showUsers();
  }

  showUsers() {

    if (this.#users.length) {
      this.#users.splice(0, AMOUNT_USERS).forEach((user) => this.view.createUser(user));
      this.view.toggleStateLoadMoreButton(this.#users.length);

      return this.#users;
    }
  }

  handleLoadMoreClick() {
    this.showUsers();
  }

  handleSearchUsersInput(event) {

    if (!event.currentTarget.value) {
      this.view.clearUsers();
      this.view.searchCounter.textContent = '';
      this.view.toggleStateLoadMoreButton('');
    }
  }

  handleSearchButtonClick() {
    this.view.clearUsers();
    this.searchUser();
  }

  handleSearchUsersKey(event) {

    if (event.key === 'Enter') {
      this.view.clearUsers();
      this.searchUser();
    }
  }
}
