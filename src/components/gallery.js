function onOpenClickHandler() {
  this.galleryContainer.style.visibility = 'visible';
  if (!this.loadedImages.length) this.loadImages();
}

function onCloseClickHandler() {
  this.galleryContainer.style.visibility = 'hidden';
}

function onLoadGallery() {
  this.loaderContainer.style.display = 'none';

  this.loadedImages.forEach((image) => {
    const newBtnImg = document.createElement('button');
    newBtnImg.className = this.itemClassName;
    newBtnImg.setAttribute('value', image.src);
    newBtnImg.appendChild(image);

    this.galleryList.appendChild(newBtnImg);
  });
}

function onGalleryItemClick(event) {
  const tag = event.target.tagName ? event.target.tagName.toLowerCase() : '';

  if (tag === 'img') {
    this.onCloseClickHandler();
    this.onImgClickCallback(event.target.src);
  } else if (tag === 'button') {
    this.onCloseClickHandler();
    this.onImgClickCallback(event.target.value);
  }
}

function loadImages() {
  const gallery = this;

  gallery.images.forEach((image) => {
    const newImg = document.createElement('img');
    newImg.setAttribute('alt', 'photo');
    newImg.className = gallery.imgClassName;
    newImg.src = image.path;

    newImg.onload = function () {
      gallery.loadedImages.push(this);

      const loaded = gallery.loadedImages.length;
      const queue = gallery.images.length;

      gallery.loaderCounter.textContent = loaded + '/' + queue;
      if (loaded === queue) gallery.onLoadGallery();
    };
  });
}

function addBtnOpenToPage(textValue, container, onClickHandler) {
  const btn = document.createElement('button');
  btn.appendChild(document.createTextNode(textValue));
  btn.addEventListener('click', onClickHandler);
  container.appendChild(btn);
}

function validateConfig() {
  const messages = [
    '[GALLERY][ERROR][NOT FOUND] gallery layer',
    '[GALLERY][ERROR][NOT FOUND] loading bar',
    '[GALLERY][ERROR][NOT FOUND] loading counter',
    '[GALLERY][ERROR][NOT FOUND] close button',
    '[GALLERY][ERROR][NOT FOUND] block for open button',
    '[GALLERY][ERROR][NOT FOUND] block for gallery list',
    '[GALLERY][ERROR][NOT FOUND] item class name',
    '[GALLERY][ERROR][NOT FOUND] image class name',
    '[GALLERY][ERROR][NOT FOUND] images for gallery',
    '[GALLERY][ERROR][NOT FOUND] image selection callback',
  ];

  if (!this.galleryContainer) this.errors.push(messages[0]);
  if (!this.loaderContainer) this.errors.push(messages[1]);
  if (!this.loaderCounter) this.errors.push(messages[2]);
  if (!this.btnClose) this.errors.push(messages[3]);
  if (!this.btnOpenContainer) this.errors.push(messages[4]);
  if (!this.galleryList) this.errors.push(messages[5]);
  if (!this.itemClassName) this.errors.push(messages[6]);
  if (!this.imgClassName) this.errors.push(messages[7]);
  if (!this.images.length) this.errors.push(messages[8]);
  if (!this.onImgClickCallback) this.errors.push(messages[9]);

  return this.errors.length > 0 ? false : true;
}

function Gallery(config) {
  this.errors = [];
  this.loadedImages = [];

  this.images = config.images;
  this.itemClassName = config.classes.item;
  this.imgClassName = config.classes.img;
  this.onImgClickCallback = config.callbacks.onImgClick;

  this.galleryContainer = document.querySelector(config.selectors.layer);
  this.btnClose = document.querySelector(config.selectors.close);
  this.btnOpenContainer = document.querySelector(config.selectors.open);
  this.galleryList = document.querySelector(config.selectors.list);
  this.loaderContainer = document.querySelector(config.selectors.loader);
  this.loaderCounter = document.querySelector(config.selectors.counter);

  this.onOpenClickHandler = onOpenClickHandler.bind(this);
  this.onCloseClickHandler = onCloseClickHandler.bind(this);
  this.onGalleryItemClick = onGalleryItemClick.bind(this);
  this.validateConfig = validateConfig.bind(this);
  this.onLoadGallery = onLoadGallery.bind(this);
  this.loadImages = loadImages.bind(this);

  if (this.validateConfig()) {
    this.btnClose.addEventListener('click', this.onCloseClickHandler);
    this.galleryList.addEventListener('click', this.onGalleryItemClick);
    addBtnOpenToPage('Gallery', this.btnOpenContainer, this.onOpenClickHandler);
  }
}

export default Gallery;
