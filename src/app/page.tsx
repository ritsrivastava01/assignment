import { Suspense } from 'react';

import Card from '@/components/Card';
import Filters from '@/components/Filters';
import NoPetFound from '@/components/NoPetFound';
import { PageLayout } from '@/components/PageLayout';
import { fetchPets } from '@/services/pet.service';

import Loading from './loading';

export function generateMetadata({ searchParams }: HomeProps) {
  const { species } = searchParams;

  const title = species ? `Pets - ${species.charAt(0).toUpperCase() + species.slice(1)}` : 'Pets';
  const description = species
    ? `Browse our collection of ${species} available for adoption.`
    : 'Browse our collection of pets available for adoption.';

  return {
    title,
    description,
    other: {
      pageType: 'Awesome Pets',
    },
  };
}

type HomeProps = {
  readonly searchParams: { species: string; sort: string };
};

export default async function Home({ searchParams }: HomeProps) {
  const { species, sort } = searchParams;

  const result = await fetchPets(species);

  if (!result.success) {
    throw new Error('Error on loading pets');
  }
  const pets = result.data;

  if (!pets || pets.length === 0) {
    return <NoPetFound />;
  }
  if (sort === 'latestAdded') {
    pets.sort((a, b) => {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  }

  return (
    <PageLayout>
      <h1 className="text-3xl md:text-4xl font-bold py-8">Pets</h1>
      <section aria-label="filter the pets by species">
        <Filters />
      </section>
      <h2 className="text-2xl md:text-3xl font-bold py-8">Results</h2>
      <Suspense fallback={<Loading aria-live="polite" aria-busy="true" />}>
        <ul
          aria-label="Pet list sorted by name"
          className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-4"
          aria-live="polite"
          data-testid="pets"
        >
          {pets.map(pet => (
            <li key={pet.id}>
              <Card {...pet} />
            </li>
          ))}
        </ul>
      </Suspense>
    </PageLayout>
  );
}
