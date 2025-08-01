import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService, User as ApiUser, FileCategory, FileDocument, CategoryWithDocuments } from '../services/api';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import CategoryManagement from './CategoryManagement';
import DocumentUpload from './DocumentUpload';
import CircularManagement from './CircularManagement';
import ContactManagement from './ContactManagement';
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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, type: 'info' | 'warning' | 'success', timestamp: Date}>>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

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

  // Initialize sample notifications
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        message: "New circular uploaded: Important Investment Guidelines",
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        id: 2,
        message: "Contact form submitted by John Doe",
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
      },
      {
        id: 3,
        message: "System maintenance scheduled for tomorrow",
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
      }
    ]);
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

  const formatNotificationTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type: 'info' | 'warning' | 'success') => {
    switch (type) {
      case 'info': return Info;
      case 'warning': return AlertCircle;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: 'info' | 'warning' | 'success') => {
    switch (type) {
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'success': return 'text-green-600 bg-green-50';
      default: return 'text-blue-600 bg-blue-50';
    }
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
    { id: 'circulars', label: 'Circulars', icon: Bell },
    { id: 'other-files', label: 'Other Files', icon: FolderOpen },
    { id: 'contacts', label: 'Contacts', icon: Mail },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Clock Card */}
        <Card className="md:col-span-1 lg:col-span-1">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-sm md:text-base">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              <span>Current Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm md:text-base lg:text-lg text-gray-600">
              {formatDate(currentTime)}
            </div>
          </CardContent>
        </Card>

        {/* Greeting Card */}
        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-sm md:text-base">
              {getWeatherIcon()}
              <span>{getGreeting()}, {user?.strName ? getFirstName(user.strName) : 'User'}!</span>
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Welcome to your MoneyCare dashboard. Here's what's happening today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm md:text-base">
              Manage your documents, view your profile, and access all your financial services from this dashboard.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-xl lg:text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Categories</CardTitle>
            <FolderOpen className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-xl lg:text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 new this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Circulars</CardTitle>
            <Bell className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-xl lg:text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +1 new today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Contacts</CardTitle>
            <Mail className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-xl lg:text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +3 unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm md:text-base">Quick Actions</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Button 
              variant="outline" 
              className="h-16 md:h-20 flex flex-col space-y-1 md:space-y-2 p-2"
              onClick={() => setActiveTab('downloads')}
            >
              <Download className="h-4 w-4 md:h-6 md:w-6" />
              <span className="text-xs md:text-sm">Downloads</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 md:h-20 flex flex-col space-y-1 md:space-y-2 p-2"
              onClick={() => setActiveTab('circulars')}
            >
              <Bell className="h-4 w-4 md:h-6 md:w-6" />
              <span className="text-xs md:text-sm">Circulars</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 md:h-20 flex flex-col space-y-1 md:space-y-2 p-2"
              onClick={() => setActiveTab('other-files')}
            >
              <FolderOpen className="h-4 w-4 md:h-6 md:w-6" />
              <span className="text-xs md:text-sm">Other Files</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 md:h-20 flex flex-col space-y-1 md:space-y-2 p-2"
              onClick={handleProfileModalOpen}
            >
              <User className="h-4 w-4 md:h-6 md:w-6" />
              <span className="text-xs md:text-sm">Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.slice(0, 3).map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <div key={notification.id} className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{formatNotificationTime(notification.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm md:text-base">Quick Links</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Quick access to important sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <Button 
              variant="outline" 
              className="h-14 md:h-16 flex flex-col space-y-1 justify-center p-2"
              onClick={() => setActiveTab('downloads')}
            >
              <Download className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs">Browse Files</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 md:h-16 flex flex-col space-y-1 justify-center p-2"
              onClick={() => setActiveTab('circulars')}
            >
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs">View Circulars</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 md:h-16 flex flex-col space-y-1 justify-center p-2"
              onClick={() => setActiveTab('contacts')}
            >
              <Mail className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs">Contact Messages</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 md:h-16 flex flex-col space-y-1 justify-center p-2"
              onClick={() => setActiveTab('other-files')}
            >
              <FolderOpen className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs">Other Files</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 md:h-16 flex flex-col space-y-1 justify-center p-2"
              onClick={() => {
                setActiveTab('downloads');
                setDownloadsSubTab('categories');
              }}
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs">Create Category</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 md:h-16 flex flex-col space-y-1 justify-center p-2"
              onClick={() => {
                setActiveTab('downloads');
                setDownloadsSubTab('upload');
              }}
            >
              <Upload className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-xs">Upload Document</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Unread Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm md:text-base">
            <Mail className="h-4 w-4 md:h-5 md:w-5" />
            <span>Unread Contact Messages</span>
            {unreadNotifications > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Recent contact form submissions requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {/* Sample unread contact messages */}
            <div className="border-l-4 border-red-500 pl-3 md:pl-4 py-3 bg-red-50 rounded-r-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-600">john.doe@example.com</p>
                  <p className="text-sm text-gray-700 mt-1">Inquiry about investment opportunities</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-500">2 hours ago</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 w-full sm:w-auto"
                    onClick={() => setActiveTab('contacts')}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-3 md:pl-4 py-3 bg-red-50 rounded-r-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sarah Wilson</p>
                  <p className="text-xs text-gray-600">sarah.wilson@email.com</p>
                  <p className="text-sm text-gray-700 mt-1">Request for financial consultation</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-500">4 hours ago</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 w-full sm:w-auto"
                    onClick={() => setActiveTab('contacts')}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-3 md:pl-4 py-3 bg-red-50 rounded-r-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Mike Johnson</p>
                  <p className="text-xs text-gray-600">mike.j@company.com</p>
                  <p className="text-sm text-gray-700 mt-1">Question about document requirements</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-500">1 day ago</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 w-full sm:w-auto"
                    onClick={() => setActiveTab('contacts')}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('contacts')}
                className="w-full"
              >
                View All Contact Messages
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDownloads = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Downloads</h1>
          <p className="text-sm md:text-base text-gray-600">Access all your documents and forms</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs md:text-sm">
            <Filter className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button size="sm" className="text-xs md:text-sm">
            <Download className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Download All</span>
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm md:text-base"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => {
            // Map icon names to actual icon components
            const getIconComponent = (iconName: string) => {
              switch (iconName) {
                case 'FileCheck':
                  return <FileCheck className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />;
                case 'ClipboardList':
                  return <ClipboardList className="h-4 w-4 md:h-5 md:w-5 text-green-600" />;
                case 'Shield':
                  return <Shield className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />;
                case 'FileText':
                  return <FileText className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />;
                case 'Bell':
                  return <Bell className="h-4 w-4 md:h-5 md:w-5 text-red-600" />;
                default:
                  return <FileCheck className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />;
              }
            };

            return (
              <Card 
                key={category.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => loadCategoryDocuments(category.id)}
              >
                <CardHeader className="p-3 md:p-6">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {getIconComponent(category.icon)}
                    </div>
                    <div>
                      <CardTitle className="text-sm md:text-lg">{category.name}</CardTitle>
                      <CardDescription className="text-xs md:text-sm">{category.documentCount} files • Sort: {category.sortOrder}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <p className="text-xs md:text-sm text-gray-600">{category.description}</p>
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
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg md:text-xl">{selectedCategory.name} Documents ({documents.length})</CardTitle>
                <CardDescription className="text-sm">
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
                className="self-start sm:self-auto"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-3">
              {documents.map((document) => (
                <div key={document.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm md:text-base">{document.displayName}</p>
                      <p className="text-xs md:text-sm text-gray-500">
                        {document.categoryName} • {document.fileType.toUpperCase()} • 
                        {(document.fileSize / 1024 / 1024).toFixed(2)} MB • 
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </p>
                      {document.description && (
                        <p className="text-xs md:text-sm text-gray-400 mt-1">{document.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDocumentDownload(document.id)}
                      className="w-full sm:w-auto"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <div className="text-xs md:text-sm text-gray-500 text-center sm:text-left">
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
      case 'circulars':
        return <CircularManagement />;
      case 'other-files':
        return renderOtherFiles();
      case 'contacts':
        return <ContactManagement />;
      default:
        return renderHome();
    }
  };



  const renderOtherFiles = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Other Files Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Other files management interface will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
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
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="px-4 md:px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Mobile Menu Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMobileSidebarOpen(true)}
                      className="lg:hidden self-start"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                    
                    <div>
                      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                        {activeTab === 'downloads' && downloadsSubTab 
                          ? downloadsSubItems.find(item => item.id === downloadsSubTab)?.label
                          : sidebarItems.find(item => item.id === activeTab)?.label
                        }
                      </h2>
                      <p className="text-sm md:text-base text-gray-600">
                        Welcome back, {user?.strName ? getFirstName(user.strName) : 'User'}!
                      </p>
                    </div>
                    
                    {/* Global Search */}
                    {activeTab === 'home' && (
                      <div className="relative w-full sm:w-auto sm:ml-8">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search documents, circulars..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Notifications */}
                <div className="relative mr-2 md:mr-4">
                  <Button
                    variant="ghost"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative flex items-center space-x-2"
                  >
                    <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </Button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                      <div className="p-3 md:p-4 border-b">
                        <h3 className="font-medium text-gray-900 text-sm md:text-base">Notifications</h3>
                        <p className="text-xs md:text-sm text-gray-500">{notifications.length} total</p>
                      </div>
                      <div className="p-2">
                        {notifications.length === 0 ? (
                          <div className="text-center py-6 md:py-8">
                            <Bell className="h-6 w-6 md:h-8 md:w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs md:text-sm text-gray-500">No notifications</p>
                          </div>
                        ) : (
                          notifications.map((notification) => {
                            const Icon = getNotificationIcon(notification.type);
                            return (
                              <div
                                key={notification.id}
                                className={`p-2 md:p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-50 ${getNotificationColor(notification.type)}`}
                                onClick={() => {
                                  setShowNotifications(false);
                                  // Handle notification click
                                }}
                              >
                                <div className="flex items-start space-x-2 md:space-x-3">
                                  <Icon className="h-3 w-3 md:h-4 md:w-4 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs md:text-sm font-medium text-gray-900">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {formatNotificationTime(notification.timestamp)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <div className="p-2 border-t">
                        <Button
                          variant="ghost"
                          className="w-full text-xs md:text-sm"
                          onClick={() => {
                            setUnreadNotifications(0);
                            setShowNotifications(false);
                          }}
                        >
                          Mark all as read
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
                    </div>
                    <span className="text-xs md:text-sm font-medium hidden sm:block">
                      {user?.strName ? getFirstName(user.strName) : 'User'}
                    </span>
                    <ChevronDown className="h-3 w-3 md:h-4 md:w-4 hidden sm:block" />
                  </Button>
                  
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 md:w-64 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-3 md:p-4 border-b">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm md:text-base">{user?.strName || 'User'}</p>
                            <p className="text-xs md:text-sm text-gray-500">{user?.strEmailId}</p>
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
                          className="w-full justify-start text-xs md:text-sm"
                        >
                          <User className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          View Profile
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            setActiveTab('settings');
                          }}
                          className="w-full justify-start text-xs md:text-sm"
                        >
                          <Settings className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          Settings
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-xs md:text-sm"
                        >
                          <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-2" />
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
          <main className="flex-1 p-4 md:p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && renderProfileModal()}

      {/* Click outside to close dropdowns */}
      {(profileDropdownOpen || showNotifications) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setProfileDropdownOpen(false);
            setShowNotifications(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard; 