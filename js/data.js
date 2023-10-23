import {getComments, getRandomArrayElement, getRandomInteger} from './util.js';
import {DESCRIPTIONS} from './constants.js';

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

export {getPhotoDescription};
