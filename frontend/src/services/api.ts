const API_BASE_URL = 'https://localhost:7222/api';

export interface User {
  strGUID: string;
  strName: string;
  strEmailId: string;
  bolsActive: boolean;
  createDate: string;
  modifyDate: string;
  authProvider: string;
}

export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface RegisterRequest {
  Name: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
}

export interface ForgotPasswordRequest {
  Email: string;
}

export interface VerifyOTPRequest {
  Email: string;
  OTP: string;
}

export interface ResetPasswordRequest {
  Email: string;
  OTP: string;
  NewPassword: string;
  ConfirmPassword: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  authProvider: string;
  isNewUser: boolean;
  message: string;
}

export interface OTPResponse {
  Success: boolean;
  Message: string;
  Email: string;
  ExpiresAt: string;
  RemainingMinutes: number;
  OTP: string; // For testing only
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  private async handleFetchError(error: any): Promise<never> {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please check if the backend is running.');
    }
    throw error;
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('API Service: Making login request to:', `${API_BASE_URL}/auth/login`);
      console.log('API Service: Request body:', credentials);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include' // Ensure cookies are sent/received
      });
      
      console.log('API Service: Response status:', response.status);
      console.log('API Service: Response headers:', response.headers);
      
      const result = await this.handleResponse<AuthResponse>(response);
      console.log('API Service: Parsed response:', result);
      return result;
    } catch (error) {
      console.error('API Service: Login error:', error);
      return this.handleFetchError(error);
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return this.handleResponse<AuthResponse>(response);
    } catch (error) {
      return this.handleFetchError(error);
    }
  }

  async forgotPassword(email: string): Promise<OTPResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email }),
    });
    return this.handleResponse<OTPResponse>(response);
  }

  async verifyOTP(email: string, otp: string): Promise<{ Success: boolean; Message: string; Email: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email, OTP: otp }),
    });
    return this.handleResponse<{ Success: boolean; Message: string; Email: string }>(response);
  }

  async resetPassword(email: string, otp: string, newPassword: string, confirmPassword: string): Promise<{ Success: boolean; Message: string; Email: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        Email: email, 
        OTP: otp, 
        NewPassword: newPassword, 
        ConfirmPassword: confirmPassword 
      }),
    });
    return this.handleResponse<{ Success: boolean; Message: string; Email: string }>(response);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ RefreshToken: refreshToken }),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async logout(): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<{ message: string }>(response);
  }

  async getProfile(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<User>(response);
  }

  // OAuth endpoints
  getGoogleAuthUrl(): string {
    return `${API_BASE_URL}/auth/google`;
  }

  // User management endpoints
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<User[]>(response);
  }

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<User>(response);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse<User>(response);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<{ message: string }>(response);
  }
}

export const apiService = new ApiService(); 