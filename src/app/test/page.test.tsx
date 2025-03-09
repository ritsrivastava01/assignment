import { render, screen } from '@testing-library/react';
import type { Mock} from 'vitest';
import { vi } from 'vitest';

import { fetchPets } from '@/services/pet.service';

import Home from '../page';

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
