import { isEscapeKey } from './util.js';
import { COMMENTS_COUNT } from './constants.js';

const bigPhotoModal = document.querySelector('.big-picture');
const bigPhotoCloseElement = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentFragment = document.createDocumentFragment();
const commentLoad = document.querySelector('.social__comments-loader');
const commentCount = document.querySelector('.social__comment-count');
let allComments;
let commentsShow = 0;

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
  if (isEscapeKey(evt)) {
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
  allComments = comments;
  loadComments();
  body.classList.add('modal-open');
  commentLoad.addEventListener('click', loadComments);
  document.addEventListener('keydown', onOpenPhotoKeydown);
};

function loadComments () {
  const newPortion = allComments.slice(commentsShow, commentsShow + COMMENTS_COUNT);
  commentsShow += newPortion.length;
  generateComments(newPortion);
  if(commentsShow >= allComments.length){
    commentLoad.classList.add('hidden');
  } else{
    commentLoad.classList.remove('hidden');
  }
  commentCount.innerHTML = `${commentsShow} из <span class="comments-count">${allComments.length}</span> комментариев`;
}

const closePhoto = () => {
  bigPhotoModal.classList.add('hidden');
  document.removeEventListener('keydown', onOpenPhotoKeydown);
  body.classList.remove('modal-open');
  commentLoad.removeEventListener('click', loadComments);
  commentsShow = 0;
  allComments = [];
};

bigPhotoCloseElement.addEventListener('click', () => {
  closePhoto();
});

export {openPhoto};
