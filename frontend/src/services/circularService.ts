// Shared circular service for managing circulars across dashboard and website
export interface Circular {
  id: number;
  title: string;
  description: string;
  fileName: string;
  displayName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  isActive: boolean;
  downloadCount: number;
}

class CircularService {
  private baseUrl = 'https://localhost:7222/api/circular';
  private circulars: Circular[] = [];
  private listeners: Array<() => void> = [];

  // Get all circulars from API
  async getCirculars(): Promise<Circular[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.circulars = data;
      return this.circulars.filter(circular => circular.isActive);
    } catch (error) {
      console.error('Error fetching circulars:', error);
      // Return empty array if API fails
      return [];
    }
  }

  // Add a new circular via API
  async addCircular(circular: Omit<Circular, 'id'>, file?: File): Promise<Circular> {
    try {
      const formData = new FormData();
      formData.append('title', circular.title);
      formData.append('description', circular.description);
      
      // Use the actual file if provided, otherwise create a mock file
      if (file) {
        formData.append('file', file);
      } else {
        const mockFile = new File(['mock content'], circular.fileName, { type: 'application/pdf' });
        formData.append('file', mockFile);
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCircular = await response.json();
      this.circulars.unshift(newCircular);
      this.notifyListeners();
      return newCircular;
    } catch (error) {
      console.error('Error adding circular:', error);
      throw error;
    }
  }

  // Delete a circular via API
  async deleteCircular(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const index = this.circulars.findIndex(c => c.id === id);
      if (index !== -1) {
        this.circulars.splice(index, 1);
        this.notifyListeners();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting circular:', error);
      throw error;
    }
  }

  // Update download count via API
  async incrementDownloadCount(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/download`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // The download endpoint will automatically increment the count
      // We need to refresh the data to get the updated count
      await this.getCirculars();
      this.notifyListeners();
    } catch (error) {
      console.error('Error downloading circular:', error);
      throw error;
    }
  }

  // Subscribe to changes
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
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

  // Show file (view in browser)
  async showFile(id: number): Promise<string> {
    return `${this.baseUrl}/${id}/show`;
  }

  // Download file
  async downloadFile(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/download`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `circular-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Refresh data to get updated download count
      await this.getCirculars();
      this.notifyListeners();
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const circularService = new CircularService(); 