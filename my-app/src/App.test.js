/**
 * App Test Suite
 * This file contains unit tests for the root `App` component.
 * It uses React Testing Library to verify that the application renders correctly.
 *
 * @file App.test.js
 * @module tests/App.test
 * @requires @testing-library/react
 * @requires ./App
 */

import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Test: Verify that the "learn react" link is rendered in the App component.
 */
test('renders learn react link', () => {
  // Render the App component
  render(<App />);
  
  // Search for an element containing "learn react" text (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);
  
  // Assertion: Verify that the element is present in the document
  expect(linkElement).toBeInTheDocument();
});
