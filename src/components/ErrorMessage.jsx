const ErrorMessage = ({ message, retry, small = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${small ? 'py-4' : 'h-screen'}`}>
      <div className={`text-red-500 ${small ? 'text-lg' : 'text-xl'}`}>
        {message || 'An error occurred'}
      </div>
      {retry && (
        <button
          onClick={retry}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;