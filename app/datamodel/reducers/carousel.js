import Immutable from 'immutable';

const TEST = 'phoneNumber/LOADING';

const initialState = Immutable.fromJS({
  value: 0
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TEST:
      return state.merge({
        value: state.get('value') + 1,
      });
    default:
      return state;
  }
}

export function test() {
  return {
    type: TEST
  };
}
