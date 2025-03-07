'use client';

import ErrorDisplay from '@/components/Error/ErrorDisplay';

export default function ErrorBoundary({error}:{error:Error}) {
   return <ErrorDisplay message={error.message}></ErrorDisplay> //<div>{error.message}</div>;
}