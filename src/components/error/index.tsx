function ErrorBox({ errorDetail }: { errorDetail: Error | null }) {
  return (
    <div
      id="alert-additional-content-2"
      className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <div className="flex items-center">
        <svg
          aria-hidden="true"
          className="mr-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">Error {errorDetail?.name}</h3>
      </div>
      <div className="mb-4 mt-2 text-sm">
        {errorDetail?.message || "Something went wrong"}
      </div>
      <div className="flex">
        <button
          onClick={() => window.location.reload()}
          type="button"
          className="mr-2 inline-flex items-center rounded-lg bg-green-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <svg
            aria-hidden="true"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-0.5 mr-2 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
          </svg>
          Reload
        </button>
      </div>
    </div>
  );
}

export default ErrorBox;
