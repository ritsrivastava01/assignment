interface ErrorDisplayProps {
  message: string;
}

export function generateMetadata() {
  return {
    title: 'Error',
    description: 'An error occurred while processing your request.',
  };
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center m-auto py-2">
      <h1 className="text-4xl font-bold text-red-800 mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-8">
        {message ? <>{message}</> : 'We encountered an error. Please try again later.'}
      </p>

      <div className="mt-8 text-sm text-dark-gray">
        <p>If the problem persists, please contact support.</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
