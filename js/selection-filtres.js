import { createPhotosElement } from './drawing-thumbnails.js';
import { debounce, getRandomPhotos } from './util.js';
import { DELAY } from './constants.js';

const filterContainerElement = document.querySelector('.img-filters');
const filterElement = filterContainerElement.querySelector('.img-filters__form');

let photos = [];

const changeActiveFilter = (evt) => {
  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const getDiscussedPhotos = (data) => {
  const sortPhotos = data.slice().sort((first, second) => second.comments.length - first.comments.length);
  return sortPhotos;
};

const setFilter = (event) => {
  filterElement.addEventListener('click', (evt) => {
    let newPhotos = photos.slice();
    changeActiveFilter(evt);
    switch (evt.target.id) {
      case 'filter-random':
        newPhotos = getRandomPhotos(photos);
        break;
      case 'filter-discussed':
        newPhotos = getDiscussedPhotos(photos);
    }
    event(newPhotos);
  });
};

const initFilter = (data) => {
  photos = data.slice();
  filterContainerElement.classList.remove('img-filters--inactive');
  setFilter(debounce(createPhotosElement, DELAY));
};

export {initFilter};
