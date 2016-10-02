import React from 'react';
import ModalDialog from './modal_dialog';
import ModalContent from './modal_content';

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  _getModalClassName() {
    return this.props.show ? 'modal fade in' : 'modal fade';
  }

  _getModalStyle() {
    return this.props.show ? {display: 'block'} : {display: 'none'};
  }

  _getBackdropClassName() {
    return this.props.show ? 'modal-backdrop fade in' : 'modal-backdrop fade';
  }

  render() {
    return (
      <div>
        <div
          id={this.props.id}
          className={this._getModalClassName()}
          role='dialog'
          style={this._getModalStyle()}
          tabIndex='-1'
        >
          <ModalDialog>
            <ModalContent>
              {this.props.children}
            </ModalContent>
          </ModalDialog>
        </div>
        <div className={this._getBackdropClassName()} style={this._getModalStyle()} />
      </div>
    );
  }
};

Modal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  id: React.PropTypes.string
}
