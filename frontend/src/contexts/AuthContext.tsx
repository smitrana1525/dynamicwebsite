import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User, AuthResponse } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('AuthProvider: Current state - user:', user, 'isLoading:', isLoading, 'error:', error);

  // Helper to get cookie value
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  }

  useEffect(() => {
    console.log('AuthProvider: Initializing auth state');
    // Check if user is already logged in
    const token = getCookie('moneycareath') || localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const refreshToken = localStorage.getItem('refreshToken');
    
    console.log('AuthProvider: Stored data - token:', !!token, 'userData:', !!userData, 'refreshToken:', !!refreshToken);
    
    if (token && userData && refreshToken) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('AuthProvider: Setting user from localStorage:', parsedUser);
        setUser(parsedUser);
        
        // Check if token is expired and refresh if needed
        const tokenExp = JSON.parse(atob(token.split('.')[1])).exp * 1000;
        if (Date.now() >= tokenExp) {
          refreshTokenFromStorage();
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        clearStoredAuth();
      }
    }
    setIsLoading(false);
  }, []);

  // Watch for user state changes
  useEffect(() => {
    console.log('AuthProvider: User state changed to:', user);
  }, [user]);

  const clearStoredAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  const refreshTokenFromStorage = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiService.refreshToken(refreshToken);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearStoredAuth();
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Starting login process');
      setIsLoading(true);
      setError(null);
      
      console.log('AuthContext: Calling API service');
      const response = await apiService.login({ Email: email, Password: password });
      console.log('AuthContext: API response received:', response);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log('AuthContext: Setting user state:', response.user);
      setUser(response.user);
      
      console.log('AuthContext: Login completed successfully');
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.register({ 
        Name: name, 
        Email: email, 
        Password: password, 
        ConfirmPassword: confirmPassword 
      });
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      clearStoredAuth();
      setUser(null);
    }
  };

  const refreshToken = async () => {
    await refreshTokenFromStorage();
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    refreshToken,
    isLoading,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 