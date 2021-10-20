import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Loading... status', () => {
  render(<App />);
  const loading = screen.getByText('Loading...');
  expect(loading).toBeInTheDocument();
});
