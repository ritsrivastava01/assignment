import { PageLayout } from '@/components/PageLayout';

const NotFound = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center  py-2">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
      </div>
    </PageLayout>
  );
};

export default NotFound;
