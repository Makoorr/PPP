import React from 'react';
import ReactDOM from 'react-dom';
import Wave from '.';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Wave />, div);
  ReactDOM.unmountComponentAtNode(div);
});