import { createPhotosElement } from './drawing-thumbnails.js';
import { debounce, getRandomPhotos } from './util.js';
import { DELAY } from './constants.js';

const filterContainerElement = document.querySelector('.img-filters');
const filterElement = filterContainerElement.querySelector('.img-filters__form');

let photos = [];

const getDiscussedPhotos = (data) => {
  const sortPhotos = data.slice().sort((first, second) => second.comments.length - first.comments.length);
  return sortPhotos;
};

const setFilter = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    let newPhotos = photos.slice();
    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    if (evt.target.id.includes('random')) {
      newPhotos = getRandomPhotos(photos);
    }
    if (evt.target.id.includes('discussed')) {
      newPhotos = getDiscussedPhotos(photos);
    }
    cb(newPhotos);
  });
};

const initFilter = (data) => {
  photos = data.slice();
  filterContainerElement.classList.remove('img-filters--inactive');
  setFilter(debounce(createPhotosElement, DELAY));
};

export {initFilter};
