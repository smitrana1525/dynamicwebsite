import { FileDocument } from './api';

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
  fileDocument?: FileDocument;
}

export interface OtherFileCreateDTO {
  title: string;
  description?: string;
  fileType: string;
}

export interface OtherFileUploadDTO {
  title: string;
  description?: string;
  fileType: string;
  file: File;
}

const baseUrl = 'https://localhost:7222/api/otherfile';

export const otherFileService = {
  // Get all other files
  async getAllOtherFiles(): Promise<OtherFile[]> {
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch other files');
    }

    return response.json();
  },

  // Get other files by type
  async getOtherFilesByType(fileType: string): Promise<OtherFile[]> {
    const response = await fetch(`${baseUrl}/${encodeURIComponent(fileType)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch other files by type');
    }

    return response.json();
  },

  // Upload other file
  async uploadOtherFile(otherFile: OtherFileUploadDTO): Promise<OtherFile> {
    const formData = new FormData();
    formData.append('title', otherFile.title);
    if (otherFile.description) {
      formData.append('description', otherFile.description);
    }
    formData.append('fileType', otherFile.fileType);
    formData.append('file', otherFile.file);

    const response = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload other file: ${errorText}`);
    }

    return response.json();
  },

  // Download other file
  async downloadOtherFile(id: number): Promise<void> {
    const response = await fetch(`${baseUrl}/download/${id}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = response.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'download';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Show other file
  async showOtherFile(id: number): Promise<void> {
    const response = await fetch(`${baseUrl}/show/${id}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to show file');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    window.URL.revokeObjectURL(url);
  },

  // Delete other file
  async deleteOtherFile(id: number): Promise<void> {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete other file');
    }
  }
}; 