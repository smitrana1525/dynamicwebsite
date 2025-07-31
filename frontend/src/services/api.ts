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
  success: boolean;
  message: string;
  email: string;
  expiresAt: string | null;
  remainingMinutes: number | null;
  otp?: string; // For testing only
}

// File Management Types
export interface FileCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  documentCount: number;
}

export interface FileDocument {
  id: number;
  categoryId: number;
  categoryName: string;
  fileName: string;
  displayName: string;
  fileType: string;
  fileSize: number;
  description: string;
  isActive: boolean;
  uploadDate: string;
  modifiedDate: string;
  uploadedBy: string;
  modifiedBy: string;
  downloadCount: number;
  lastDownloaded?: string;
}

export interface CategoryWithDocuments {
  id: number;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
  documents: FileDocument[];
}

export interface FileDownloadHistory {
  id: number;
  documentId: number;
  documentName: string;
  categoryName: string;
  userGuid: string;
  userName: string;
  userEmail: string;
  downloadDate: string;
  userIP: string;
  userAgent: string;
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
      let errorMessage = `HTTP ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      
      // Add specific error handling for common status codes
      switch (response.status) {
        case 401:
          throw new Error('Unauthorized: Please log in again');
        case 403:
          throw new Error('Forbidden: You do not have permission to perform this action');
        case 404:
          throw new Error('Not found: The requested resource was not found');
        case 500:
          throw new Error('Server error: Please try again later');
        default:
          throw new Error(errorMessage);
      }
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
    try {
      console.log('API Service: Making forgot password request to:', `${API_BASE_URL}/auth/forgot-password`);
      console.log('API Service: Request body:', { Email: email });
      
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email }),
      });
      
      console.log('API Service: Forgot password response status:', response.status);
      console.log('API Service: Forgot password response headers:', response.headers);
      
      const result = await this.handleResponse<OTPResponse>(response);
      console.log('API Service: Forgot password parsed response:', result);
      return result;
    } catch (error) {
      console.error('API Service: Forgot password error:', error);
      throw error;
    }
  }

  async verifyOTP(email: string, otp: string): Promise<{ success: boolean; message: string; email: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email, OTP: otp }),
    });
    return this.handleResponse<{ success: boolean; message: string; email: string }>(response);
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<{ success: boolean; message: string; email: string; redirectToLogin?: boolean }> {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        Email: email, 
        OTP: otp, 
        NewPassword: newPassword, 
        ConfirmPassword: newPassword 
      }),
    });
    return this.handleResponse<{ success: boolean; message: string; email: string; redirectToLogin?: boolean }>(response);
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

  // User profile management endpoints
  async updateUserProfile(id: string, userData: {
    strName?: string;
    strEmailId?: string;
    bolsActive?: boolean;
    strPassword?: string;
  }): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse<User>(response);
  }

  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/user/${id}/change-password`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ 
        CurrentPassword: currentPassword, 
        NewPassword: newPassword 
      }),
    });
    return this.handleResponse<{ message: string }>(response);
  }

  // OAuth endpoints
  getGoogleAuthUrl(): string {
    // Use the backend endpoint that handles the OAuth flow properly
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

  // File Management API methods
  async getAllCategories(): Promise<FileCategory[]> {
    console.log('Making request to:', `${API_BASE_URL}/FileManagement/categories`);
    try {
      const response = await fetch(`${API_BASE_URL}/FileManagement/categories`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // Don't send auth headers for now
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      return this.handleResponse<FileCategory[]>(response);
    } catch (error) {
      console.error('Error in getAllCategories:', error);
      throw error;
    }
  }

  async getCategoryById(id: number): Promise<FileCategory> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/categories/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<FileCategory>(response);
  }

  async getCategoryWithDocuments(id: number): Promise<CategoryWithDocuments> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/categories/${id}/documents`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<CategoryWithDocuments>(response);
  }

  async createCategory(category: {
    name: string;
    description: string;
    icon: string;
    sortOrder: number;
  }): Promise<FileCategory> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/categories`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(category),
    });
    return this.handleResponse<FileCategory>(response);
  }

  async updateCategory(id: number, category: {
    name: string;
    description: string;
    icon: string;
    isActive: boolean;
    sortOrder: number;
  }): Promise<FileCategory> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/categories/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(category),
    });
    return this.handleResponse<FileCategory>(response);
  }

  async deleteCategory(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/categories/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete category with ID ${id}`);
    }
  }

  async getAllDocuments(): Promise<{ category: FileCategory; documents: FileDocument[] }[]> {
    console.log('Making request to:', `${API_BASE_URL}/FileManagement/documents`);
    try {
      const response = await fetch(`${API_BASE_URL}/FileManagement/documents`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // Don't send auth headers for now
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      return this.handleResponse<{ category: FileCategory; documents: FileDocument[] }[]>(response);
    } catch (error) {
      console.error('Error in getAllDocuments:', error);
      throw error;
    }
  }

  async getDocumentsByCategory(categoryId: number): Promise<FileDocument[]> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/documents?categoryId=${categoryId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<FileDocument[]>(response);
  }

  async getDocumentById(id: number): Promise<FileDocument> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/documents/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<FileDocument>(response);
  }

  async uploadDocument(formData: FormData): Promise<FileDocument> {
    const token = localStorage.getItem('token');
    console.log('Upload Document - Token available:', !!token);
    console.log('Upload Document - FormData contents:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    
    const headers: HeadersInit = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    
    console.log('Upload Document - Headers:', headers);
    
    // Don't set Content-Type for FormData - browser will set it automatically with boundary
    const response = await fetch(`${API_BASE_URL}/FileManagement/documents`, {
      method: 'POST',
      headers,
      body: formData,
    });
    
    console.log('Upload Document - Response status:', response.status);
    console.log('Upload Document - Response headers:', response.headers);
    
    return this.handleResponse<FileDocument>(response);
  }

  async updateDocument(id: number, document: {
    displayName: string;
    description: string;
    isActive: boolean;
  }): Promise<FileDocument> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/documents/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(document),
    });
    return this.handleResponse<FileDocument>(response);
  }

  async deleteDocument(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/documents/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete document with ID ${id}`);
    }
  }

  async downloadDocument(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/documents/${id}/download`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to download document with ID ${id}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `document-${id}.pdf`); // You might want to get the actual filename
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  async getDownloadHistory(categoryId?: number, documentId?: number): Promise<FileDownloadHistory[]> {
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId.toString());
    if (documentId) params.append('documentId', documentId.toString());
    
    const response = await fetch(`${API_BASE_URL}/FileManagement/downloads/history?${params.toString()}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<FileDownloadHistory[]>(response);
  }

  async getUserDownloads(): Promise<FileDownloadHistory[]> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/downloads/user`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<FileDownloadHistory[]>(response);
  }

  async getStatistics(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/FileManagement/statistics`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<any>(response);
  }
}

export const apiService = new ApiService(); 