import {isEscKey} from './util.js';
import {changeSlider as effectSlider} from './effect-slider.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const formToEditPhoto = uploadForm.querySelector('.img-upload__overlay');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const listOfEffects = uploadForm.querySelector('.effects__list');
const sizeInput = uploadForm.querySelector('.scale__control--value');
const image = uploadForm.querySelector('.img-upload__preview img');

const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const hashtagFormat = /^#[a-zа-яё0-9]{1,19}$/i;
const ZOOM_STEP = 25;

const closeByEscape = (evt) => evt.stopPropagation();
hashtagInput.addEventListener('keydown', closeByEscape);
commentInput.addEventListener('keydown', closeByEscape);

const changeSize = (evt) => {
  let newValue = parseInt(sizeInput.value, 10);
  if(evt.target.classList.contains('scale__control--bigger')) {
    if (newValue + ZOOM_STEP > 100) { newValue = 100; }
    else {newValue += ZOOM_STEP; }
  }
  if(evt.target.classList.contains('scale__control--smaller')) {
    if (newValue - ZOOM_STEP < ZOOM_STEP) { newValue = ZOOM_STEP; }
    else { newValue -= ZOOM_STEP; }
  }
  sizeInput.value = `${newValue}%`;
  image.style.transform = `scale(${newValue === 100 ? '1' : `0.${newValue}`})`;
};


const closeForm = () => {
  formToEditPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeFormButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeFormByEsc);
  hashtagInput.removeEventListener('keydown', closeByEscape);
  commentInput.removeEventListener('keydown', closeByEscape);
  listOfEffects.removeEventListener('click', effectSlider);
  uploadForm.querySelector('.img-upload__scale').removeEventListener('click', changeSize);
  image.style.removeProperty('transform');
  image.style.removeProperty('filter');
  uploadForm.reset();
};

function closeFormByEsc (evt) {
  if (isEscKey(evt)) {
    closeForm();
  }
}

const openForm = () => {
  formToEditPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  closeFormButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeFormByEsc);
  hashtagInput.addEventListener('keydown', closeByEscape);
  commentInput.addEventListener('keydown', closeByEscape);
  listOfEffects.addEventListener('click', effectSlider);
  uploadForm.querySelector('.img-upload__scale').addEventListener('click', changeSize);
};

uploadInput.addEventListener('change', openForm);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validHashtag = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(/\s+/);
  return !(hashtagsArray.find((item) => !hashtagFormat.test(item))) &&
        !(hashtagsArray.length > MAX_COUNT_HASHTAGS) &&
        (new Set(hashtagsArray).size === hashtagsArray.length);
};

const getMessageOfHashtagError = () => {
  const hashtagsArray = hashtagInput.value.toLowerCase().trim().split(/\s+/);
  if (hashtagsArray.length > MAX_COUNT_HASHTAGS) {
    return 'Превышено количество хэш-тегов';
  }
  if (hashtagsArray.find((item) => !hashtagFormat.test(item))) {
    return 'Введён невалидный хэш-тег';
  }
  if (new Set(hashtagsArray).size !== hashtagsArray.length) {
    return 'Хэш-теги не должны повторяться';
  }
};

pristine.addValidator(hashtagInput, validHashtag, getMessageOfHashtagError);

const validComment = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(commentInput, validComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
