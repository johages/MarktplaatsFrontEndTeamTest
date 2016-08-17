import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { test } from 'datamodel/reducers/carousel';

@connect(
  state => ({
    carousel: state.get('carousel')
  }),
  dispatch => bindActionCreators({ test }, dispatch)
)
export default class Carousel extends Component {
  render() {   
    return (
      <div className="hello">Hello App {this.props.carousel.get('value')} <button onClick={this.props.test}>++</button></div>
    );
  }
};