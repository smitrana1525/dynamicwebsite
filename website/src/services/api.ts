// API service for website backend communication
const API_BASE_URL = 'https://localhost:7222/api'; // Update this to match your backend URL

export interface FileCategory {
  id: number;
  name: string;
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
  icon: string;
  isActive: boolean;
  sortOrder: number;
  documents: FileDocument[];
}

class ApiService {
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all categories
  async getCategories(): Promise<FileCategory[]> {
    return this.makeRequest<FileCategory[]>('/PublicFile/categories');
  }

  // Get documents by category ID
  async getDocumentsByCategory(categoryId: number): Promise<FileDocument[]> {
    return this.makeRequest<FileDocument[]>(`/PublicFile/documents?categoryId=${categoryId}`);
  }

  // Get category with documents
  async getCategoryWithDocuments(categoryId: number): Promise<CategoryWithDocuments> {
    return this.makeRequest<CategoryWithDocuments>(`/PublicFile/categories/${categoryId}/documents`);
  }

  // Get all documents
  async getAllDocuments(): Promise<FileDocument[]> {
    return this.makeRequest<FileDocument[]>('/PublicFile/documents');
  }

  // Download document
  async downloadDocument(documentId: number): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/PublicFile/documents/${documentId}/download`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  // Get file size in human readable format
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const apiService = new ApiService(); 