import React from 'react';

export default class ModalHeader extends React.Component {
  render() {
    return (
      <div className='modal-header'>
        {this.props.children}
      </div>
    );
  }
};
