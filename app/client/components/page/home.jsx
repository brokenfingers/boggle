import React, { Component } from 'react';
import Application from '../layout/application';
import { Link } from 'react-router';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Application>
        <div className='container'>
          <div className='jumbotron home-jumbotron'>
            <div>
              <h1>Boggle</h1>
              <h3>
                Word game designed by Allan Turoff and originally distributed by Parker Brothers.
                The game is played using a plastic grid of lettered dice, in which players attempt to find
                words in sequences of adjacent letters.
              </h3>
            </div>
            <Link to='/play' className='btn btn-default'>Play</Link>
          </div>
        </div>
      </Application>
    )
  }
}
