import { BasePetSchema } from './pets';

describe('Pet Schemas', () => {
  it('should validate a valid BasePetSchema object', () => {
    const validPet = {
      id: 1,
      dateAdded: '01-11-2022',
      name: 'Buddy',
      photoUrl: 'http://example.com/photo.jpg',
      species: 'Dog',
      available: 'yes',
      birthYear: 2018,
    };

    const result = BasePetSchema.safeParse(validPet);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.dateAdded).toBeInstanceOf(Date);
      expect(result.data.available).toBe(true);
    }
  });

  describe('Error handling', () => {
    it('should throw an error when the date is invalid', () => {
      const invalidPet = {
        id: 1,
        dateAdded: 'invalid-date',
        name: 'Buddy',
      };
      const result = BasePetSchema.safeParse(invalidPet);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid Date');
      }
    });

    it('should valid BasePetSchema object', () => {
      const invalidPet = {
        id: 'one', // id should be a number
        dateAdded: '01-01-2020', // Wrong date format
        name: 'Buddy',
        photoUrl: 'http://example.com/photo.jpg',
        species: 'Dog',
        available: 'yes',
        birthYear: 2018,
      };
      const result = BasePetSchema.safeParse(invalidPet);
      expect(result.success).toBe(false);
    });

    it('should validate the species enum', () => {
      const invalidPet = {
        id: 'one', // id should be a number
        dateAdded: '01-01-2020', // Wrong date format
        name: 'Buddy',
        photoUrl: 'http://example.com/photo.jpg',
        species: 'snake',
        available: 'yes',
        birthYear: 2018,
      };
      const result = BasePetSchema.safeParse(invalidPet);
      expect(result.success).toBe(false);
    });
  });
});
