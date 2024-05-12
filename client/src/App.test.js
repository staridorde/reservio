import { render, screen } from '@testing-library/react';
import App from './App';

test('renders send request button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/send request/i);
  expect(buttonElement).toBeInTheDocument();
});
