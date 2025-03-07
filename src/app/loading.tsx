import React from 'react';

import { PageLayout } from '@/components/PageLayout';

interface LoadingPageProps {
  message?: string;
}

const Loading: React.FC<LoadingPageProps> = ({ message }) => {
  return (
    <PageLayout>
      <div className="h-full flex flex-col items-center justify-center py-2">
        <div className="animate-spin rounded-full h-16 w-16 border-t-1 border-b-1 border-dark-gray mb-4"></div>
        <p className="text-2xl text-gray-600">{message ?? 'Loading...'}</p>
      </div>
    </PageLayout>
  );
};

export default Loading;
