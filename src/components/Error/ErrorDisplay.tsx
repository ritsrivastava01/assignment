
interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({message}) => {

 
  return (
   <div className="error-page">
      <h1 className="error-title">Oops! Something went wrong.</h1>
      <p className="error-message">
      {message ?<>{message}</>:  "We encountered an error. Please try again later." }
      </p>

      <div className="error-support">
        <p>If the problem persists, please contact support.</p>
      </div>
    </div>
  )
}

export default ErrorDisplay