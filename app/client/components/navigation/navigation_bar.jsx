import React, { Component } from 'react';
import NavigationHeader from './navigation_header';
import { Link } from 'react-router';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='navbar navbar-default'>
        <div className='container-fluid navbar-container'>
          <NavigationHeader>
            <Link to='/' className='navbar-brand'>Boggle</Link>
          </NavigationHeader>
        </div>
      </div>
    )
  }
}
