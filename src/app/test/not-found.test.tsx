import { render, screen } from '@testing-library/react';

import NotFound from '../not-found';

describe('NotFound Component', () => {
  it('renders the NotFound component with correct text', () => {
    // Arrange
    render(<NotFound />);

    // Act
    const headingElement = screen.getByTestId('not-found-title');
    const paragraphElement = screen.getByTestId('not-found-message');

    // Assert
    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
  });
});
