import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

export default options => (

  function dragAndDropWrapper(WrappedComponent) {
    class Drop extends Component {

      static contextTypes = {
        dragDropManager: PropTypes.object,
      }

      componentDidMount() {
        this.context.dragDropManager.subscribe(() => this.forceUpdate());

        this.node = findDOMNode(this);

        this.node.addEventListener('drop', this.handleDrop);
        this.node.addEventListener('dragend', this.handleDragEnd);
        this.node.addEventListener('dragover', this.handleDragOver);
      }

      componentWillUnmount() {
        this.node.removeEventListener('drop', this.handleDrop);
        this.node.removeEventListener('dragend', this.handleDragEnd);
        this.node.removeEventListener('dragover', this.handleDragOver);
      }

      handleDragOver = (e) => {
        e.preventDefault();

        const overElementHeight = e.currentTarget.getBoundingClientRect().height / 2;
        const overElementTopOffset = e.currentTarget.getBoundingClientRect().top;
        const mousePositionY = e.clientY;

        const showAfter = mousePositionY - overElementTopOffset > overElementHeight;

        if (options.onDragOver) {
          options.onDragOver(this.props, showAfter);
        }
      }

      handleDragEnd = (e) => {
        e.preventDefault();

        const { dragDropManager } = this.context;
        if (options.onDragEnd) {
          options.onDragEnd(dragDropManager.active);
        }
      }

      handleDrop = (e) => {
        e.preventDefault();

        const { dragDropManager } = this.context;
        if (options.onDrop) {
          options.onDrop(dragDropManager.active);
        }
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
          />
        );
      }
    }

    return Drop;
  }
);
