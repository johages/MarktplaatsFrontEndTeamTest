/**
 @namespace Contains code related to the Front End Test
 */
var FeTest = (function() {

  /**
   * @name SimpleAjax
   * A simple ajax module that handles the onload callback
   */
  var SimpleAjax = (function() {

    function makeRequest(options) {
      var oReq = new XMLHttpRequest();
      oReq.onload = generateSuccessCallback(options);
      oReq.responseType = 'json';
      oReq.open('GET', options.url + '?' + new Date().getTime(), true);
      oReq.send();
    }

    function generateSuccessCallback(options) {
      return function(e) {
        options.onSuccess(getResponse(e));
      }
    }

    function getResponse(e) {
      return (e.target !== undefined && e.target.response !== undefined) ? e.target.response : null;
    }

    return {
      /**
      * @name init
      * Checks if a specific banner requires text ads back fill
      * @constructor
      * @param {Object} options Object of options to make ajax request
      * @param {String} options.url String of url target for ajax request
      * @param {Function} options.onSuccess Callback function for onload
      */
      init: function(options) {
        makeRequest(options);
      }
    }
  })();

  /**
   * @name Animate
   * Animates object through setIntervals
   */
  var Animate = (function() {
    var interval;

    function startInterval(options) {
      clearPreviousInterval();
      var callback = createIntervalCallback(options);
      interval = setInterval(callback, options.speed);
    }

    function clearPreviousInterval() {
      clearInterval(interval);
    }

    function createIntervalCallback(options) {
      var position = getPosition(options);

      return function() {
        if (hitEnd(position, options) === true) {
          clearInterval(interval);
        } else {
          position = updatePosition(position, options);
          updateStyle(position, options);
        }
      }
    }

    function updatePosition(position, options) {
      if (options.increment === true) {
        return ++position;
      } else {
        return --position;
      }
    }

    function getPosition(options) {
      var position = options.target.style[options.styling].replace('px', '');
      position = parseInt(position);
      return isNaN(position) !== true ? position : 0;
    }

    function updateStyle(position, options) {
        options.target.style[options.styling] = position + 'px';
    }

    function hitEnd(position, options) {
      return (position >= options.max && options.increment === true) || (position <= options.max && options.increment === false);
    }

    return {
      /**
      * @name init
      * Initializes the animation
      * @constructor
      * @param {Object} options Object of options for animation
      * @param {Object} options.target Target dom element
      * @param {Number} options.max Number representing the end result
      * @param {String} options.styling String of key for dom element styling
      * @param {Boolean} options.increment Boolean to determine to increment or decrement
      * @param {Number} options.speed Speed of animation in milliseconds
      */
      init: function(options) {
        startInterval(options);
      }
    }
  })();

  /**
   * @name Carousel
   * Renders the carousel of listings with navigation functionality
   */
  var Carousel = (function() {
    var dom = {},
        currentListing = 0,
        filter = 'cars',
        listingWidth = 312,
        numberOfListings = 0;

    function cache() {
      dom.buttons = {
        last: document.getElementById('Last'),
        next: document.getElementById('Next')
      };
      dom.listingsContainer = document.getElementById('Listings');
    }

    function bindListeners() {
      dom.buttons.next.addEventListener('click', nextListing);
      dom.buttons.last.addEventListener('click', lastListing);
    }

    function nextListing(e) {
      e.preventDefault();

      if(currentListing < (numberOfListings - 1)) {
        currentListing++;
        animateSlide(5, false);
        updateButtons();
      }
    }

    function lastListing(e) {
      e.preventDefault();
      if (currentListing !== 0) {
        currentListing = 0;
        animateSlide(1, true);
        updateButtons();
      }
    }

    function updateButtons() {
      if (currentListing >= (numberOfListings - 1)) {
        disableButton(dom.buttons.next);
      } else {
        activateButton(dom.buttons.next);
      }
      if (currentListing === 0) {
        disableButton(dom.buttons.last);
      } else {
        activateButton(dom.buttons.last);
      }
    }

    function disableButton(button) {
      button.className += ' disabled';
    }

    function activateButton(button) {
      button.className = button.className.replace(' disabled', '');
    }

    function animateSlide(speed, increment) {
      FeTest.Animate.init({
        target: dom.listingsContainer,
        max: getMarginLeft(),
        styling: 'marginLeft',
        increment: increment,
        speed: speed,
      });
    }

    function getMarginLeft() {
      return (currentListing * listingWidth) * -1;
    }

    function getListings() {
      FeTest.SimpleAjax.init({
        url: '/data/data.json',
        onSuccess: renderListings
      });
    }

    function renderListings(response) {
      var listings = '';
      for (var i = 0; response.length > i; i++) {
        if (listingMeetsFilter(response[i]) === true) {
          numberOfListings++;
          listings += renderListing(response[i]);
        }
      }
      dom.listingsContainer.innerHTML = listings;
      setContainerWidth();
    }

    function setContainerWidth() {
      dom.listingsContainer.style.width = (numberOfListings * listingWidth) + 'px';
    }

    function listingMeetsFilter(listing) { 
      return listing.category === filter;
    }

    function renderListing(listing) {
      return '<li><a href="#">'
              + '<div class="image-holder"><img src="' + listing.img + '" /></div>'
              + '<div class="details">'
                + '<span class="title">' + listing.title + '</span>'
                + '<span class="price">' + formatPrice(listing.price) + '</span>'
              + '</div>'
            + '</a></li>';
    }

    function formatPrice(price) {
      return price.toLocaleString('be-BE', {
          style: 'currency', 
          currency: 'EUR', 
          minimumFractionDigits: 2 
      });
    }

    return {
      /**
      * @name init
      * Initialize the Carousel module, caching dom selectors, setting listeners and grabbing listings
      * @constructor
      */
      init: function() {
        cache();
        bindListeners();
        getListings();
      }
    }
  })();

  return {
    Carousel: Carousel,
    SimpleAjax: SimpleAjax,
    Animate: Animate
  };
})();