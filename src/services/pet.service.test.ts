import { PetsApi } from '@/generated'; // Adjust the import path

import { apiResponse, rawApiResponse } from './mock';
import { fetchPets } from './pet.service'; // Adjust the import path

interface MockPetsApi {
  petsGet: ReturnType<typeof vi.fn>;
}
vi.mock('@/generated', () => {
  const mockPetsApi: MockPetsApi = {
    petsGet: vi.fn(),
  };
  return {
    Configuration: vi.fn(),
    PetsApi: vi.fn(() => mockPetsApi),
  };
});

describe('fetchPets', () => {
  let petsApiMock: MockPetsApi;

  beforeEach(() => {
    petsApiMock = new PetsApi() as unknown as MockPetsApi;
  });
  it('should return successful response with parsed data', async () => {
    // Arrange
    petsApiMock.petsGet.mockResolvedValue({ data: rawApiResponse });

    // Act
    const result = await fetchPets('test');

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toEqual(apiResponse);
    expect(petsApiMock.petsGet).toHaveBeenCalledWith('test', 'name');
  });

  describe('Error handling', () => {
    describe('API call', () => {
      it('should return error response when API call fails', async () => {
        // Arrange
        const errorMessage = 'API error';
        petsApiMock.petsGet.mockRejectedValue(new Error(errorMessage));

        // Act
        const result = await fetchPets('test');

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe(errorMessage);
      });
    });
    describe('when Zod parsing fails', () => {
      it('should return error response', async () => {
        // Arrange
        const invalidData = [{ id: 'invalid', name: 'Buddy', species: 'snake' }]; // 'id' should be a number
        const mockResponse = { data: invalidData };
        petsApiMock.petsGet.mockResolvedValue(mockResponse);

        // Act
        const result = await fetchPets('test');

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toContain('Zod parsing error');
      });
    });
    it('should handle unexpected errors', async () => {
      // Arrange
      petsApiMock.petsGet.mockRejectedValue('Unexpected error');

      // Act
      const result = await fetchPets('test');

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('An unexpected error occurred.');
    });

    it('should handle empty response data', async () => {
      // Arrange
      const emptyResponse = { data: [] };
      petsApiMock.petsGet.mockResolvedValue(emptyResponse);

      // Act
      const result = await fetchPets('test');

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it('should handle null response data', async () => {
      // Arrange
      const nullResponse = { data: null };
      petsApiMock.petsGet.mockResolvedValue(nullResponse);

      // Act
      const result = await fetchPets('test');

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Zod parsing error');
    });
  });
});
