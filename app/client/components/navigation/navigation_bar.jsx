import React, { Component } from 'react';
import NavigationHeader from './navigation_header';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='navbar navbar-default'>
        <div className='container-fluid'>
          <NavigationHeader>
            <p className='navbar-brand'>Boggle</p>
          </NavigationHeader>
        </div>
      </div>
    )
  }
}
