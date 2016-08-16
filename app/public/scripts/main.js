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
        currentAd = 0,
        filter = 'cars';

    function cache() {
      dom.buttons = {
        last: document.getElementById('Last'),
        next: document.getElementById('Next')
      };
      dom.adsContainer = document.getElementById('Ads');
    }

    function bindListeners() {
      dom.buttons.next.addEventListener('click', nextAds);
      dom.buttons.last.addEventListener('click', lastAds);
    }

    function nextAds(e) {
      e.preventDefault();
    }

    function lastAds(e) {
      e.preventDefault();
      currentAd = 0;
    }

    function getAds() {
      FeTest.SimpleAjax.init({
        url: '/data/data.json',
        onSuccess: renderAds
      });
    }

    function renderAds(response) {
      var ads = '';
      for (var i = 0; response.length > i; i++) {
        if (adMeetsFilter(response[i]) === true) {
          ads += renderAd(response[i]);
        }
      }
      console.log(ads);
      dom.adsContainer.innerHTML = ads;
    }

    function adMeetsFilter(ad) { 
      return ad.category === filter;
    }

    function renderAd(ad) {
      return '<li>' + ad.title + '</li>';
    }

    return {
      init: function() {
        cache();
        bindListeners();
        getAds();
      }
    }
  })();

  return {
    Carousel: Carousel,
    SimpleAjax: SimpleAjax
  };
})();