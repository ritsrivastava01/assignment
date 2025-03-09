'use server';

import type { z } from 'zod';

import { Configuration, PetsApi } from '@/generated';

import type { BasePetSchema } from '../schemas/pets';
import { GetPetsResponseSchema } from '../schemas/pets';

const configuration = new Configuration({
  basePath: process.env.API_BASE_URL,
});
const api = new PetsApi(configuration);

type Pets = z.infer<typeof BasePetSchema>;
interface FetchPetsResponse {
  success: boolean;
  data?: Pets[];
  error?: string;
}

/**
 * Fetches pets based on the search query.
 * @param searchQuery - The search query to filter pets.
 * @returns A promise that resolves to a FetchPetsResponse object.
 */
export async function fetchPets(searchQuery: string): Promise<FetchPetsResponse> {
  try {
    const response = await api.petsGet(searchQuery, 'name');
    const parsedResult = GetPetsResponseSchema.safeParse(response.data);

    if (!parsedResult.success) {
      const errorMessages = parsedResult.error.issues.map(issue => issue.message).join(', ');
      return { success: false, error: `Zod parsing error: ${errorMessages}` };
    }

    return { success: true, data: parsedResult.data };
  } catch (error) {
    console.error('Error fetching pets:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred.',
    };
  }
}
