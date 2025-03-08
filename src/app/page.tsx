import { Suspense } from 'react';

import { Card } from '@/components/Card';
import NoPetFound from '@/components/NoPetFound';
import { PageLayout } from '@/components/PageLayout';
import { fetchPets } from '@/services/pet.service';

import Filters from '@/components/Filters';
import Loading from './loading';

export default async function Home() {
  const result = await fetchPets();

  if (!result.success) {
    throw new Error('Error on loading pets');
  }
  const pets = result.data;
  if (!pets || pets.length === 0) {
    return <NoPetFound />;
  }

  return (
    <PageLayout>
      <Suspense fallback={<Loading />}>
        <h1 className="text-5xl font-bold py-8">Pets</h1>
        <Filters />
        <h2 className="text-4xl font-bold py-8">Results</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 md:gap-28 gap-3">
          {pets.map(pet => (
            <Card key={pet.id} {...pet} />
          ))}
        </div>
      </Suspense>
    </PageLayout>
  );
}
