import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'middleware/promiseMiddleware'
import rootReducer from 'datamodel/reducers';

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware)
  );
}
