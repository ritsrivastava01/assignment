import { PageLayout } from '@/components/PageLayout';

const NoPet = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">No Pet Found</h1>
        <p className="text-lg text-gray-600 mb-8">There is no pet to show.</p>
      </div>
    </PageLayout>
  );
};

export default NoPet;
