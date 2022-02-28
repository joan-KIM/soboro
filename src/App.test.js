import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Email label', () => {
  render(<App />);
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});
