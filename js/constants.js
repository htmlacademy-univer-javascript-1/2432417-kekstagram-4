const COMMENTS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const HASHTAG_FORMAT = /^#[a-zа-яё0-9]{1,19}$/i;
const TIME_TO_DELETE_MESSAGE = 5000;
const RANDOM_PHOTOS_LENGTH = 10;
const DELAY = 500;
const TYPES_OF_FILE = ['jpg', 'jpeg', 'png'];

const ZOOM = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const BASE_URLS = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagram',
};

export { COMMENTS_COUNT, MAX_COMMENT_LENGTH, MAX_COUNT_HASHTAGS, HASHTAG_FORMAT, ZOOM, TIME_TO_DELETE_MESSAGE, RANDOM_PHOTOS_LENGTH, DELAY, TYPES_OF_FILE, BASE_URLS };
