import Immutable from 'immutable';
import request from 'superagent';

const LOAD_SUCCESS = 'carousel/LOAD_SUCCESS';
const LOADING = 'carousel/LOADING';
const LOAD_FAIL = 'carousel/LOAD_SUCCESS';
const NEXT_LISTING = 'carousel/NEXT_LISTING';
const LAST_LISTING = 'carousel/LAST_LISTING';

const initialState = Immutable.fromJS({
  listings: [],
  loading: false,
  loaded: false,
  currentListing: 0,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
      return state.merge({
        listings: action.payload.listings,
        loading: false,
        loaded: true,
      });
    case LOADING:
      return state.merge({
        loading: true,
        loaded: false,
      });
    case LOAD_FAIL:
      return state.merge({
        loading: false,
        loaded: false,
      });
    case NEXT_LISTING:
      return state.merge({
        currentListing: state.get('currentListing') + 1,
      });
    case LAST_LISTING:
      return state.merge({
        currentListing: 0,
      });
    default:
      return state;
  }
}

function loading() {
  return {
    type: LOADING,
  };
}

function loadFailure() {
  return {
    type: LOAD_FAILURE,
  };
}

function loadSuccess(data) {
  return {
    type: LOAD_SUCCESS,
    data,
  };
}

export function nextListing() {
  return {
    type: NEXT_LISTING,
  };
}

export function lastListing() {
  return {
    type: LAST_LISTING,
  };
}

function isInFilter(listing) {
  return listing.category === 'cars';
}

function filterListings(listings) {
  return listings.filter(isInFilter);
}

function getData() {
  return new Promise(function(resolve, reject) {
    request.get('/data/data.json')
      .end((err, res) => { 
        resolve({listings: filterListings(res.body)}); 
    });
  });
}

export function loadListings() {
  return {
    promise: getData(),
    types: [LOADING, LOAD_SUCCESS, LOAD_FAIL],
  }
}