import React, { useState, useEffect } from 'react';
import { apiService, FileCategory, FileDocument } from '../services/api';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  CheckCircle,
  AlertCircle,
  Eye,
  MoreVertical
} from 'lucide-react';

interface DocumentFormData {
  categoryId: number;
  displayName: string;
}

const DocumentUpload: React.FC = () => {
  const [categories, setCategories] = useState<FileCategory[]>([]);
  const [documents, setDocuments] = useState<FileDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<DocumentFormData>({
    categoryId: 0,
    displayName: ''
  });

  useEffect(() => {
    loadCategories();
    loadAllDocuments();
  }, []);

  const loadCategories = async () => {
    try {
      console.log('Loading categories...');
      const data = await apiService.getAllCategories();
      console.log('Received categories:', data);
      setCategories(data);
      if (data.length > 0 && formData.categoryId === 0) {
        setFormData(prev => ({ ...prev, categoryId: data[0].id }));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('Failed to load categories');
    }
  };

  const loadAllDocuments = async () => {
    try {
      setLoading(true);
      console.log('Loading all documents...');
      const data = await apiService.getAllDocuments();
      console.log('Received data from getAllDocuments:', data);
      
      const allDocuments: FileDocument[] = [];
      data.forEach((item: any) => {
        console.log('Processing item:', item);
        if (item.documents) {
          console.log('Found documents in item:', item.documents);
          allDocuments.push(...item.documents);
        }
      });
      
      console.log('Final allDocuments array:', allDocuments);
      setDocuments(allDocuments);
    } catch (error) {
      console.error('Error loading documents:', error);
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      categoryId: categories.length > 0 ? categories[0].id : 0,
      displayName: ''
    });
    setSelectedFile(null);
    setShowUploadForm(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (!allowedTypes.includes(fileExtension)) {
        setError('Invalid file type. Allowed types: PDF, DOC, DOCX, XLS, XLSX, TXT');
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
      
      // Auto-fill display name if empty
      if (!formData.displayName) {
        const displayName = file.name.substring(0, file.name.lastIndexOf('.'));
        setFormData(prev => ({ ...prev, displayName }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    if (!formData.displayName.trim()) {
      setError('Display name is required');
      return;
    }

    if (formData.categoryId === 0) {
      setError('Please select a category');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);
      uploadFormData.append('categoryId', formData.categoryId.toString());
      uploadFormData.append('displayName', formData.displayName);
      uploadFormData.append('description', ''); // Empty description since we removed it

      // Debug logging
      console.log('Upload FormData contents:');
      uploadFormData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      console.log('Selected file:', selectedFile);
      console.log('Form data:', formData);

      await apiService.uploadDocument(uploadFormData);
      setSuccess('Document uploaded successfully!');
      resetForm();
      loadAllDocuments();
    } catch (error) {
      console.error('Error uploading document:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (documentId: number) => {
    if (!window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await apiService.deleteDocument(documentId);
      setSuccess('Document deleted successfully!');
      loadAllDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete document');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDocument = async (documentId: number) => {
    try {
      await apiService.downloadDocument(documentId);
    } catch (error) {
      console.error('Error downloading document:', error);
      setError('Failed to download document');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
          <p className="text-gray-600">Upload and manage documents by category</p>
        </div>
        <Button onClick={() => setShowUploadForm(true)} disabled={loading}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Messages */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-600">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {success && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-600">{success}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upload New Document</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value={0}>Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="file">File *</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  required
                />
                {selectedFile && (
                  <div className="mt-2 p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">
                      Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="displayName">Display Name *</Label>
                <Input
                  id="displayName"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="Enter display name for the document"
                  required
                />
              </div>

              

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !selectedFile}>
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Documents List */}
      {loading && !showUploadForm ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading documents...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Documents ({documents.length})</CardTitle>
            <CardDescription>Manage uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            {documents.length > 0 ? (
              <div className="space-y-3">
                {documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{document.displayName}</p>
                        <p className="text-sm text-gray-500">
                          {document.categoryName} • {document.fileType.toUpperCase()} • 
                          {formatFileSize(document.fileSize)} • 
                          {new Date(document.uploadDate).toLocaleDateString()}
                        </p>
                        {document.description && (
                          <p className="text-sm text-gray-400 mt-1">{document.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">
                        {document.downloadCount} downloads
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadDocument(document.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteDocument(document.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No documents found</p>
                <p className="text-sm text-gray-400 mt-2">Upload your first document to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload; 