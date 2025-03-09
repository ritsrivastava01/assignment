'use client';

import { PageLayout } from '@/components/PageLayout';

interface ErrorBoundaryProps {
  readonly error: Error;
}

export default function ErrorBoundary({ error: { message } }: ErrorBoundaryProps) {
  return (
    <PageLayout>
      <div className="flex h-full flex-col items-center justify-center m-auto py-2">
        <h1 className="text-4xl font-bold text-red-600 mb-4" data-testid="error-title">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg mb-8" data-testid="error-message">
          {message ? <>{message}</> : 'We encountered an error. Please try again later.'}
        </p>

        <div className="mt-8 text-sm text-gray-500">
          <p>If the problem persists, please contact support.</p>
        </div>
      </div>
    </PageLayout>
  );
}
