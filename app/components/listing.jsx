import React, {Component, PropTypes} from 'react';
import styles from 'less/listing.less';

export default class Listing extends Component {

  static propTypes = {
    listing: React.PropTypes.object.isRequired,
  }

  renderPrice() {
    return this.props.listing.get('price').toLocaleString('be-BE', {
      style: 'currency', 
      currency: 'EUR', 
      minimumFractionDigits: 2 
    });
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
            <span className="price">{this.renderPrice()}</span>
          </div>
        </a>
      </li>
    );
  }
};