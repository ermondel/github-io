function onOpenClickHandler() {
  this.galleryContainer.style.visibility = 'visible';

  if (!this.loadedImages.length) {
    loadImages(
      this.images,
      this.loadedImages,
      this.loaderCounter,
      this.imgClassName,
      this.onLoadGallery
    );
  }
}

function onCloseClickHandler() {
  this.galleryContainer.style.visibility = 'hidden';
}

function onLoadGallery() {
  this.loaderContainer.style.display = 'none';

  this.loadedImages.forEach((image) => {
    const item = document.createElement('div');
    item.className = this.itemClassName;
    item.appendChild(image);
    this.galleryList.appendChild(item);
  });
}

function addBtnOpenToPage(textValue, container, onClickHandler) {
  const btn = document.createElement('button');
  btn.appendChild(document.createTextNode(textValue));
  btn.addEventListener('click', onClickHandler);
  container.appendChild(btn);
}

function loadImages(images, loadedImages, loaderCounter, className, callback) {
  images.forEach((image) => {
    const newImg = document.createElement('img');
    newImg.setAttribute('alt', 'photo');
    newImg.setAttribute('id', image.id);
    newImg.className = className;
    newImg.src = image.path;
    newImg.onload = function () {
      loadedImages.push(this);
      loaderCounter.textContent = loadedImages.length + '/' + images.length;
      if (loadedImages.length === images.length) callback();
    };
  });
}

function Gallery(config) {
  this.errors = [];
  this.loadedImages = [];
  this.images = config.images;
  this.galleryContainer = document.querySelector(config.selectors.layer);
  this.btnOpenContainer = document.querySelector(config.selectors.open);
  this.btnClose = document.querySelector(config.selectors.close);
  this.loaderContainer = document.querySelector(config.selectors.loader);
  this.loaderCounter = document.querySelector(config.selectors.counter);
  this.galleryList = document.querySelector(config.selectors.list);
  this.itemClassName = config.classes.item;
  this.imgClassName = config.classes.img;
  this.onOpenClickHandler = onOpenClickHandler.bind(this);
  this.onCloseClickHandler = onCloseClickHandler.bind(this);
  this.onLoadGallery = onLoadGallery.bind(this);

  if (!this.galleryContainer) {
    this.errors.push('[GALLERY][ERROR][NOT FOUND] gallery layer');
  }

  if (!this.loaderContainer) {
    this.errors.push('[GALLERY][ERROR][NOT FOUND] loading bar');
  }

  if (!this.loaderCounter) {
    this.errors.push('[GALLERY][ERROR][NOT FOUND] loading counter');
  }

  if (!this.btnClose) {
    this.errors.push('[GALLERY][ERROR][NOT FOUND] close button');
  }

  if (!this.btnOpenContainer) {
    this.errors.push('[GALLERY][ERROR][NOT FOUND] block for open button');
  }

  if (!this.galleryList) {
    this.errors.push('[GALLERY][ERROR][NOT FOUND] block for gallery list');
  }

  if (!this.itemClassName) {
    this.errors.push('[GALLERY][ERROR][NOT FOUND] item class name');
  }

  if (!this.imgClassName) {
    this.errors.push('[GALLERY][ERROR][NOT FOUND] image class name');
  }

  if (!this.images.length) {
    this.errors.push('[GALLERY][ERROR][NOT FOUND] images for gallery');
  }

  if (!this.errors.length) {
    this.btnClose.addEventListener('click', this.onCloseClickHandler);
    addBtnOpenToPage('Gallery', this.btnOpenContainer, this.onOpenClickHandler);
  }
}

export default Gallery;
