import { TIME_TO_DELETE_MESSAGE, RANDOM_PHOTOS_LENGTH } from './constants.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

const showDataErrorMessage = () => {
  const message = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, TIME_TO_DELETE_MESSAGE);
};

const removeMessage = () => {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', doOnEscapeBtnClick);
};

function doOnEscapeBtnClick (evt) {
  if (isEscapeKey(evt)) {
    removeMessage();
  }
}

const renderMessage = (element) => {
  const message = element.cloneNode(true);

  message.querySelector('button').addEventListener('click', () => {
    removeMessage();
  });

  message.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
      removeMessage();
    }
  });

  document.addEventListener('keydown', doOnEscapeBtnClick);

  document.body.append(message);
};

const showErrorMessage = () => {
  renderMessage(document.querySelector('#error').content.querySelector('.error'));
};

const showSuccessMessage = () => {
  renderMessage(document.querySelector('#success').content.querySelector('.success'));
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayEl = (array) => array[getRandomNumber(0, array.length - 1)];


const getRandomPhotos = (data) => {
  const randomPhotos = new Set();
  while (randomPhotos.size < RANDOM_PHOTOS_LENGTH) {
    randomPhotos.add(getRandomArrayEl(data));
  }
  return randomPhotos;
};


export { isEscapeKey, showDataErrorMessage, showErrorMessage, showSuccessMessage, getRandomArrayEl, debounce, getRandomPhotos };
