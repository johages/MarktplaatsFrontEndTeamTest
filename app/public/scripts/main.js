var FeTest = (function() {

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
      init: function(options) {
        makeRequest(options);
      }
    }
  })();

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
      console.log(listings);
      dom.listingsContainer.innerHTML = listings;
    }

    function listingMeetsFilter(listing) { 
      return listing.category === filter;
    }

    function renderListing(listing) {
      return '<li><a href="#">'
              + '<div class="image-holder"><img src="' + listing.img + '" /></div>'
              + '<span class="title">' + listing.title + '</span>'
              + '<span class="price">' + listing.price + '</span>'
            + '</a></li>';
    }

    return {
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