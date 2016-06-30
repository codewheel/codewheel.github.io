class Slideshow {
  constructor(slideshowElement) {

    // Save a reference to our slideshow element
    this.el = slideshowElement

    // Save a reference to our slide elements
    this.slideElements = getArrayOfElements(this.el, '[data-slide]')

    // Save a reference to our navigation elements
    this.next = this.el.querySelector('[data-next]')
    this.prev = this.el.querySelector('[data-prev]')

    // Setup our click listeners
    this.setupNavigationHandlers()

    // Start the slideshow at the first element
    this.activeSlideIndex = 0
    this.updateSlides()
    this.showSlides()
  }

  setupNavigationHandlers() {

    // When we click next, go to the next slide
    this.next.addEventListener('click', function(event) {
      event.preventDefault()
      this.goToSlide(this.activeSlideIndex + 1)
    }.bind(this))

    // When we click previous, go to the previous slide
    this.prev.addEventListener('click', function(event) {
      event.preventDefault()
      this.goToSlide(this.activeSlideIndex - 1)
    }.bind(this))
  }

  goToSlide(requestedSlideIndex) {

    // Normalise the requested slide index
    var normalisedSlideIndex =
      normaliseArrayIndex(requestedSlideIndex, this.slideElements.length)

    // Update our active slide
    this.activeSlideIndex = normalisedSlideIndex

    // Update our slide positions
    this.updateSlides()
  }

  showSlides() {

    // Iterate through our slides
    this.slideElements.map(function(slideElement, index) {

      // If it's the active slide show immediately
      // else show it after one second
      if(index == this.activeSlideIndex) {
        slideElement.style.opacity = 1
      } else {
        setTimeout(function() {
          slideElement.style.opacity = 1
        }, 1000)
      }
    }.bind(this))
  }

  updateSlides() {

    // Iterate through our slides
    this.slideElements.map(function(slideElement, slideIndex) {

      // Workout the offset by subracting the index by the activeIndex
      var offset = slideIndex - this.activeSlideIndex

      // Update the transform value of the slide element
      slideElement.style.transform = 'translateX(' + offset + '00%)'
    }.bind(this))
  }
}

function onDOMReady() {

  // Get array of slideshow elements
  var slideshows = getArrayOfElements(document, '[data-slideshow]')

  // Map over the slideshow and pass each one to our slideshow class
  slideshows.map(function(slideshowElement) {
    return new Slideshow(slideshowElement)
  })
}

// Fire when ready!
document.onreadystatechange = function() {
  if(document.readyState === 'interactive') {
    onDOMReady()
  }
}

// Utility functions -----------------------------------------------------------

function normaliseArrayIndex(index, arrayLength) {

  // If the index is 0, select the last item
  // else return the modulo of the index in the array
  if(index < 0) {
    return arrayLength - 1
  } else {
    return index % arrayLength
  }
}

function getArrayOfElements(scope, selector) {

  // Get a nodelist of our selectors from our scope
  var nodelist = scope.querySelectorAll(selector)

  // Convert the nodelist to a regular array
  var array = Array.prototype.slice.call(nodelist)

  // Return our array
  return array
}
