import { render, screen } from '@testing-library/react';

import ErrorBoundary from '../error';

describe('Error component', () => {
  describe('When error message is provided', () => {
    it('should render the error message', () => {
      // Arrange
      const error = new Error('Test error message');
      render(<ErrorBoundary error={error} />);

      // Act
      const errorTitle = screen.getByTestId('error-title');
      const errorMessage = screen.getByTestId('error-message');

      // Assert
      expect(errorTitle).toBeInTheDocument();
      expect(errorMessage.innerText).toBe(error.message);
    });
  });

  describe('When error message is not provided', () => {
    it('should render a default message', () => {
      // Arrange
      render(<ErrorBoundary error={new Error()} />);

      // Act
      const defaultErrorMessage = screen.getByText(
        'We encountered an error. Please try again later.',
      );

      // Assert
      expect(defaultErrorMessage).toBeInTheDocument();
    });
  });
});
