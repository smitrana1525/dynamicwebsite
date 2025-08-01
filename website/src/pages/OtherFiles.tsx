import React, { useState, useEffect } from 'react';
import { Download, Eye, FileText, AlertCircle, Building, UserCheck, Search } from 'lucide-react';
import { otherFileService, OtherFile } from '../services/otherFileService';

const OtherFiles: React.FC = () => {
  const [otherFiles, setOtherFiles] = useState<OtherFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<OtherFile[]>([]);
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
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

  const fileTypeDescriptions = {
    'Investor Charter Booking': 'Important documents related to investor charter and booking procedures',
    'Investor Complaint': 'Forms and procedures for filing investor complaints',
    'AP Branch Details': 'Information about AP branch locations and contact details',
    'KMP Details': 'Key Management Personnel information and documents'
  };

  useEffect(() => {
    loadOtherFiles();
  }, []);

  useEffect(() => {
    filterFiles();
  }, [otherFiles, selectedFileType, searchTerm]);

  const loadOtherFiles = async () => {
    try {
      setLoading(true);
      const files = await otherFileService.getAllOtherFiles();
      setOtherFiles(files);
    } catch (error) {
      console.error('Error loading other files:', error);
      setError('Failed to load files. Please try again later.');
    } finally {
      setLoading(false);
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

  const handleDownload = async (id: number) => {
    try {
      await otherFileService.downloadOtherFile(id);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const handleShow = async (id: number) => {
    try {
      await otherFileService.showOtherFile(id);
    } catch (error) {
      console.error('Error showing file:', error);
      alert('Failed to show file. Please try again.');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading files...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={loadOtherFiles}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Other Files</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access important documents and forms including investor charter booking, complaint procedures, 
              branch details, and key management personnel information.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* File Type Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {fileTypes.map((fileType) => {
            const IconComponent = fileTypeIcons[fileType as keyof typeof fileTypeIcons] || FileText;
            const fileCount = otherFiles.filter(file => file.fileType === fileType).length;
            const isSelected = selectedFileType === fileType;
            
            return (
              <button
                key={fileType}
                onClick={() => setSelectedFileType(isSelected ? 'all' : fileType)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      isSelected ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      isSelected ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {fileType}
                    </h3>
                    <p className="text-sm text-gray-500">{fileCount} files</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {fileTypeDescriptions[fileType as keyof typeof fileTypeDescriptions]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {fileTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Files List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedFileType === 'all' ? 'All Files' : selectedFileType}
            </h2>
            <p className="text-sm text-gray-600">
              {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredFiles.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No files found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedFileType === 'all' 
                    ? 'No files are currently available.'
                    : `No files found for ${selectedFileType}.`
                  }
                </p>
              </div>
            ) : (
              filteredFiles.map((file) => {
                const IconComponent = fileTypeIcons[file.fileType as keyof typeof fileTypeIcons] || FileText;
                return (
                  <div key={file.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {file.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {file.fileType}
                          </p>
                          {file.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {file.description}
                            </p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
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
                        <button
                          onClick={() => handleShow(file.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="View file"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(file.id)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          title="Download file"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherFiles; 