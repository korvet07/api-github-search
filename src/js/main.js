import { iosVhFix } from './utils/ios-vh-fix';
import { Form } from './modules/form-validate/form';
import View from './modules/app/view';
import Search from './modules/app/search';
import Api from './modules/app/api';

const api = new Api();

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------
  iosVhFix();
  // Modules
  // ---------------------------------
  new Search(new View(api), api);

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------
