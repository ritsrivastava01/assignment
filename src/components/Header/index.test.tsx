import { render, screen } from '@testing-library/react';

import Header from './index';

vi.mock('@images/icons/pet-icon.svg', () => ({
  default: () => <svg data-testid="mocked-svg">Mocked SVG</svg>,
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => {
    return <div data-testid="mocked-image" aria-label={alt} />;
  },
}));

describe('Header Component', () => {
  it.only('should render the header with the correct text', () => {
    // Arrange
    render(<Header />);

    // Act
    const headerElement = screen.getByTestId('header');

    // Assert
    expect(headerElement).toBeInTheDocument();
  });
});
