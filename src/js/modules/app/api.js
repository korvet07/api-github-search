const USER_PER_PAGE = 50; // max 100
const URL = 'https://api.github.com/';

export default class Api {

  constructor() {
  }

  async loadUsers(searchValue) {

    return await fetch(`${URL}search/users?q=${searchValue}&per_page=${USER_PER_PAGE}`);
  }

  async loadUserData(user) {

    return await fetch(`${URL}users/${user}`).then((response) => response.json());
  }
}
