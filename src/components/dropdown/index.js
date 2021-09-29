import './dropdown.scss';
import Dropdown from './dropdown';

const comfortDropdownNodes = document.querySelectorAll('[data-group="comfort"]');
const comfortOptions = {
  defaultText: 'Удобства номера',
  maxItems: 5,
  buttons: false,
  plurals: {
    bedrooms: ['спальня', 'спальни', 'спален'],
    beds: ['кровать', 'кровати', 'кроватей'],
    bathrooms: ['ванная комната', 'ванных комнаты', 'ванных комнат'],
  },
};

if (comfortDropdownNodes.length > 0) {
  comfortDropdownNodes.forEach((element) => new Dropdown(element, comfortOptions));
}

const guestsDropdownNodes = document.querySelectorAll('[data-group="guests"]');
const guestsOptions = {
  defaultText: 'Сколько гостей',
  buttons: true,
  total: true,
  numberOfLetters: 35,
  plurals: {
    totalItems: ['гость', 'гостя', 'гостей'],
    babies: ['младенец', 'младенца', 'младенцев'],
  },
};

if (guestsDropdownNodes.length > 0) {
  guestsDropdownNodes.forEach((element) => new Dropdown(element, guestsOptions));
}
