import Immutable from 'immutable';
import request from 'superagent';

const LOAD_SUCCESS = 'carousel/LOAD_SUCCESS';
const LOADING = 'carousel/LOADING';
const LOAD_FAIL = 'carousel/LOAD_SUCCESS';

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
      }
    ],
  loading: false,
  loaded: false,
  currentAd: 0,
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

export function loadListings() {
  return (dispatch, getState) => {
    let carousel = getState().getIn(['carousel']);
    console.log(carousel);

    if (carousel.get('loading') === true || carousel.get('loaded') === true) { return; }

    dispatch(loading());

    dispatch({
      type: LOAD_SUCCESS,
      request: request.get('/data/data.json'),
      callback: err => loadSuccess({hi: 'hello'}),
    });
  };
}