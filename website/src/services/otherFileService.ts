// Other Files service for website
const API_BASE_URL = 'https://localhost:7222/api';

export interface OtherFile {
  id: number;
  title: string;
  description?: string;
  fileType: string;
  isActive: boolean;
  createdDate: string;
  modifiedDate?: string;
  createdBy?: string;
  modifiedBy?: string;
  fileDocument?: {
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
  };
}

class OtherFileService {
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
      console.error('Other Files API request failed:', error);
      throw error;
    }
  }

  // Get all other files
  async getAllOtherFiles(): Promise<OtherFile[]> {
    return this.makeRequest<OtherFile[]>('/otherfile');
  }

  // Get other files by type
  async getOtherFilesByType(fileType: string): Promise<OtherFile[]> {
    return this.makeRequest<OtherFile[]>(`/otherfile/${encodeURIComponent(fileType)}`);
  }

  // Show other file (view in browser)
  async showOtherFile(id: number): Promise<string> {
    return `${API_BASE_URL}/otherfile/show/${id}`;
  }

  // Download other file
  async downloadOtherFile(id: number): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/otherfile/download/${id}`, {
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

  // Format file size
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Format date
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

export const otherFileService = new OtherFileService(); 