import React, {Component} from 'react';
import styles from 'less/nav.less';

export default class Listing extends Component {

  render() {   
    return (
      <nav>
        <a href="#" className="icon-left-open disabled" id="Last"></a>
        <a href="#" className="icon-right-open" id="Next"></a>
      </nav>
    );
  }
};