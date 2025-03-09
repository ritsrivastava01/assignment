import * as z from 'zod';

// Define the species enum
export const SpeciesEnum = z.enum(['Dog', 'Cat', 'Rat']);

// Base Pet Schema
export const BasePetSchema = z.object({
  id: z.number(),
  dateAdded: z
    .string()
    .transform(val => {
      const [day, month, year] = val.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      if (isNaN(date.getDate())) {
        return null;
      }
      return date;
    })
    .refine(date => date !== null, { message: 'Invalid Date' }),
  name: z.string(),
  photoUrl: z.string(),
  species: SpeciesEnum,
  // Union of boolean and string to handle 'yes' and 'no' values (as it coming in response)
  available: z.union([z.boolean(), z.string()]).transform(val => {
    if (val.toString().toLowerCase() === 'yes') {
      return true;
    }
    return Boolean(val);
  }),
  birthYear: z.number(),
});

// GetPetsResponse Schema (Array of BasePetSchema)
export const GetPetsResponseSchema = z.array(BasePetSchema);

// GetPetByIdResponse Schema (Single BasePetSchema)
export const GetPetByIdResponseSchema = BasePetSchema;
