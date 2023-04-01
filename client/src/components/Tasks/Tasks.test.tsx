import React from 'react';
import ReactDOM from 'react-dom';
import Tasks from './Tasks';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tasks />, div);
  ReactDOM.unmountComponentAtNode(div);
});