function showPleaseWait() {
  this.mainImageCnt.style.backgroundPosition = '0px 0px';
}

function hidePleaseWait() {
  this.mainImageCnt.style.backgroundPosition = '-200px 0px';
}

function fadeMainImage(callback) {
  let fadeCounter = 100;
  let fadeTimer = setInterval(() => {
    if (fadeCounter > 0) {
      this.mainImageEl.style.opacity = --fadeCounter / 100;
    } else {
      clearInterval(fadeTimer);
      this.showPleaseWait();
      callback();
      return;
    }
  }, 1);
}

function showMainImage(callback) {
  let showCounter = 0;
  let showTimer = setInterval(() => {
    if (showCounter < 100) {
      this.mainImageEl.style.opacity = ++showCounter / 100;
    } else {
      clearInterval(showTimer);
      callback();
      return;
    }
  }, 1);
}

function changeMainImage(newImagesrc) {
  new Promise((resolve) => this.fadeMainImage(resolve))
    .then(() => {
      return new Promise((resolve) => {
        this.mainImageEl.src = newImagesrc;
        this.mainImageEl.onload = resolve;
      });
    })
    .then(() => {
      this.hidePleaseWait();
      return new Promise((resolve) => this.showMainImage(resolve));
    });
}

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
  this.progressBarCnt.style.display = 'none';

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
    this.changeMainImage(event.target.src);
  } else if (tag === 'button') {
    this.btnCloseClickHandler();
    this.changeMainImage(event.target.value);
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

function Gallery(images, config) {
  this.btnOpenRef;
  this.errors = [];
  this.loadedImages = [];

  if (!images || !images.length) {
    this.errors.push('[GALLERY][ERROR] The image list is empty');
  }

  for (let item in config) {
    if (!config[item]) this.errors.push(`[GALLERY][ERROR] ${item} is empty`);
  }

  if (!this.errors.length) {
    this.galleryImageList = images;

    this.galleryMainLayer = config.gallery_main_layer;
    this.galleryItemList = config.gallery_item_list;
    this.galleryItemElement = config.gallery_item_element;
    this.galleryItemImage = config.gallery_item_image;
    this.btnOpenContainer = config.button_open_container;
    this.btnOpenElement = config.button_open_element;
    this.btnOpenInnerText = config.button_open_inner_text;
    this.btnOpenTextValue = config.button_open_text_value;
    this.btnCloseElement = config.button_close_element;
    this.progressBarCnt = config.progress_bar_container;
    this.progressBarCounter = config.progress_bar_counter;
    this.mainImageCnt = config.main_image_container;
    this.mainImageEl = config.main_image_element;

    this.galleryMainLayer = document.querySelector(`.${this.galleryMainLayer}`);
    this.galleryItemList = document.querySelector(`.${this.galleryItemList}`);
    this.btnOpenContainer = document.querySelector(`.${this.btnOpenContainer}`);
    this.btnCloseElement = document.querySelector(`.${this.btnCloseElement}`);
    this.progressBarCnt = document.querySelector(`.${this.progressBarCnt}`);
    this.progressBarCounter = document.querySelector(`.${this.progressBarCounter}`);
    this.mainImageCnt = document.querySelector(`.${this.mainImageCnt}`);
    this.mainImageEl = document.getElementById(this.mainImageEl);
  }

  for (let item in this) {
    if (!this[item]) this.errors.push(`[GALLERY][ERROR] ${item} not found`);
  }

  if (!this.errors.length) {
    this.addBtnOpenToPage = addBtnOpenToPage.bind(this);
    this.loadGalleryImages = loadGalleryImages.bind(this);
    this.galleryItemClickHandler = galleryItemClickHandler.bind(this);
    this.galleryImagesLoaded = galleryImagesLoaded.bind(this);
    this.escPressHandler = escPressHandler.bind(this);
    this.btnCloseClickHandler = btnCloseClickHandler.bind(this);
    this.btnOpenClickHandler = btnOpenClickHandler.bind(this);
    this.changeMainImage = changeMainImage.bind(this);
    this.hidePleaseWait = hidePleaseWait.bind(this);
    this.showPleaseWait = showPleaseWait.bind(this);
    this.fadeMainImage = fadeMainImage.bind(this);
    this.showMainImage = showMainImage.bind(this);

    this.btnCloseElement.addEventListener('click', this.btnCloseClickHandler);
    this.galleryItemList.addEventListener('click', this.galleryItemClickHandler);
    document.addEventListener('keydown', this.escPressHandler, false);
    this.addBtnOpenToPage();
  }
}

export default Gallery;
