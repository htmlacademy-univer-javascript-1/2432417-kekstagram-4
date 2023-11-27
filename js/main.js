import {getPhotoDescription} from './data.js';
import {createPhotosElement} from './drawing-thumbnails.js';
import './photo-upload-form.js';
const photos = getPhotoDescription();
createPhotosElement(photos);
