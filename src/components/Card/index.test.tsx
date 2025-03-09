import { render, screen } from '@testing-library/react';

import Card from '.';

describe('Card component', () => {
  const defaultProps = {
    name: 'Fluffy',
    photoUrl: '/images/fluffy.jpg',
    dateAdded: new Date('2023-03-09'),
    species: 'Cat',
    available: true,
  };

  beforeEach(() => {
    render(<Card {...defaultProps} />);
  });

  it('renders the card with name and image', () => {
    // Act
    const imageElement = screen.getByTestId('image');
    const nameElement = screen.getByText('Fluffy');

    // Assert
    expect(imageElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });

  it('displays the correct per name', () => {
    // Act
    const speciesElement = screen.getByTestId('name');

    // Assert
    expect(speciesElement.innerText).toBe('Fluffy (Cat)');
  });

  it('displays the correct availability status', () => {
    // Act
    const availabilityElement = screen.getByTestId('availability');

    // Assert
    expect(availabilityElement.innerText).toBe('Available: Yes');
  });

  it('displays the correct added date', () => {
    // Act
    const dateElement = screen.getByTestId('date');

    // Assert
    expect(dateElement.innerText).toBe('Date Added: March 9, 2023');
  });
});
