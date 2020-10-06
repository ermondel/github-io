import './style/index.scss';
import Gallery from './components/gallery';
import images from './components/images';
import pleaseWait from './assets/images/please-wait.png';

const mainImage = document.getElementById('main_image');

const changeMainImage = (src, pleaseWaitImg) => {
  let start = true;
  mainImage.src = pleaseWaitImg.src;
  mainImage.onload = function () {
    console.log(mainImage.src);
    if (start) {
      setTimeout(() => {
        mainImage.src = src;
        start = false;
      }, 300);
    }
  };
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

const mainGallery = new Gallery(config, pleaseWait);

if (mainGallery.errors) {
  for (let i in mainGallery.errors) console.log(mainGallery.errors[i]);
}
