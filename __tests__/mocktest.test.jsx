import { render, screen } from '@testing-library/react';
import Page from '../app/page';

test('renders Hello World', () => {
  render(<Page />);
  expect(screen.getByText('Hello World!')).toBeInTheDocument();
});
