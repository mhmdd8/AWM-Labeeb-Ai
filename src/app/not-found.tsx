export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
