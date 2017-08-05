# simple-react-dnd
**Example available here: https://lzgrzebski.github.io/react-kanban-flow/**

> Small react html5 drag and drop library created for fun.
> So not production ready if you have an ideas how to make it better please let 
> me know I'll be pretty happy to make it better :)

## Instalation
Using [npm](https://www.npmjs.com/package/simple-react-dnd):

	npm install simple-react-dnd --save

## Basic example
Library it's pretty simple it contain 3 HOC that you can use:

### DragAndDrop
First one is mandatory, you need to wrap the parent component (can be top-level of app or lower) whcih have children that will contain drag and drop logic.

We need to add it to pass the context around.

```js
import React from 'react';
import { DragAndDrop } from 'simple-react-dnd';

const App = ({items}) => {
  <List items />
}

export default DragAndDrop(App);
```

### Drag
Idea behind is to create HOC with callback that are going to be invoked when the events happened. Callbacks will get props of the component and some additional property. 
Rest html5 boilerplate and logic is encapsulated and library is dealing with it.

Property | Attr in callback func | Description
--- | --- | --- 
**onDragStart** | *props* | Trigger when starting to drag an component
**onDragEnd** | *props* | Trigger when drag ends

```js
import React from 'react';
import { Drag } from 'simple-react-dnd';

const Item = (props) => {
  <div>
    <h1>{props.title}</h1>
    <p>{props.description}</p>
  </div>
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Drag(
  {
    onDragStart: props => props.setActiveItem(props.id),
    onDragEnd: props => props.setActiveItem(null)
  }
)(Item);

```

### Drop
Same like above but this one is for Drop targets.

Property | Attr in callback func | Description
--- | --- | --- 
**onDragOver** | *props, showAfter(bool)* | Trigger when dragging over object, we are getting as well info if its above the middle or below with showAfter bool.
**onDrop** | *props* | Triggered when element dropped to this component.

```js
import React from 'react';
import { Drop } from 'simple-react-dnd';

const List = (props) => {
  <div>
    {
      props.items.map(id => (
        <Item id />
      ))
    }
  </div>
}

export default Drop(
  {
    OnDragOver: (props, showAfter) => props.AddOpacityEffect(),
    onDrop: props => props.setActiveItem(null)
  }
)(List);
```

### Mix drang and drop
Of course we can use them both in one component eg:

```js
  Drag(OptionsDrag)(
    Drop(optionsDrop)(Component)
  )
```

### Working code example
[https://github.com/lzgrzebski/react-kanban-flow/tree/with-simple-react-dnd](https://github.com/lzgrzebski/react-kanban-flow/tree/with-simple-react-dnd)