
import React from 'react';
import { create } from "react-test-renderer";
import Spinner from './index';

describe('test Spinner component', () => {
 it('should be defined', () => {
   expect(Spinner).toBeDefined();
 });
 it('should match snapshot', () => {
  expect.assertions(1);
  const spinner = create(<Spinner />).toJSON();
  expect(spinner).toMatchSnapshot();
 });
});