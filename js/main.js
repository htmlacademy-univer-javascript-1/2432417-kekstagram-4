import { createPhotosElement } from './drawing-thumbnails.js';
import './photo-upload-form.js';
import { getData } from './api.js';
import { showDataErrorMessage } from './util.js';
import { initFilter } from './selection-filtres.js';

const uploadPhotos = (data) => {
  createPhotosElement(data);
  initFilter(data);
};

getData(uploadPhotos, showDataErrorMessage);
