import { isEscKey } from './util.js';

const bigPhotoModal = document.querySelector('.big-picture');
const bigPhotoCloseElement = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();

const createComment = ({avatar, message, name}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  commentFragment.append(comment);
};

const generateComments = (comments) => {
  comments.forEach((comment) => {
    createComment(comment);
  });
  commentsContainer.append(commentFragment);
};

const onOpenPhotoKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    bigPhotoModal.classList.add('hidden');
  }
};

const openPhoto = ({url, description, likes, comments}) => {
  bigPhotoModal.classList.remove('hidden');
  commentsContainer.innerHTML = '';
  bigPhotoModal.querySelector('.big-picture__img img').src = url;
  bigPhotoModal.querySelector('.social__caption').textContent = description;
  bigPhotoModal.querySelector('.likes-count').textContent = likes;
  bigPhotoModal.querySelector('.comments-count').textContent = comments.length;
  generateComments(comments);
  body.classList.add('modal-open');
  bigPhotoModal.querySelector('.social__comment-count').classList.add('hidden');
  bigPhotoModal.querySelector('.comments-loader').classList.add('hidden');
  document.addEventListener('keydown', onOpenPhotoKeydown);
};

const closePhoto = () => {
  bigPhotoModal.classList.add('hidden');
  document.removeEventListener('keydown', onOpenPhotoKeydown);
  body.classList.remove('modal-open');
};

bigPhotoCloseElement.addEventListener('click', () => {
  closePhoto();
});

export {openPhoto};
