import React, { Component } from 'react';
import Application from '../layout/application';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Application>
        <div>
          Hello
        </div>
      </Application>
    )
  }
}
