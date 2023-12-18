const slider = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
let effectName = '';

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

slider.noUiSlider.on('update', () => {
  const value = slider.noUiSlider.get();
  effectLevel.value = parseFloat(value);
  if (effectName === 'none') {
    image.style.removeProperty('filter');
  } else {
    image.style.filter = `${effectName}(${value})`;
  }
});

const changeSlider = (evt) => {
  if (evt.target.closest('input')) {
    switch (evt.target.value) {
      case 'chrome':
      case 'sepia':
        effectName = evt.target.value === 'chrome' ? 'grayscale' : 'sepia';
        slider.noUiSlider.updateOptions ({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1,
          format: {
            to: function (value) {
              return value;
            },
            from: function (value) {
              return value;
            },
          }
        });
        slider.parentNode.classList.remove('hidden');
        break;
      case 'marvin':
        effectName = 'invert';
        slider.noUiSlider.updateOptions ({
          range: {
            min: 0,
            max: 100
          },
          start: 100,
          step: 1,
          format: {
            to: function (value) {
              return `${value}%`;
            },
            from: function (value) {
              return value;
            },
          }
        });
        slider.parentNode.classList.remove('hidden');
        break;
      case 'phobos':
        effectName = 'blur';
        slider.noUiSlider.updateOptions ({
          range: {
            min: 0,
            max: 3
          },
          start: 3,
          step: 0.1,
          format: {
            to: function (value) {
              return `${value}px`;
            },
            from: function (value) {
              return value;
            },
          }
        });
        slider.parentNode.classList.remove('hidden');
        break;
      case 'heat':
        effectName = 'brightness';
        slider.noUiSlider.updateOptions ({
          range: {
            min: 1,
            max: 3
          },
          start: 3,
          step: 0.1,
          format: {
            to: function (value) {
              return value;
            },
            from: function (value) {
              return value;
            },
          }
        });
        slider.parentNode.classList.remove('hidden');
        break;
      case 'none':
        effectName = 'none';
        slider.noUiSlider.set(0);
        slider.parentNode.classList.add('hidden');
    }
  }
};

export {changeSlider};
