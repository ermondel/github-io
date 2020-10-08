import './style/index.scss';
import Gallery from './components/gallery';
import images from './components/images';
import config from './components/config';

const mainGallery = new Gallery(images, config);

if (mainGallery.errors) {
  for (let i in mainGallery.errors) console.log(mainGallery.errors[i]);
}
