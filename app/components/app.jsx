import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from 'datamodel/createStore';
import Carousel from 'components/carousel';

import baseStyles from 'less/base.less';

console.log(baseStyles);

export default class App extends Component {
  render() {   
    return (
      <div id="root">
        <Carousel />
      </div>
    );
  }
};

/* Initialization logic */
const store = configureStore();

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, 
    document.getElementById('react-root')
  );
});
