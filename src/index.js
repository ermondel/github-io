import './style/index.scss';
import Gallery from './components/gallery';
import images from './components/images';

const mainImage = document.getElementById('main_image');

const onImgClick = (src) => (mainImage.src = src);

const selectors = {
  layer: '.gallery',
  open: '.gallery-btn',
  close: '.gallery__btn-close',
  loader: '.gallery__loader',
  counter: '.gallery__loader__counter',
  list: '.gallery__list',
};

const classes = {
  item: 'gallery__item',
  img: 'gallery__img',
  btnopen: 'btn-close',
  btntext: 'btn-close__text',
};

const mainGallery = new Gallery({
  selectors,
  classes,
  callbacks: { onImgClick },
  images,
});

if (mainGallery.errors) {
  for (let i in mainGallery.errors) console.log(mainGallery.errors[i]);
}
