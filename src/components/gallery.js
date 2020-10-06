function btnOpenClickHandler() {
  this.galleryMainLayer.style.visibility = 'visible';
  if (!this.loadedImages.length) this.loadGalleryImages();
}

function btnCloseClickHandler() {
  this.galleryMainLayer.style.visibility = 'hidden';
}

function escPressHandler(event) {
  if (event.keyCode === 27 && this.galleryMainLayer.style.visibility !== 'hidden') {
    this.galleryMainLayer.style.visibility = 'hidden';
    this.btnOpenRef.blur();
  }
}

function galleryImagesLoaded() {
  this.progressBarContainer.style.display = 'none';

  this.loadedImages.sort(() => Math.random() - 0.5);

  this.loadedImages.forEach((image) => {
    const newBtnImg = document.createElement('button');
    newBtnImg.className = this.galleryItemElement;
    newBtnImg.setAttribute('value', image.src);
    newBtnImg.appendChild(image);

    this.galleryItemList.appendChild(newBtnImg);
  });
}

function galleryItemClickHandler(event) {
  const tag = event.target.tagName ? event.target.tagName.toLowerCase() : '';

  if (tag === 'img') {
    this.btnCloseClickHandler();
    this.imageClickHandler(event.target.src, this.pleaseWaitImg);
  } else if (tag === 'button') {
    this.btnCloseClickHandler();
    this.imageClickHandler(event.target.value, this.pleaseWaitImg);
  }
}

function loadGalleryImages() {
  const self = this;

  self.galleryImageList.forEach((image) => {
    const newImg = document.createElement('img');
    newImg.setAttribute('alt', image.alt);
    newImg.className = self.galleryItemImage;
    newImg.src = image.path;

    newImg.onload = function () {
      self.loadedImages.push(this);

      const loaded = self.loadedImages.length;
      const queue = self.galleryImageList.length;

      self.progressBarCounter.textContent = loaded + '/' + queue;
      if (loaded === queue) self.galleryImagesLoaded();
    };
  });
}

function addBtnOpenToPage() {
  const btn = document.createElement('button');
  const inner = document.createElement('span');
  const hidden = document.createElement('span');
  const text = document.createTextNode(this.btnOpenTextValue);

  btn.className = this.btnOpenElement;
  inner.className = this.btnOpenInnerText;
  hidden.className = this.btnOpenInnerText + '--hidden';

  btn.setAttribute('title', this.btnOpenTextValue);
  btn.addEventListener('click', this.btnOpenClickHandler);

  hidden.appendChild(text);
  inner.appendChild(hidden);
  btn.appendChild(inner);
  this.btnOpenContainer.appendChild(btn);
  this.btnOpenRef = btn;
}

function checkConfig() {
  const info = '[GALLERY][ERROR][NOT FOUND] ';
  const images = this.galleryImageList;

  if (!images || !images.length) this.errors.push(info + 'image list');
  if (!this.galleryMainLayer) this.errors.push(info + 'gallery layer');
  if (!this.galleryItemList) this.errors.push(info + 'item list -> class');
  if (!this.galleryItemElement) this.errors.push(info + 'item -> class');
  if (!this.galleryItemImage) this.errors.push(info + 'image -> class');
  if (!this.btnOpenContainer) this.errors.push(info + 'button -> open -> container');
  if (!this.btnOpenElement) this.errors.push(info + 'button -> open -> class');
  if (!this.btnOpenInnerText) this.errors.push(info + 'button -> open -> inner');
  if (!this.btnOpenTextValue) this.errors.push(info + 'button -> open -> text');
  if (!this.btnCloseElement) this.errors.push(info + 'button -> close -> class');
  if (!this.progressBarContainer) this.errors.push(info + 'progress bar');
  if (!this.progressBarCounter) this.errors.push(info + 'progress bar -> counter');
  if (!this.imageClickHandler) this.errors.push(info + 'image click handler');
}

function selectElements() {
  const info = '[GALLERY][ERROR][SELECT] ';
  const progressBar = `.${this.progressBarContainer}`;

  this.galleryMainLayer = document.querySelector(`.${this.galleryMainLayer}`);
  this.galleryItemList = document.querySelector(`.${this.galleryItemList}`);
  this.btnOpenContainer = document.querySelector(`.${this.btnOpenContainer}`);
  this.btnCloseElement = document.querySelector(`.${this.btnCloseElement}`);
  this.progressBarContainer = document.querySelector(progressBar);
  this.progressBarCounter = document.querySelector(`.${this.progressBarCounter}`);

  if (!this.galleryMainLayer) this.errors.push(info + 'gallery layer');
  if (!this.galleryItemList) this.errors.push(info + 'item list');
  if (!this.btnOpenContainer) this.errors.push(info + 'button -> open -> container');
  if (!this.btnCloseElement) this.errors.push(info + 'button -> close -> class');
  if (!this.progressBarContainer) this.errors.push(info + 'progress bar');
  if (!this.progressBarCounter) this.errors.push(info + 'progress bar -> counter');
}

function Gallery(config, pleaseWaitPathImg) {
  this.errors = [];
  this.loadedImages = [];
  this.btnOpenRef;

  this.checkConfig = checkConfig.bind(this);
  this.selectElements = selectElements.bind(this);

  for (let item in config) {
    this[item] = config[item];
  }
  this.checkConfig();
  this.selectElements();

  const self = this;
  this.pleaseWaitImg;

  if (!this.errors.length) {
    // test
    const pleaseWaitElImg = document.createElement('img');
    pleaseWaitElImg.setAttribute('alt', 'loading... please wait');
    pleaseWaitElImg.className = 'please-wait-img';
    pleaseWaitElImg.src = pleaseWaitPathImg;
    pleaseWaitElImg.onload = function () {
      console.log('--- OK test blank img loaded');
      self.pleaseWaitImg = this;
    };
    //

    this.btnOpenClickHandler = btnOpenClickHandler.bind(this);
    this.btnCloseClickHandler = btnCloseClickHandler.bind(this);
    this.galleryImagesLoaded = galleryImagesLoaded.bind(this);
    this.galleryItemClickHandler = galleryItemClickHandler.bind(this);
    this.loadGalleryImages = loadGalleryImages.bind(this);
    this.addBtnOpenToPage = addBtnOpenToPage.bind(this);
    this.escPressHandler = escPressHandler.bind(this);

    this.btnCloseElement.addEventListener('click', this.btnCloseClickHandler);
    this.galleryItemList.addEventListener('click', this.galleryItemClickHandler);
    document.addEventListener('keydown', this.escPressHandler, false);
    this.addBtnOpenToPage();
  }
}

export default Gallery;
