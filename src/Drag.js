import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

export default options => (

  function dragAndDropWrapper(WrappedComponent) {
    class Drag extends Component {

      static contextTypes = {
        dragDropManager: PropTypes.object,
      }

      componentDidMount() {
        this.subscriptionID = this.context.dragDropManager.subscribe(() => this.forceUpdate());

        this.node = findDOMNode(this);
        this.node.setAttribute('draggable', true);

        this.node.addEventListener('dragstart', this.handleDragStart);
        this.node.addEventListener('dragend', this.handleDragEnd);
      }

      componentWillUnmount() {
        this.node.removeEventListener('dragstart', this.handleDragStart);
        this.node.removeEventListener('dragend', this.handleDragEnd);

        this.context.dragDropManager.unsubscribe(this.subscriptionID);
      }


      handleDragStart = (e) => {
        const { dragDropManager } = this.context;
        dragDropManager.setActive(this.props);

        if (e.dataTransfer !== undefined) {
          e.dataTransfer.effectAllowed = 'move'; 
          e.dataTransfer.dropEffect = 'move';
          e.dataTransfer.setData('text', 'drag'); // firefox fix
        }

        if (options.onDragStart) {
          options.onDragStart(dragDropManager.active);
        }
      }

      handleDragEnd = (e) => {
        e.preventDefault();

        const { dragDropManager } = this.context;
        if (options.onDragOver) {
          options.onDragEnd(dragDropManager.active);
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

    return Drag;
  }

);
