import { ZOOM } from './constants.js';
const scaleInput = document.querySelector('.scale__control--value');

const changeScale = (factor = 1) => {
  let newValue = parseInt(scaleInput.value, 10);
  newValue = newValue + ZOOM.STEP * factor;
  if (newValue > ZOOM.MAX) {
    newValue = ZOOM.MAX;
  }
  if (newValue < ZOOM.MIN) {
    newValue = ZOOM.MIN;
  }
  scaleInput.value = `${newValue}%`;
  document.querySelector('.img-upload__preview img').style.transform = `scale(${newValue / 100})`;
};

const onScaleBtnClick = (evt) => {
  if(evt.target.classList.contains('scale__control--smaller')) {
    changeScale(-1);
  }
  if(evt.target.classList.contains('scale__control--bigger')) {
    changeScale();
  }
};

export {onScaleBtnClick};
