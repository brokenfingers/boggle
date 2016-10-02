import React, { Component } from 'react';

export default class NavigationHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='navbar-header'>
        {this.props.children}
      </div>
    )
  }
}
