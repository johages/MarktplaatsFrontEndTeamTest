import Immutable from 'immutable';
import request from 'superagent';

const LOAD_SUCCESS = 'carousel/LOAD_SUCCESS';
const LOADING = 'carousel/LOADING';
const LOAD_FAIL = 'carousel/LOAD_SUCCESS';
const NEXT_LISTING = 'carousel/NEXT_LISTING';
const LAST_LISTING = 'carousel/LAST_LISTING';

const initialState = Immutable.fromJS({
  listings: [
      {
        "title": "Volkswagen Passat Variant 1.9 TDI Highline AUTOMAAT KAPOTa title",
        "price": 460022,
        "img":"images/car1.jpg",
        "category": "cars"
      },
      {
        "title": "Skoda Octavia Octavia Combi 2.0 Tdi Elegance Automaat Dsg Clima Lmv Half Leder",
        "price": 460022,
        "img":"images/car2.jpg",
        "category": "cars"
      },
      {
        "title": "Fiat Panda 0.9 Twinair 63KW 2012 Rood",
        "price": 120022,
        "img":"images/car3.jpg",
        "category": "cars"
      },
      {
        "title": "2010 Raptor SVT Prins Lpg-G3 400L tank Decemberactie!!!",
        "price": 423022,
        "img":"images/car4.jpg",
        "category": "cars"
      },
      {
        "title": "Audi A4 Avant 2.0 TDI Quattro. Pro L. S",
        "price": 410022,
        "img":"images/car4.jpg",
        "category": "cars"
      },
    ],
  loading: false,
  loaded: false,
  currentListing: 0,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
      return state.merge({
        listings: actions.body,
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
  console.log('loading');
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
  console.log('loaded');
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

export function loadListings() {
  return (dispatch, getState) => {
    let carousel = getState().getIn(['carousel']);
    console.log(carousel);

    if (carousel.get('loading') === true || carousel.get('loaded') === true) { return; }

    dispatch(loading());

    dispatch({
      type: LOAD_SUCCESS,
      request: request.get('/data/data.json'),
      callback: err => loadSuccess,
    });
  };
}