import React from 'react';
import { X, Eye, Download, FileText } from 'lucide-react';

interface FilePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileType: string;
  fileSize?: string;
  onView: () => void;
  onDownload: () => void;
}

const FilePopupModal: React.FC<FilePopupModalProps> = ({
  isOpen,
  onClose,
  fileName,
  fileType,
  fileSize,
  onView,
  onDownload
}) => {
  if (!isOpen) return null;

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'txt':
        return '📄';
      default:
        return '📄';
    }
  };

  const getFileTypeName = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'PDF Document';
      case 'doc':
        return 'Word Document';
      case 'docx':
        return 'Word Document';
      case 'xls':
        return 'Excel Spreadsheet';
      case 'xlsx':
        return 'Excel Spreadsheet';
      case 'txt':
        return 'Text Document';
      default:
        return 'Document';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">File Options</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* File Info */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-4xl">{getFileIcon(fileType)}</div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-gray-900 mb-1">{fileName}</h4>
              <p className="text-sm text-gray-500">{getFileTypeName(fileType)}</p>
              {fileSize && (
                <p className="text-xs text-gray-400 mt-1">{fileSize}</p>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onView}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <Eye className="w-5 h-5" />
              <span>View File</span>
            </button>
            
            <button
              onClick={onDownload}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              <Download className="w-5 h-5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePopupModal; 