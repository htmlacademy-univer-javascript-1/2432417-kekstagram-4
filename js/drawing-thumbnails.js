import { openPhoto } from './open-big-photo.js';
const listOfPhotos = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const clearlistOfPhoto = () => {
  if (listOfPhotos.querySelectorAll('a.picture')) {
    listOfPhotos.querySelectorAll('a.picture').forEach((item) => item.remove());
  }
};

const createPhotosElement = (photos) => {
  const listOfPhotosFragment = document.createDocumentFragment();
  clearlistOfPhoto();
  photos.forEach(({url, description, likes, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPhoto({url, description, likes, comments});
    });
    listOfPhotos.appendChild(photoElement);
  });
  listOfPhotos.appendChild(listOfPhotosFragment);
};

export { createPhotosElement };
