import React, {Component, PropTypes} from 'react';
import styles from 'less/listing.less';

export default class Listing extends Component {

  static propTypes = {
    listing: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <li>
        <a href="#">
          <div className="image-holder">
            <img src={this.props.listing.get('img')} />
          </div>
          <div className="details">
            <span className="title">{this.props.listing.get('title')}</span>
            <span className="price">{this.props.listing.get('price')}</span>
          </div>
        </a>
      </li>
    );
  }
};