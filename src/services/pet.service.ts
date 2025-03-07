'use server';

import type { z } from 'zod';

import { Configuration } from '@/generated';

import type { BasePetSchema } from '../schemas/pets';
import { GetPetsResponseSchema } from '../schemas/pets';

const configuration = new Configuration({
  basePath: process.env.API_BASE_URL,
});

export type Pet = z.infer<typeof BasePetSchema>;

export async function fetchPets(): Promise<{ success: boolean; data?: Pet[]; error?: string }> {
  configuration;
  try {
    console.log('Fetching pets from API...');
    // eslint-disable-next-line compat/compat
    const response = await fetch(`${configuration.basePath}/pets`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const parsedResult = GetPetsResponseSchema.safeParse(data);

    if (!parsedResult.success) {
      // Zod parsing error
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
