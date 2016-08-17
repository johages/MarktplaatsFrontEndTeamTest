import { createStore } from 'redux';
import rootReducer from 'datamodel/reducers';

export default function configureStore() {
  return createStore(rootReducer);
}
