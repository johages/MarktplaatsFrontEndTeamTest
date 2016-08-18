import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { loadListings } from 'datamodel/reducers/carousel';
import Listing from 'components/listing';
import Nav from 'components/nav';

import styles from 'less/carousel.less';

@connect(
  state => ({
    carousel: state.get('carousel')
  }),
  dispatch => bindActionCreators({ loadListings }, dispatch)
)
export default class Carousel extends Component {

  componentDidMount() {
    this.props.loadListings();
  }

  componentWillReceiveProps(props) {
    console.log(props);
  }

  renderListings() {
    return this.props.carousel.get('listings').map((listing, index) => {
      return (<Listing listing={listing} key={index} />);
    });
  }

  render() {
    console.log(this.props.carousel.get('currentListing'));
    let listingsClassNames = `listings-at-${this.props.carousel.get('currentListing')}`;
    return (
      <div id="Carousel">
        <Nav />
        <div id="ListingsContainer">
          <ul id="Listings" className={listingsClassNames}>
            {this.renderListings()}
          </ul>
        </div>
      </div>
    );
  }
};