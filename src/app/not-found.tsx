import { PageLayout } from '@/components/PageLayout';

export function generateMetadata() {
  return {
    title: '404 - Not Found',
    description: 'The page you are looking for does not exist.',
  };
}
const NotFound = () => {
  return (
    <PageLayout className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center flex-grow py-2">
        <h1 data-testid="not-found-title" className="text-6xl font-bold text-gray-800 mb-4">
          404 - Not Found
        </h1>
        <p data-testid="not-found-message" className="text-lg text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
      </div>
    </PageLayout>
  );
};

export default NotFound;
