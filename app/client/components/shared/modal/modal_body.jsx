import React from 'react';

export default class ModalBody extends React.Component {
  render() {
    return (
      <div className='modal-body'>
        {this.props.children}
      </div>
    );
  }
};
