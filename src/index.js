import './style/index.scss';
import Gallery from './components/gallery';
import images from './components/images';

const config = {
  selectors: {
    layer: '.gallery',
    open: '.gallery-btn',
    close: '.gallery__btn-close',
    loader: '.gallery__loader',
    counter: '.gallery__loader__counter',
    list: '.gallery__list',
  },
  classes: {
    item: 'gallery__item',
    img: 'gallery__img',
  },
  images,
};

const mainGallery = new Gallery(config);

if (mainGallery.errors) {
  for (let i in mainGallery.errors) console.log(mainGallery.errors[i]);
}
