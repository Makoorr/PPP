import React from 'react';
import ReactDOM from 'react-dom';
import Card from '.';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Card />, div);
  ReactDOM.unmountComponentAtNode(div);
});