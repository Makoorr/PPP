import React from 'react';
import ReactDOM from 'react-dom';
import TaskHolder from './TaskHolder';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TaskHolder />, div);
  ReactDOM.unmountComponentAtNode(div);
});