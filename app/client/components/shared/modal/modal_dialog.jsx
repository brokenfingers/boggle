import React from 'react';

export default class ModalDialog extends React.Component {
  render() {
    return (
      <div className='modal-dialog' role='document'>
        {this.props.children}
      </div>
    );
  }
}
