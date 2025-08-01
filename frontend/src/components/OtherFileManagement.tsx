import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  FileText,
  AlertCircle,
  Building,
  UserCheck,
  Plus,
  X
} from 'lucide-react';
import { otherFileService, OtherFile, OtherFileUploadDTO } from '../services/otherFileService';

const OtherFileManagement: React.FC = () => {
  const [otherFiles, setOtherFiles] = useState<OtherFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<OtherFile[]>([]);
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState<{
    title: string;
    description: string;
    fileType: string;
    file: File | null;
  }>({
    title: '',
    description: '',
    fileType: 'Investor Charter Booking',
    file: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const fileTypes = [
    'Investor Charter Booking',
    'Investor Complaint',
    'AP Branch Details',
    'KMP Details'
  ];

  const fileTypeIcons = {
    'Investor Charter Booking': FileText,
    'Investor Complaint': AlertCircle,
    'AP Branch Details': Building,
    'KMP Details': UserCheck
  };

  useEffect(() => {
    loadOtherFiles();
  }, []);

  useEffect(() => {
    filterFiles();
  }, [otherFiles, selectedFileType, searchTerm]);

  const loadOtherFiles = async () => {
    try {
      const files = await otherFileService.getAllOtherFiles();
      setOtherFiles(files);
    } catch (error) {
      console.error('Error loading other files:', error);
      setError('Failed to load other files');
    }
  };

  const filterFiles = () => {
    let filtered = otherFiles;

    // Filter by file type
    if (selectedFileType !== 'all') {
      filtered = filtered.filter(file => file.fileType === selectedFileType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredFiles(filtered);
  };

  const handleUpload = async () => {
    if (!uploadData.title.trim() || !uploadData.file) {
      setError('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const uploadDto: OtherFileUploadDTO = {
        title: uploadData.title,
        description: uploadData.description || undefined,
        fileType: uploadData.fileType,
        file: uploadData.file
      };

      await otherFileService.uploadOtherFile(uploadDto);
      
      // Reset form
      setUploadData({
        title: '',
        description: '',
        fileType: 'Investor Charter Booking',
        file: null
      });
      setIsUploadModalOpen(false);
      
      // Reload files
      await loadOtherFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (id: number) => {
    try {
      await otherFileService.downloadOtherFile(id);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Failed to download file');
    }
  };

  const handleShow = async (id: number) => {
    try {
      await otherFileService.showOtherFile(id);
    } catch (error) {
      console.error('Error showing file:', error);
      setError('Failed to show file');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      await otherFileService.deleteOtherFile(id);
      await loadOtherFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      setError('Failed to delete file');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Other Files Management</h2>
          <p className="text-gray-600 dark:text-slate-400">Manage and upload important documents and forms</p>
        </div>
        <Button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Upload File</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* File Type Filter */}
            <div className="flex-1">
              <Label htmlFor="fileType" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                File Type
              </Label>
              <select
                id="fileType"
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                {fileTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                Search Files
              </Label>
              <div className="mt-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Files List */}
      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/20">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Files ({filteredFiles.length})
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-slate-400">
            {selectedFileType === 'all' ? 'All file types' : selectedFileType}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No files found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                {selectedFileType === 'all' 
                  ? 'Get started by uploading a new file.'
                  : `No files found for ${selectedFileType}.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFiles.map((file) => {
                const IconComponent = fileTypeIcons[file.fileType as keyof typeof fileTypeIcons] || FileText;
                return (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {file.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                          {file.fileType}
                        </p>
                        {file.description && (
                          <p className="text-xs text-gray-600 dark:text-slate-300 mt-1">
                            {file.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-slate-400">
                          <span>{formatDate(file.createdDate)}</span>
                          {file.fileDocument && (
                            <>
                              <span>{file.fileDocument.fileType.toUpperCase()}</span>
                              <span>{formatFileSize(file.fileDocument.fileSize)}</span>
                              <span>{file.fileDocument.downloadCount} downloads</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShow(file.id)}
                        className="border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(file.id)}
                        className="border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(file.id)}
                        className="border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upload New File</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="uploadTitle" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  Title *
                </Label>
                <Input
                  id="uploadTitle"
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  placeholder="Enter file title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="uploadDescription" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  Description
                </Label>
                <textarea
                  id="uploadDescription"
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  placeholder="Enter file description (optional)"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="uploadFileType" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  File Type *
                </Label>
                <select
                  id="uploadFileType"
                  value={uploadData.fileType}
                  onChange={(e) => setUploadData({ ...uploadData, fileType: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  {fileTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="uploadFile" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  File *
                </Label>
                <Input
                  id="uploadFile"
                  type="file"
                  onChange={(e) => setUploadData({ ...uploadData, file: e.target.files?.[0] || null })}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX, TXT
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsUploadModalOpen(false)}
                className="border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex items-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherFileManagement; 