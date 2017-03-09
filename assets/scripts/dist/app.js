/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function handleGesure() {
	  var swiped = 'swiped: ';
	  if (touchendX < touchstartX) {
	    alert(swiped + 'left!');
	  }
	  if (touchendX > touchstartX) {
	    alert(swiped + 'right!');
	  }
	  if (touchendY < touchstartY) {
	    alert(swiped + 'down!');
	  }
	  if (touchendY > touchstartY) {
	    alert(swiped + 'left!');
	  }
	  if (touchendY == touchstartY) {
	    alert('tap!');
	  }
	}

	var Slideshow = function () {
	  function Slideshow(slideshowElement) {
	    _classCallCheck(this, Slideshow);

	    // Save a reference to our slideshow element
	    this.el = slideshowElement;

	    // Save a reference to our slide elements
	    this.slideElements = getArrayOfElements(this.el, '[data-slide]');

	    // Save a reference to our navigation elements
	    this.next = this.el.querySelector('[data-next]');
	    this.prev = this.el.querySelector('[data-prev]');

	    // Setup our click listeners
	    this.setupNavigationHandlers();

	    // Setup our swipe defaults
	    this.touchstartX = 0;
	    this.touchendX = 0;

	    // Start the slideshow at the first element
	    this.activeSlideIndex = 0;
	    this.updateSlides();
	    this.showSlides();
	  }

	  _createClass(Slideshow, [{
	    key: 'setupNavigationHandlers',
	    value: function setupNavigationHandlers() {

	      // When we click next, go to the next slide
	      this.next.addEventListener('click', function (event) {
	        event.preventDefault();
	        this.goToSlide(this.activeSlideIndex + 1);
	      }.bind(this));

	      // When we click previous, go to the previous slide
	      this.prev.addEventListener('click', function (event) {
	        event.preventDefault();
	        this.goToSlide(this.activeSlideIndex - 1);
	      }.bind(this));

	      // Listen for a touch start and update the state
	      this.el.addEventListener('touchstart', function (event) {
	        this.touchstartX = event.changedTouches[0].screenX;
	      }.bind(this));

	      // Update the slides on touch end
	      this.el.addEventListener('touchend', function (event) {
	        console.log(event);
	        this.touchendX = event.changedTouches[0].screenX;
	        this.handleGesture();
	      }.bind(this));
	    }
	  }, {
	    key: 'handleGesture',
	    value: function handleGesture() {

	      // Compare the touch start origin with the touch end origin
	      if (this.touchendX < this.touchstartX) {
	        this.goToSlide(this.activeSlideIndex + 1);
	      }

	      if (this.touchendX > this.touchstartX) {
	        this.goToSlide(this.activeSlideIndex - 1);
	      }
	    }
	  }, {
	    key: 'goToSlide',
	    value: function goToSlide(requestedSlideIndex) {

	      // Normalise the requested slide index
	      var normalisedSlideIndex = normaliseArrayIndex(requestedSlideIndex, this.slideElements.length);

	      // Update our active slide
	      this.activeSlideIndex = normalisedSlideIndex;

	      // Update our slide positions
	      this.updateSlides();
	    }
	  }, {
	    key: 'showSlides',
	    value: function showSlides() {

	      // Iterate through our slides
	      this.slideElements.map(function (slideElement, index) {

	        // If it's the active slide show immediately
	        // else show it after one second
	        if (index == this.activeSlideIndex) {
	          slideElement.style.opacity = 1;
	        } else {
	          setTimeout(function () {
	            slideElement.style.opacity = 1;
	          }, 1000);
	        }
	      }.bind(this));
	    }
	  }, {
	    key: 'updateSlides',
	    value: function updateSlides() {

	      // Iterate through our slides
	      this.slideElements.map(function (slideElement, slideIndex) {

	        // Workout the offset by subracting the index by the activeIndex
	        var offset = slideIndex - this.activeSlideIndex;

	        // Update the transform value of the slide element
	        slideElement.style.transform = 'translateX(' + offset + '00%)';
	      }.bind(this));
	    }
	  }]);

	  return Slideshow;
	}();

	function onDOMReady() {

	  // Get array of slideshow elements
	  var slideshows = getArrayOfElements(document, '[data-slideshow]');

	  // Map over the slideshow and pass each one to our slideshow class
	  slideshows.map(function (slideshowElement) {
	    return new Slideshow(slideshowElement);
	  });
	}

	// Fire when ready!
	document.onreadystatechange = function () {
	  if (document.readyState === 'interactive') {
	    onDOMReady();
	  }
	};

	// Utility functions -----------------------------------------------------------

	function normaliseArrayIndex(index, arrayLength) {

	  // If the index is 0, select the last item
	  // else return the modulo of the index in the array
	  if (index < 0) {
	    return arrayLength - 1;
	  } else {
	    return index % arrayLength;
	  }
	}

	function getArrayOfElements(scope, selector) {

	  // Get a nodelist of our selectors from our scope
	  var nodelist = scope.querySelectorAll(selector);

	  // Convert the nodelist to a regular array
	  var array = Array.prototype.slice.call(nodelist);

	  // Return our array
	  return array;
	}

/***/ }
/******/ ]);