import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const OAuthCallback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { clearError } = useAuth();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        clearError();
        
        // Check if we're returning from OAuth
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const provider = urlParams.get('provider');
        const isNewUser = urlParams.get('isNewUser') === 'true';
        const error = urlParams.get('error');

        if (error) {
          setStatus('error');
          setMessage(error);
          return;
        }

        if (!token) {
          setStatus('error');
          setMessage('No authentication token received');
          return;
        }

        // Store the token and redirect to dashboard
        localStorage.setItem('token', token);
        
        // Try to get user info from the token
        try {
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          const user = {
            strGUID: tokenPayload.UserId || tokenPayload.nameid || '',
            strName: tokenPayload.Name || tokenPayload.name || 'User',
            strEmailId: tokenPayload.Email || tokenPayload.email || '',
            bolsActive: true,
            createDate: new Date().toISOString(),
            ModifyDate: new Date().toISOString(),
            AuthProvider: provider || 'oauth'
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('refreshToken', 'oauth'); // Set a dummy refresh token for OAuth
        } catch (error) {
          console.error('Error parsing token:', error);
        }

        setStatus('success');
        setMessage(
          isNewUser 
            ? `Welcome! Your ${provider} account has been successfully created.`
            : `Welcome back! You've successfully signed in with ${provider}.`
        );

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);

      } catch (error) {
        setStatus('error');
        setMessage('An error occurred during authentication');
        console.error('OAuth callback error:', error);
      }
    };

    handleOAuthCallback();
  }, [navigate, clearError]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'error':
        return <XCircle className="h-8 w-8 text-red-600" />;
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case 'loading':
        return 'Processing Authentication...';
      case 'success':
        return 'Authentication Successful!';
      case 'error':
        return 'Authentication Failed';
    }
  };

  const getStatusDescription = () => {
    switch (status) {
      case 'loading':
        return 'Please wait while we complete your sign-in process.';
      case 'success':
        return message || 'You will be redirected to your dashboard shortly.';
      case 'error':
        return message || 'Please try signing in again.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            {getStatusIcon()}
          </div>
          <CardTitle className="text-2xl font-bold">
            {getStatusTitle()}
          </CardTitle>
          <CardDescription className="text-center">
            {getStatusDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === 'error' && (
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Return to Login
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthCallback; 