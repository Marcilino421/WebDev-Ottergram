var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var TINY_EFFECT_CLASS = 'is-tiny';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESC_KEY = 27;
var prevButton = document.getElementById('prev-button');
var nextButton = document.getElementById('next-button');
var currentThumbnailIndex = 0;
var thumbnails = getThumbnailsArray();

function updateButtonsState() {
  prevButton.disabled = currentThumbnailIndex === 0;
  nextButton.disabled = currentThumbnailIndex === thumbnails.length - 1;
}

function showThumbnailByIndex(index) {
  if (index >= 0 && index < thumbnails.length) {
    currentThumbnailIndex = index;
    setDetailsFromThumb(thumbnails[currentThumbnailIndex]);
    updateButtonsState();
  }
}

function addNavigationButtonHandlers() {
  prevButton.addEventListener('click', function () {
    showThumbnailByIndex(currentThumbnailIndex - 1);
  });

  nextButton.addEventListener('click', function () {
    showThumbnailByIndex(currentThumbnailIndex + 1);
  });
}

function setDetails(imageUrl, titleText) {
  'use strict';

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
      frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
    
    var navigationButtons = document.querySelector('.navigation-buttons');
    if (navigationButtons) {
      navigationButtons.style.display = 'block';
    }
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
            }
});
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler()
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);

  var navigationButtons = document.querySelector('.navigation-buttons');
  if (navigationButtons) {
    navigationButtons.style.display = 'none';
  }
}

initializeEvents();
addNavigationButtonHandlers();
updateButtonsState();
