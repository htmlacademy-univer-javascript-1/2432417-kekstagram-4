import {getComments, getRandomArrayElement, getRandomInteger} from './util.js';

const DESCRIPTIONS = [
  'Отдыхаю',
  'С семьёй',
  'Красота',
  'Работаем',
  'Выходные'
];

const MESSAGE = [
  'В целом всё неплохо. Но не всё.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Маша',
  'Петя',
  'Даша',
  'Никита',
  'Артём',
  'Витя'
];

function getPhotoDescription() {
  const PHOTO_DESCRIPTIONS = [];
  for (let j = 1; j <= 25; j++)
  {
    const DESCRIPTION = {
      id: j,
      url: `photos/${j}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: getComments(getRandomInteger(0, 30))
    };
    PHOTO_DESCRIPTIONS.push(DESCRIPTION);
  }
  return PHOTO_DESCRIPTIONS;
}

export {getPhotoDescription, MESSAGE, NAMES};
