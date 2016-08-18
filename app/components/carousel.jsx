import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { test } from 'datamodel/reducers/carousel';
import Listing from 'components/listing';
import Nav from 'components/nav';

import styles from 'less/carousel.less';

@connect(
  state => ({
    carousel: state.get('carousel')
  }),
  dispatch => bindActionCreators({ test }, dispatch)
)
export default class Carousel extends Component {
  render() {
    let listingDemo = {
      "title": "Volkswagen Passat Variant 1.9 TDI Highline AUTOMAAT KAPOTa title",
      "price": 460022,
      "img":"images/car1.jpg",
      "category": "cars"
    };
    return (
      <div id="Carousel">
        <Nav />
        <div id="ListingsContainer">
          <ul id="Listings">
            <Listing listing={listingDemo} />
          </ul> 
        </div>
        <div className="hello">Hello App {this.props.carousel.get('value')} <button onClick={this.props.test}>++</button></div>
      </div>
    );
  }
};