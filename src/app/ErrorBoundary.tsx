import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError?: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultFallback;
      return <FallbackComponent error={this.state.error} resetError={() => this.setState({ hasError: false, error: undefined })} />;
    }

    return this.props.children;
  }
}

const DefaultFallback: React.FC<{ error?: Error; resetError?: () => void }> = ({ error, resetError }) => (
  <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
      {error && (
        <div className="mb-4 text-left">
          <p className="font-semibold">Error:</p>
          <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">{error.message}</pre>
        </div>
      )}
      <button
        onClick={resetError}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
      <p className="mt-4 text-gray-600 text-sm">
        If the problem persists, please refresh the page or contact support.
      </p>
    </div>
  </div>
);

export default ErrorBoundary;