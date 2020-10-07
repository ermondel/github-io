import './style/index.scss';
import Gallery from './components/gallery';
import images from './components/images';

const mainImage = document.getElementById('main_image');
const headerImg = document.querySelector('.header__img');

const changeMainImage = (src) => {
  new Promise((resolve) => {
    let fadeCounter = 100;
    let fadeTimer = setInterval(() => {
      if (fadeCounter > 0) {
        mainImage.style.opacity = --fadeCounter / 100;
      } else {
        clearInterval(fadeTimer);
        headerImg.style.backgroundPosition = '0px 0px';
        resolve();
        return;
      }
    }, 1);
  })
    .then(() => {
      return new Promise((resolve) => {
        mainImage.src = src;
        mainImage.onload = resolve;
      });
    })
    .then(() => {
      headerImg.style.backgroundPosition = '-200px 0px';

      return new Promise((resolve) => {
        let showCounter = 0;
        let showTimer = setInterval(() => {
          if (showCounter < 100) {
            mainImage.style.opacity = ++showCounter / 100;
          } else {
            clearInterval(showTimer);
            resolve();
            return;
          }
        }, 1);
      });
    });
};

const config = {
  galleryImageList: images,
  galleryMainLayer: 'gallery',
  galleryItemList: 'gallery__list',
  galleryItemElement: 'gallery__item',
  galleryItemImage: 'gallery__img',
  btnOpenContainer: 'gallery__cnt-open',
  btnOpenElement: 'gallery__btn-open',
  btnOpenInnerText: 'gallery__txt-open',
  btnOpenTextValue: 'Select the main image from the gallery',
  btnCloseElement: 'gallery__btn-close',
  progressBarContainer: 'gallery__pbar',
  progressBarCounter: 'gallery__pbar-counter',
  imageClickHandler: changeMainImage,
};

const mainGallery = new Gallery(config);

if (mainGallery.errors) {
  for (let i in mainGallery.errors) console.log(mainGallery.errors[i]);
}
