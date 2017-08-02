import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DragAndDropManager from './DragAndDropManager';

export default (WrapperComponent) => {
  class DragAndDrop extends Component {

    static childContextTypes = {
      dragDropManager: PropTypes.object,
    }

    constructor(props, context) {
      super(props, context);
      this.dragDropManager = new DragAndDropManager();
    }

    getChildContext() {
      return { dragDropManager: this.dragDropManager };
    }

    render() {
      return (
        <WrapperComponent
          {...this.props}
        />
      );
    }
  }

  return DragAndDrop;
};
