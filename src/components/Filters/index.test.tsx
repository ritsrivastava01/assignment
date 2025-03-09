import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

import Filters from './index';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/schemas/pets', () => ({
  SpeciesEnum: {
    enum: {
      dog: 'dog',
      cat: 'cat',
      bat: 'bat',
    },
  },
}));

describe('Filters Component', () => {
  const mockPush = vi.fn();
  const mockPathname = '/';
  const mockSearchParams = {
    get: vi.fn(),
    entries: vi.fn(() => []),
  };

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    (usePathname as Mock).mockReturnValue(mockPathname);
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render species select with options', () => {
    // Arrange
    render(<Filters />);

    // Act
    const selectElement = screen.getByTestId('species-select');
    const options = screen.getAllByRole('option');

    // Assert
    expect(selectElement).toBeInTheDocument();
    expect(options).toHaveLength(4);
  });

  describe('when species is selected', () => {
    test('should update URL when species is selected', () => {
      // Arrange
      render(<Filters />);
      const selectElement = screen.getByTestId('species-select');

      // Act
      fireEvent.change(selectElement, { target: { value: 'dog' } });

      // Assert
      expect(mockPush).toHaveBeenCalledWith(`${mockPathname}?species=dog`);
    });
  });

  describe('when "Latest Added" link is clicked', () => {
    test('should update URL and add latestAdded parameter', () => {
      // Arrange
      render(<Filters />);
      const linkElement = screen.getByTestId('sort-latest-added');

      // Act
      fireEvent.click(linkElement);

      // Assert
      expect(linkElement).toHaveAttribute('href', `${mockPathname}?sort=latestAdded`);
    });
  });
});
