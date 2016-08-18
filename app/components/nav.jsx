import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { nextListing, lastListing } from 'datamodel/reducers/carousel';
import styles from 'less/nav.less';

@connect(
  state => ({
    carousel: state.get('carousel')
  }),
  dispatch => bindActionCreators({ nextListing, lastListing }, dispatch)
)
export default class Listing extends Component {

  atFirstListing() {
    return this.props.carousel.get('currentListing') === 0;
  }

  atLastListing() {
    return this.props.carousel.get('currentListing') === (this.props.carousel.get('listings').size - 1);
  }

  nextListing = () => {
    if (this.atLastListing() !== true) {
      this.props.nextListing();
    }
  }

  lastListing = () => {
    if (this.atFirstListing() !== true) {
      this.props.lastListing();
    }
  }

  render() {   
    let classNames = {
      last: 'icon-left-open',
      next: 'icon-right-open',
    };

    if (this.atFirstListing() === true) {
      classNames.last += ' disabled';
    }

    if (this.atLastListing() === true) {
      classNames.next += ' disabled';
    }

    return (
      <nav>
        <a href="#" onClick={this.lastListing} className={classNames.last} id="Last"></a>
        <a href="#" onClick={this.nextListing} className={classNames.next} id="Next"></a>
      </nav>
    );
  }
};