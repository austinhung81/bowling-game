import React from 'react';
import App from './App';
import { create } from "react-test-renderer";

describe('test App component', () => {
  const component = create(<App />);
  const componentInstance = component.root;

  it('should have two buttons', () => {
    expect(true).toEqual(true);
    const buttons = componentInstance.findAllByType('button');
    expect(buttons.length).toEqual(3);
  });
});