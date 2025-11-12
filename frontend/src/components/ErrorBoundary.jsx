import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error }) => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/dashboard');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-strong p-8 rounded-xl max-w-md w-full text-center">
        <div className="w-20 h-20 bg-danger/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-danger" size={40} />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Oops! Qualcosa è andato storto</h1>
        <p className="text-gray-400 mb-6">
          Si è verificato un errore imprevisto. Per favore riprova.
        </p>
        
        {process.env.NODE_ENV === 'development' && error && (
          <div className="glass-light p-4 rounded-lg mb-6 text-left">
            <p className="text-xs text-gray-400 font-mono break-all">
              {error.toString()}
            </p>
          </div>
        )}
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleReload}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Ricarica Pagina
          </button>
          <button
            onClick={handleGoHome}
            className="btn-glass flex items-center gap-2"
          >
            <Home size={18} />
            Torna alla Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;



