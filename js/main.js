import {createPhotosElement} from './drawing-thumbnails.js';
import './photo-upload-form.js';
import { getData } from './api.js';
import {showDataErrorMessage} from './util.js';

let photos = [];

const uploadPhotos = (data) => {
  photos = data.slice();
  createPhotosElement(photos);
};

getData(uploadPhotos, showDataErrorMessage);
