import { TIME_TO_DELETE_MESSAGE } from './constants.js';

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
  document.removeEventListener('keydown', onEscapeBtnClick);
};

function onEscapeBtnClick (evt) {
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

  document.addEventListener('keydown', onEscapeBtnClick);

  document.body.append(message);
};

const showErrorMessage = () => {
  renderMessage(document.querySelector('#error').content.querySelector('.error'));
};

const showSuccessMessage = () => {
  renderMessage(document.querySelector('#success').content.querySelector('.success'));
};

export { isEscapeKey, showDataErrorMessage, showErrorMessage, showSuccessMessage};
