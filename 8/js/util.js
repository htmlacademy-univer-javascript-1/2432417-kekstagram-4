import {NAMES, MESSAGE} from './constants.js';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getComments = (count) => {
  const COMMENTS = [];
  for (let i = 0; i < count; i++) {
    const COMMENT = {
      id: 100 + i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGE),
      name: getRandomArrayElement(NAMES)
    };
    COMMENTS.push(COMMENT);
  }
  return COMMENTS;
};

const isEscKey = (evt) => evt.key === 'Escape';

export {getComments, getRandomInteger, getRandomArrayElement, isEscKey};
