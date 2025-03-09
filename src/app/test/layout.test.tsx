import { render, screen } from '@testing-library/react';

import RootLayout from '../layout';
vi.mock('@/components/Header', () => ({
  default: () => {
    return <div>Mock component</div>;
  },
}));
vi.mock('next/font/google', () => ({
  Open_Sans: () => 'Mocked Open_Sans',
}));

describe('RootLayout Component', () => {
  it('renders the layout with correct semantic elements', () => {
    // Arrange
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    // Act
    const headerElement = screen.getByRole('banner');
    const mainElement = screen.getByRole('main');
    const footerElement = screen.getByRole('contentinfo');

    // Assert
    expect(headerElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });

  it('renders children inside the main element', () => {
    // Arrange
    render(
      <RootLayout>
        <div data-testid="child-content">Test Content</div>
      </RootLayout>,
    );

    // Act
    const mainElement = screen.getByRole('main');
    const childContent = screen.getByTestId('child-content');

    // Assert
    expect(mainElement).toContainElement(childContent);
  });
});
