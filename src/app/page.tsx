import { Suspense } from 'react';

import { Card } from '@/components/Card';
import { PageLayout } from '@/components/PageLayout';
import { fetchPets } from '@/services/pet.service';

import NoPetFound from '@/components/NoPetFound';
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
        <h1>Pets</h1>

        <h2>Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-28">
          {pets.map(pet => (
            <Card key={pet.id} name={pet.name} image={pet.photoUrl} />
          ))}
        </div>
      </Suspense>
    </PageLayout>
  );
}
