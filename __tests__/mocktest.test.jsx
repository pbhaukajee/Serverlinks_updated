import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';

test('renders Hello World', () => {
  render(<Page />);
  expect(screen.getByText('Hello World!')).toBeInTheDocument();
});
