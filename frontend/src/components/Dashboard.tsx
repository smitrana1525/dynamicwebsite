import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService, User as ApiUser, FileCategory, FileDocument, CategoryWithDocuments } from '../services/api';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import CategoryManagement from './CategoryManagement';
import DocumentUpload from './DocumentUpload';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  LogOut, 
  User,
  Settings,
  BarChart3,
  CreditCard,
  PiggyBank,
  Upload,
  FileText,
  FolderOpen,
  Home,
  Calendar,
  PieChart,
  Target,
  Download,
  Trash2,
  Eye,
  ExternalLink,
  Menu,
  X,
  Clock,
  Sun,
  Moon,
  Cloud,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Search,
  Filter,
  MoreVertical,
  FileDown,
  AlertCircle,
  CheckCircle,
  Info,
  Users,
  Shield,
  BookOpen,
  FileCheck,
  ClipboardList,
  Bell,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Unlock,
  EyeOff,
  Save,
  RotateCcw
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: Date;
  url?: string;
  category: string;
  subcategory: string;
}



const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [downloadsSubTab, setDownloadsSubTab] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // User profile data from backend
  const [userProfile, setUserProfile] = useState<ApiUser | null>(null);
  const [editingData, setEditingData] = useState<{
    strName: string;
    bolsActive: boolean;
  }>({
    strName: '',
    bolsActive: true
  });

  // File management state
  const [categories, setCategories] = useState<FileCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithDocuments | null>(null);
  const [documents, setDocuments] = useState<FileDocument[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingFiles(true);
      setFileError(null);
      console.log('Loading categories...');
      console.log('User:', user);
      console.log('Token:', localStorage.getItem('token'));
      
      const categoriesData = await apiService.getAllCategories();
      console.log('Categories loaded:', categoriesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
      setFileError(`Failed to load categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Fallback to mock data for testing
      const mockCategories: FileCategory[] = [
        {
          id: 1,
          name: 'Combine KYC Forms',
          description: 'All KYC related forms and documents for customer verification',
          icon: 'FileCheck',
          isActive: true,
          sortOrder: 1,
          createdDate: new Date().toISOString(),
          modifiedDate: new Date().toISOString(),
          createdBy: 'mock-user',
          modifiedBy: 'mock-user',
          documentCount: 3
        },
        {
          id: 2,
          name: 'Other Demat Form',
          description: 'Various demat account related forms and applications',
          icon: 'ClipboardList',
          isActive: true,
          sortOrder: 2,
          createdDate: new Date().toISOString(),
          modifiedDate: new Date().toISOString(),
          createdBy: 'mock-user',
          modifiedBy: 'mock-user',
          documentCount: 2
        },
        {
          id: 3,
          name: 'Policies',
          description: 'Company policies and procedures documents',
          icon: 'Shield',
          isActive: true,
          sortOrder: 3,
          createdDate: new Date().toISOString(),
          modifiedDate: new Date().toISOString(),
          createdBy: 'mock-user',
          modifiedBy: 'mock-user',
          documentCount: 1
        }
      ];
      setCategories(mockCategories);
    } finally {
      setLoadingFiles(false);
    }
  };

  const loadCategoryDocuments = async (categoryId: number) => {
    try {
      setLoadingFiles(true);
      setFileError(null);
      console.log('Loading documents for category:', categoryId);
      
      const categoryData = await apiService.getCategoryWithDocuments(categoryId);
      console.log('Category data loaded:', categoryData);
      setSelectedCategory(categoryData);
      setDocuments(categoryData.documents);
    } catch (error) {
      console.error('Error loading documents:', error);
      setFileError(`Failed to load documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Fallback to mock data for testing
      const mockDocuments: FileDocument[] = [
        {
          id: 1,
          categoryId: categoryId,
          categoryName: 'Sample Category',
          fileName: 'sample-document.pdf',
          displayName: 'Sample Document',
          fileType: '.pdf',
          fileSize: 1024000,
          description: 'This is a sample document for testing',
          isActive: true,
          uploadDate: new Date().toISOString(),
          modifiedDate: new Date().toISOString(),
          uploadedBy: 'mock-user',
          modifiedBy: 'mock-user',
          downloadCount: 5
        },
        {
          id: 2,
          categoryId: categoryId,
          categoryName: 'Sample Category',
          fileName: 'another-document.pdf',
          displayName: 'Another Document',
          fileType: '.pdf',
          fileSize: 2048000,
          description: 'Another sample document for testing',
          isActive: true,
          uploadDate: new Date().toISOString(),
          modifiedDate: new Date().toISOString(),
          uploadedBy: 'mock-user',
          modifiedBy: 'mock-user',
          downloadCount: 3
        }
      ];
      
      const mockCategoryData: CategoryWithDocuments = {
        id: categoryId,
        name: 'Sample Category',
        description: 'Sample category for testing',
        icon: 'FileCheck',
        isActive: true,
        sortOrder: 1,
        documents: mockDocuments
      };
      
      setSelectedCategory(mockCategoryData);
      setDocuments(mockDocuments);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleDocumentDownload = async (documentId: number) => {
    try {
      console.log('Downloading document:', documentId);
      await apiService.downloadDocument(documentId);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document');
      
      // Mock download for testing
      console.log('Mock download for document:', documentId);
      alert('Mock download completed for document: ' + documentId);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // Load user profile when modal opens
  const loadUserProfile = async () => {
    if (!user?.strGUID) return;
    
    setLoading(true);
    setError(null);
    try {
      const profile = await apiService.getUserById(user.strGUID);
      setUserProfile(profile);
      setEditingData({
        strName: profile.strName || '',
        bolsActive: profile.bolsActive
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle profile modal open
  const handleProfileModalOpen = () => {
    setShowProfileModal(true);
    loadUserProfile();
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    if (!user?.strGUID || !userProfile) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const updatedProfile = await apiService.updateUserProfile(user.strGUID, {
        strName: editingData.strName,
        bolsActive: editingData.bolsActive
      });
      
      setUserProfile(updatedProfile);
      setEditingProfile(false);
      setSuccess('Profile updated successfully! Database has been updated.');
      
      // Update the auth context user data if needed
      // You might need to add a method to update user in AuthContext
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Handle profile delete
  const handleProfileDelete = async () => {
    if (!user?.strGUID) return;
    
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await apiService.deleteUser(user.strGUID);
      setShowProfileModal(false);
      handleLogout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };



  const handleFileAction = (action: string, document: FileDocument) => {
    switch (action) {
      case 'view':
        // For now, just download the file
        handleDocumentDownload(document.id);
        break;
      case 'download':
        handleDocumentDownload(document.id);
        break;
      case 'delete':
        // This would require admin privileges
        console.log('Delete action not implemented for users');
        break;
    }
  };

  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0] || fullName;
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getWeatherIcon = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 18) return <Sun className="h-6 w-6 text-yellow-500" />;
    return <Moon className="h-6 w-6 text-blue-500" />;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (document.description && document.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategoryFilter === 'all' || document.categoryId.toString() === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'files', label: 'Files', icon: FolderOpen },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const downloadsSubItems = [
    { id: 'browse', label: 'Browse Files', icon: FileText },
    { id: 'categories', label: 'Create Categories', icon: Plus },
    { id: 'upload', label: 'Upload Documents', icon: Upload },
  ];

  const renderHome = () => (
    <div className="space-y-6">
      {/* Greeting and Time Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clock Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Clock className="h-6 w-6 text-blue-600" />
              <span>Current Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-lg text-gray-600">
              {formatDate(currentTime)}
            </div>
          </CardContent>
        </Card>

        {/* Greeting Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getWeatherIcon()}
              <span>{getGreeting()}, {user?.strName ? getFirstName(user.strName) : 'User'}!</span>
            </CardTitle>
            <CardDescription>
              Welcome to your MoneyCare dashboard. Here's what's happening today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Manage your documents, view your profile, and access all your financial services from this dashboard.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={() => setActiveTab('downloads')}
            >
              <Download className="h-6 w-6" />
              <span className="text-sm">Downloads</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">View Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Target className="h-6 w-6" />
              <span className="text-sm">Set Goals</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
              onClick={handleProfileModalOpen}
            >
              <User className="h-6 w-6" />
              <span className="text-sm">Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDownloads = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Downloads</h1>
          <p className="text-gray-600">Access all your documents and forms</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => {
                  if (e.target.value === 'all') {
                    setSelectedCategoryFilter('all');
                    setSelectedCategory(null);
                    setDocuments([]);
                  } else {
                    setSelectedCategoryFilter(e.target.value);
                    loadCategoryDocuments(parseInt(e.target.value));
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id.toString()}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loadingFiles && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading files...</p>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {fileError && (
        <Card>
          <CardContent className="p-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{fileError}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      {!loadingFiles && !fileError && categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            // Map icon names to actual icon components
            const getIconComponent = (iconName: string) => {
              switch (iconName) {
                case 'FileCheck':
                  return <FileCheck className="h-5 w-5 text-blue-600" />;
                case 'ClipboardList':
                  return <ClipboardList className="h-5 w-5 text-green-600" />;
                case 'Shield':
                  return <Shield className="h-5 w-5 text-purple-600" />;
                case 'FileText':
                  return <FileText className="h-5 w-5 text-orange-600" />;
                case 'Bell':
                  return <Bell className="h-5 w-5 text-red-600" />;
                default:
                  return <FileCheck className="h-5 w-5 text-blue-600" />;
              }
            };

            return (
              <Card 
                key={category.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => loadCategoryDocuments(category.id)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {getIconComponent(category.icon)}
                    </div>
                                         <div>
                       <CardTitle className="text-lg">{category.name}</CardTitle>
                       <CardDescription>{category.documentCount} files • Sort: {category.sortOrder}</CardDescription>
                     </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* No Categories State */}
      {!loadingFiles && !fileError && categories.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No categories found</p>
            <p className="text-sm text-gray-400 mt-2">Categories will appear here once they are created</p>
          </CardContent>
        </Card>
      )}

      {/* Documents List */}
      {selectedCategory && documents.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedCategory.name} Documents ({documents.length})</CardTitle>
                <CardDescription>
                  Browse and download all available files in this category
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory(null);
                  setDocuments([]);
                  setSelectedCategoryFilter('all');
                }}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </div>
          </CardHeader>
          <CardContent>
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
                        {(document.fileSize / 1024 / 1024).toFixed(2)} MB • 
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </p>
                      {document.description && (
                        <p className="text-sm text-gray-400 mt-1">{document.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDocumentDownload(document.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <div className="text-sm text-gray-500">
                      {document.downloadCount} downloads
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Documents State */}
      {selectedCategory && documents.length === 0 && !loadingFiles && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No documents found in this category</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedCategory(null);
                setDocuments([]);
                setSelectedCategoryFilter('all');
              }}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProfileModal(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading profile...</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600">{success}</p>
          </div>
        )}

        {userProfile && !loading && (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{userProfile.strName}</h3>
                <p className="text-gray-600">{userProfile.strEmailId}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    userProfile.bolsActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {userProfile.bolsActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-sm text-gray-500">Provider: {userProfile.authProvider}</span>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editingProfile ? editingData.strName : userProfile.strName}
                    onChange={(e) => setEditingData({...editingData, strName: e.target.value})}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.strEmailId}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed as it's used for login</p>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={editingProfile ? editingData.bolsActive.toString() : userProfile.bolsActive.toString()}
                    onChange={(e) => setEditingData({...editingData, bolsActive: e.target.value === 'true'})}
                    disabled={!editingProfile}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <div>
                  <Label>User ID</Label>
                  <Input
                    value={userProfile.strGUID}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Created Date</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(userProfile.createDate).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Last Modified</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(userProfile.modifyDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                {editingProfile ? (
                  <>
                    <Button onClick={handleProfileUpdate} disabled={loading}>
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingProfile(false);
                                              setEditingData({
                        strName: userProfile.strName || '',
                        bolsActive: userProfile.bolsActive
                      });
                      }}
                      disabled={loading}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setEditingProfile(true)} disabled={loading}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" disabled={loading}>
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700"
                  onClick={handleProfileDelete}
                  disabled={loading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {loading ? 'Deleting...' : 'Delete Account'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHome();
      case 'downloads':
        switch (downloadsSubTab) {
          case 'browse':
            return renderDownloads();
          case 'categories':
            return <CategoryManagement />;
          case 'upload':
            return <DocumentUpload />;
          default:
            return renderDownloads();
        }
      case 'files':
        return renderFiles();
      case 'analytics':
        return renderAnalytics();
      case 'goals':
        return renderGoals();
      default:
        return renderHome();
    }
  };



  const renderFiles = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>File Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">File management interface will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Analytics charts will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Goals tracking will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Single Toggle Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-40 bg-white shadow-lg transform transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
        `}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <h1 className="text-xl font-bold text-gray-900">MoneyCare</h1>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="flex-shrink-0"
                >
                  {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            {/* User Profile */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {user?.strName ? getFirstName(user.strName) : 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.strEmailId}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isDownloads = item.id === 'downloads';
                  const isActive = activeTab === item.id;
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          if (isDownloads) {
                            setDownloadsSubTab('browse');
                          } else {
                            setDownloadsSubTab(null);
                          }
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title={sidebarCollapsed ? item.label : ''}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {!sidebarCollapsed && <span>{item.label}</span>}
                      </button>
                      
                      {/* Downloads Sub-navigation */}
                      {isDownloads && isActive && !sidebarCollapsed && (
                        <ul className="ml-6 mt-2 space-y-1">
                          {downloadsSubItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <li key={subItem.id}>
                                <button
                                  onClick={() => setDownloadsSubTab(subItem.id)}
                                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                                    downloadsSubTab === subItem.id
                                      ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600'
                                      : 'text-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  <SubIcon className="h-4 w-4 flex-shrink-0" />
                                  <span>{subItem.label}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t">
              <Button
                variant="outline"
                onClick={handleLogout}
                className={`w-full flex items-center space-x-2 ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? 'Logout' : ''}
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Logout</span>}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeTab === 'downloads' && downloadsSubTab 
                      ? downloadsSubItems.find(item => item.id === downloadsSubTab)?.label
                      : sidebarItems.find(item => item.id === activeTab)?.label
                    }
                  </h2>
                  <p className="text-gray-600">
                    Welcome back, {user?.strName ? getFirstName(user.strName) : 'User'}!
                  </p>
                </div>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">
                      {user?.strName ? getFirstName(user.strName) : 'User'}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{user?.strName || 'User'}</p>
                            <p className="text-sm text-gray-500">{user?.strEmailId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            handleProfileModalOpen();
                          }}
                          className="w-full justify-start"
                        >
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            setActiveTab('settings');
                          }}
                          className="w-full justify-start"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && renderProfileModal()}

      {/* Click outside to close dropdowns */}
      {profileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard; 