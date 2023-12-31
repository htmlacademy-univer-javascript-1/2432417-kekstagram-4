import { isEscapeKey, showErrorMessage, showSuccessMessage } from './util.js';
import { changeSlider as effectSlider } from './effect-slider.js';
import { sendData } from './api.js';
import { doOnScaleBtnClick } from './changing-size.js';
import { MAX_COMMENT_LENGTH, MAX_COUNT_HASHTAGS, HASHTAG_FORMAT, TYPES_OF_FILE } from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const formToEditPhoto = uploadForm.querySelector('.img-upload__overlay');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const listOfEffects = uploadForm.querySelector('.effects__list');
const image = uploadForm.querySelector('.img-upload__preview img');

const closeByEscape = (evt) => evt.stopPropagation();
hashtagInput.addEventListener('keydown', closeByEscape);
commentInput.addEventListener('keydown', closeByEscape);


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


const closeForm = (successRate = true) => {
  formToEditPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFormByEsc);
  if (successRate) {
    image.style.removeProperty('transform');
    image.style.removeProperty('filter');
    document.querySelector('.scale__control--value').value = '100%';
    commentInput.value ='';
    hashtagInput.value = '';
    listOfEffects.querySelector('.effects__radio').checked = 'true';
  }
  uploadInput.value = '';
};

const isErrorMessageShow = () => Boolean(document.body.querySelector('.error'));

function closeFormByEsc (evt) {
  if (isEscapeKey(evt) && !isErrorMessageShow()) {
    closeForm();
  }
}

const openForm = () => {
  formToEditPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  document.addEventListener('keydown', closeFormByEsc);
};

const onChooseFileBtnClick = () => {
  openForm();
  const file = uploadInput.files[0];
  const isCorrectFileType = TYPES_OF_FILE.some((item) => file.name.toLowerCase().endsWith(item));
  if (isCorrectFileType) {
    image.src = URL.createObjectURL(file);
  }
  uploadForm.querySelectorAll('.effects__preview').forEach((item) => {
    item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });
};

closeFormButton.addEventListener('click', closeForm);
hashtagInput.addEventListener('keydown', closeByEscape);
commentInput.addEventListener('keydown', closeByEscape);
listOfEffects.addEventListener('click', effectSlider);
uploadForm.querySelector('.img-upload__scale').addEventListener('click', doOnScaleBtnClick);
uploadInput.addEventListener('change', onChooseFileBtnClick);

const validHashtag = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(/\s+/);
  return !(hashtagsArray.find((item) => !HASHTAG_FORMAT.test(item))) &&
        !(hashtagsArray.length > MAX_COUNT_HASHTAGS) &&
        (new Set(hashtagsArray).size === hashtagsArray.length);
};

const getMessageOfHashtagError = () => {
  const hashtagsArray = hashtagInput.value.toLowerCase().trim().split(/\s+/);
  if (hashtagsArray.length > MAX_COUNT_HASHTAGS) {
    return 'Превышено количество хэш-тегов';
  }
  if (hashtagsArray.find((item) => !HASHTAG_FORMAT.test(item))) {
    return 'Введён невалидный хэш-тег';
  }
  if (new Set(hashtagsArray).size !== hashtagsArray.length) {
    return 'Хэш-теги не должны повторяться';
  }
};

pristine.addValidator(hashtagInput, validHashtag, getMessageOfHashtagError);

const validComment = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(commentInput, validComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

const sendForm = () => {
  showSuccessMessage();
  closeForm();
  uploadForm.querySelector('.img-upload__submit').disabled = false;
};


const sendError = () => {
  showErrorMessage();
  closeForm(false);
  document.querySelector('.img-upload__submit').disabled = false;
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const data = new FormData(uploadForm);
    uploadForm.querySelector('.img-upload__submit').disabled = true;
    sendData(sendForm, sendError, 'POST', data);
  }
});
