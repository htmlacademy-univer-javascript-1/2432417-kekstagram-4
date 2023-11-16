import { isEscKey } from './util.js';

const fullSizePhotoModal = document.querySelector('.big-picture');
const fullSizePhotoModalCloseElement = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');

const commentFragment = document.createDocumentFragment();

const onFullSizePhotoKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    fullSizePhotoModal.classList.add('hidden');
  }
};

const createComment = ({avatar, message, name}) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  commentFragment.append(comment);
};

const renderComments = (comments) => {
  comments.forEach((comment) => {
    createComment(comment);
  });
  commentsContainer.append(commentFragment);
};

const openFullSizePhoto = ({url, description, likes, comments}) => {
  fullSizePhotoModal.classList.remove('hidden');
  commentsContainer.innerHTML = '';

  fullSizePhotoModal.querySelector('.big-picture__img img').src = url;
  fullSizePhotoModal.querySelector('.big-picture__img img').alt = description;
  fullSizePhotoModal.querySelector('.likes-count').textContent = likes;
  fullSizePhotoModal.querySelector('.comments-count').textContent = comments.length;
  renderComments(comments);

  body.classList.add('modal-open');
  fullSizePhotoModal.querySelector('.social__comment-count').classList.add('hidden');
  fullSizePhotoModal.querySelector('.comments-loader').classList.add('hidden');
  document.addEventListener('keydown', onFullSizePhotoKeydown);
};

const closeFullSizePhoto = () => {
  fullSizePhotoModal.classList.add('hidden');

  document.removeEventListener('keydown', onFullSizePhotoKeydown);
};

fullSizePhotoModalCloseElement.addEventListener('click', () => {
  closeFullSizePhoto();
});

export {openFullSizePhoto};
