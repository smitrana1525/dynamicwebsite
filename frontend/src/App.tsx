import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OAuthCallback from './components/OAuthCallback';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  console.log('ProtectedRoute: user =', user, 'isLoading =', isLoading);

  useEffect(() => {
    if (!isLoading && !user) {
      console.log('ProtectedRoute: No user, navigating to login');
      navigate('/login', { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};

// Simple Login Route - NO competing redirects
const LoginRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  console.log('LoginRoute: user =', user, 'isLoading =', isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is logged in, redirect to dashboard
  if (user) {
    console.log('LoginRoute: User logged in, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // Show login form
  return <Login />;
};

// Root Route Component - handles initial redirect
const RootRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  console.log('RootRoute: user =', user, 'isLoading =', isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    console.log('RootRoute: User logged in, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  } else {
    console.log('RootRoute: No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Default redirects */}
        <Route path="/" element={<RootRoute />} />
        <Route path="*" element={<RootRoute />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
