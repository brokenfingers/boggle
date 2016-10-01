import React, { Component } from 'react';
import NavigationBar from '../navigation/navigation_bar';

export default class Application extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
      </div>
    )
  }
}
