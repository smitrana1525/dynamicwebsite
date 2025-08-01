import React, { useState, useEffect } from 'react';
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
  Plus, 
  Search, 
  Filter,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import { circularService, Circular } from '../services/circularService';

const CircularManagement: React.FC = () => {
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: ''
  });

  // Load circulars on component mount and subscribe to changes
  useEffect(() => {
    loadCirculars();
    
    // Subscribe to changes in the shared service
    const unsubscribe = circularService.subscribe(() => {
      loadCirculars();
    });
    
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const loadCirculars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load circulars from the shared service
      const circularsData = await circularService.getCirculars();
      setCirculars(circularsData);
    } catch (error) {
      console.error('Error loading circulars:', error);
      setError('Failed to load circulars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please select a PDF file only.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB.');
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadData.title.trim()) {
      setError('Please select a file and enter a title.');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
             // Add circular to the shared service
       const newCircular = await circularService.addCircular({
         title: uploadData.title,
         description: uploadData.description,
         fileName: selectedFile.name,
         displayName: uploadData.title,
         fileType: '.pdf',
         fileSize: selectedFile.size,
         uploadDate: new Date().toISOString(),
         isActive: true,
         downloadCount: 0
       }, selectedFile);
      
      setSuccess('Circular uploaded successfully!');
      
             // Reset form
       setSelectedFile(null);
       setUploadData({ title: '', description: '' });
       setShowUploadModal(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error uploading circular:', error);
      setError('Failed to upload circular. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleShow = async (circular: Circular) => {
    try {
      const showUrl = await circularService.showFile(circular.id);
      window.open(showUrl, '_blank');
    } catch (err) {
      console.error('Show failed:', err);
      setError('Failed to open circular. Please try again.');
    }
  };

  const handleDownload = async (circular: Circular) => {
    try {
      await circularService.downloadFile(circular.id);
      setSuccess(`Downloading ${circular.displayName}...`);
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      console.error('Error downloading circular:', error);
      setError('Failed to download circular. Please try again.');
    }
  };

  const handleDelete = async (circularId: number) => {
    if (!window.confirm('Are you sure you want to delete this circular? This action cannot be undone.')) {
      return;
    }

    try {
      // Simulate delete process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Delete from shared service
      const success = await circularService.deleteCircular(circularId);
      if (success) {
        setSuccess('Circular deleted successfully!');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Failed to delete circular.');
      }
    } catch (error) {
      console.error('Error deleting circular:', error);
      setError('Failed to delete circular. Please try again.');
    }
  };

  const formatFileSize = (bytes: number): string => {
    return circularService.formatFileSize(bytes);
  };

  const formatDate = (dateString: string): string => {
    return circularService.formatDate(dateString);
  };

  const filteredCirculars = circulars.filter(circular =>
    circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    circular.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Important Circulars</h1>
          <p className="text-gray-600">Manage and upload important regulatory circulars and updates</p>
        </div>
        <Button onClick={() => setShowUploadModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Upload Circular
        </Button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-green-700">{success}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search circulars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading circulars...</p>
          </CardContent>
        </Card>
      )}

      {/* Circulars List */}
      {!loading && (
        <Card>
          <CardHeader>
            <CardTitle>Circulars ({filteredCirculars.length})</CardTitle>
            <CardDescription>
              Important regulatory circulars and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredCirculars.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No circulars found</p>
                <p className="text-sm text-gray-400 mt-2">
                  {searchTerm ? 'Try adjusting your search terms' : 'Upload your first circular to get started'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCirculars.map((circular) => (
                  <div key={circular.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                                                 <h3 className="font-medium text-gray-900">{circular.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{circular.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{circular.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(circular.uploadDate)}
                          </span>
                          <span>{circular.fileType.toUpperCase()}</span>
                          <span>{formatFileSize(circular.fileSize)}</span>
                          <span>{circular.downloadCount} downloads</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShow(circular)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Show
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(circular)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(circular.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Upload Circular</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUploadModal(false)}
              >
                ×
              </Button>
            </div>

                         <div className="space-y-4">
               <div>
                 <Label htmlFor="title">Circular Title *</Label>
                <Input
                  id="title"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                  placeholder="Enter circular title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={uploadData.description}
                  onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                  placeholder="Enter circular description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="file">PDF File *</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum file size: 10MB. Only PDF files are allowed.
                </p>
              </div>

              {selectedFile && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Selected File:</p>
                  <p className="text-sm text-blue-700">{selectedFile.name}</p>
                  <p className="text-xs text-blue-600">{formatFileSize(selectedFile.size)}</p>
                </div>
              )}

              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowUploadModal(false)}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                                 <Button
                   onClick={handleUpload}
                   disabled={uploading || !selectedFile || !uploadData.title.trim()}
                 >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularManagement; 