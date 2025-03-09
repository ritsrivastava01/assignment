import { render, screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

import { fetchPets } from '@/services/pet.service';

import Home, { generateMetadata } from '../page';

vi.mock('@/services/pet.service');
vi.mock('@/components/Filters', () => ({
  default: () => {
    return <div>Mock component</div>;
  },
}));

vi.mock('@/components/Card', () => ({
  default: () => {
    return <div>Card</div>;
  },
}));

const mockFetchPets = fetchPets as Mock;

describe('Home Page', () => {
  const mockPets = [
    {
      id: 1,
      name: 'Fluffy',
      photoUrl: '/images/fluffy.jpg',
      dateAdded: new Date('2023-03-09'),
      species: 'Cat',
      available: true,
    },
    {
      id: 2,
      name: 'Buddy',
      photoUrl: '/images/buddy.jpg',
      dateAdded: new Date('2023-03-10'),
      species: 'Dog',
      available: false,
    },
  ];
  const searchParams = {
    species: 'dog',
    sort: 'latestAdded',
  };

  beforeEach(() => {
    mockFetchPets.mockResolvedValue({ success: true, data: mockPets });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('generateMetadata', () => {
    describe('when species is provided', () => {
      it('should generate metadata with default title and description', () => {
        const metadata = generateMetadata({ searchParams: { species: '', sort: '' } });

        expect(metadata.title).toBe('Pets');
        expect(metadata.description).toBe('Browse our collection of pets available for adoption.');
        expect(metadata.other).toEqual({ pageType: 'Awesome Pets' });
      });
    });
    describe('when searchParams is provided', () => {
      it('should generate metadata with species title and description', () => {
        const metadata = generateMetadata({ searchParams });

        expect(metadata.title).toBe('Pets - Dog');
        expect(metadata.description).toBe('Browse our collection of dog available for adoption.');
        expect(metadata.other).toEqual({ pageType: 'Awesome Pets' });
      });
    });
  });

  it('renders the page with pets', async () => {
    // Act
    render(await Home({ searchParams: searchParams }));

    // Assert
    expect(screen.getByTestId('pets').children).toHaveLength(2);
  });

  describe('when there are no pets', () => {
    it('displays "No Pet Found"', async () => {
      // Arrange
      mockFetchPets.mockResolvedValueOnce({ success: true, data: [] });

      // Act
      render(await Home({ searchParams: searchParams }));

      // Assert
      expect(screen.getByText('No Pet Found')).toBeInTheDocument();
      expect(screen.queryByTestId('pets')).toBeNull();
    });
  });

  describe('when fetching pets fails', () => {
    it('throws an error', async () => {
      // Arrange
      mockFetchPets.mockResolvedValueOnce({ success: false });
      const mockSearchParams = {
        species: 'dog',
        sort: 'latestAdded',
      };
      // Act & Assert
      await expect(Home({ searchParams: mockSearchParams })).rejects.toThrow(
        'Error on loading pets',
      );
    });
  });
});
