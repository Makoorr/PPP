import React from 'react';
import ReactDOM from 'react-dom';
import AddButton from '.';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});