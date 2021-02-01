
import React from 'react';
import { create } from "react-test-renderer";
import Button from './index';

describe('test Button component', () => {
 it('should be defined', () => {
   expect(Button).toBeDefined();
 });
 it('should match snapshot', () => {
  expect.assertions(1);
  const button = create(<Button className="test" />).toJSON();
  expect(button).toMatchSnapshot();
 });
});