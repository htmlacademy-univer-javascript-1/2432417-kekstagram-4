import {getPhotoDescription} from './data.js';
import {createPhotosElement} from './drawing-thumbnails.js';
const photos = getPhotoDescription();
createPhotosElement(photos);
