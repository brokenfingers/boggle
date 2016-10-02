import React from 'react';

export default class ModalFooter extends React.Component {
  render() {
    return (
      <div className='modal-footer'>
        {this.props.children}
      </div>
    );
  }
};
