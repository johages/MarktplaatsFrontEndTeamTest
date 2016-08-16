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
   * @name Carousel
   * Renders the carousel of listings with navigation functionality
   */
  var Carousel = (function() {
    var dom = {},
        currentListing = 0,
        filter = 'cars';

    function cache() {
      dom.buttons = {
        last: document.getElementById('Last'),
        next: document.getElementById('Next')
      };
      dom.listingsContainer = document.getElementById('Listings');
    }

    function bindListeners() {
      dom.buttons.next.addEventListener('click', nextListings);
      dom.buttons.last.addEventListener('click', lastListings);
    }

    function nextListings(e) {
      e.preventDefault();
    }

    function lastListings(e) {
      e.preventDefault();
      currentListing = 0;
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
          listings += renderListing(response[i]);
        }
      }
      dom.listingsContainer.innerHTML = listings;
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
    SimpleAjax: SimpleAjax
  };
})();