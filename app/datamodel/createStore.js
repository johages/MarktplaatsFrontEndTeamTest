import { createStore, applyMiddleware } from 'redux';
import {requestMiddleware, responseParserMiddleware} from 'redux-request-middleware'
import rootReducer from 'datamodel/reducers';

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(requestMiddleware, responseParserMiddleware)
  );
}
