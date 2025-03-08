import { Suspense } from 'react';

import { Card } from '@/components/Card';
import NoPetFound from '@/components/NoPetFound';
import { PageLayout } from '@/components/PageLayout';
import { fetchPets } from '@/services/pet.service';

import Filters from '@/components/Filters';
import Loading from './loading';

type HomeProps = {
  readonly searchParams: Promise<{ species: string; sort: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { species, sort } = await searchParams;

  console.log(species, sort);

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
      <Suspense fallback={<Loading />}>
        <h1 className="text-3xl md:text-4xl font-bold py-8">Pets</h1>
        <Filters />
        <h2 className="text-2xl md:text-3xl font-bold py-8">Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-4">
          {pets.map(pet => (
            <Card key={pet.id} {...pet} />
          ))}
        </div>
      </Suspense>
    </PageLayout>
  );
}
