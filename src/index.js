import './style/index.scss';
import Gallery from './components/gallery';
import images from './components/images';

const mainImage = document.getElementById('main_image');

const changeMainImage = (src) => (mainImage.src = src);

const config = {
  galleryImageList: images,
  galleryMainLayer: 'gallery',
  galleryItemList: 'gallery__list',
  galleryItemElement: 'gallery__item',
  galleryItemImage: 'gallery__img',
  btnOpenContainer: 'gallery__cnt-open',
  btnOpenElement: 'gallery__btn-open',
  btnOpenInnerText: 'gallery__txt-open',
  btnOpenTextValue: 'change picture',
  btnCloseElement: 'gallery__btn-close',
  progressBarContainer: 'gallery__pbar',
  progressBarCounter: 'gallery__pbar-counter',
  imageClickHandler: changeMainImage,
};

const mainGallery = new Gallery(config);

if (mainGallery.errors) {
  for (let i in mainGallery.errors) console.log(mainGallery.errors[i]);
}
