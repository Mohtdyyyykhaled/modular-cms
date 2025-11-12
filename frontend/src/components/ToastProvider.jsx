import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        success: {
          iconTheme: {
            primary: '#00BFA6',
            secondary: '#fff',
          },
          style: {
            borderLeft: '4px solid #00BFA6',
          },
        },
        error: {
          iconTheme: {
            primary: '#FF6B6B',
            secondary: '#fff',
          },
          style: {
            borderLeft: '4px solid #FF6B6B',
          },
        },
        loading: {
          iconTheme: {
            primary: '#00BFA6',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default ToastProvider;



