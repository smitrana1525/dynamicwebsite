import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService, User as ApiUser } from '../services/api';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  // Mock files data with categories
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Individual CKYC Form.pdf',
      size: '2.4 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-15'),
      url: 'https://example.com/files/individual-ckyc-form.pdf',
      category: 'Combine KYC Forms',
      subcategory: 'Individual CKYC Form'
    },
    {
      id: '2',
      name: 'Non Individual CKYC Form.pdf',
      size: '1.8 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-10'),
      url: 'https://example.com/files/non-individual-ckyc-form.pdf',
      category: 'Combine KYC Forms',
      subcategory: 'Non Individual CKYC Form'
    },
    {
      id: '3',
      name: 'Rights and Obligation.pdf',
      size: '3.2 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-05'),
      url: 'https://example.com/files/rights-obligation.pdf',
      category: 'Combine KYC Forms',
      subcategory: 'Rights and Obligation'
    },
    {
      id: '4',
      name: 'Multiple Nomination.pdf',
      size: '1.5 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-12'),
      url: 'https://example.com/files/multiple-nomination.pdf',
      category: 'Other Demat Form',
      subcategory: 'Multiple Nomination'
    },
    {
      id: '5',
      name: 'Account Closure Form.pdf',
      size: '2.1 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-08'),
      url: 'https://example.com/files/account-closure-form.pdf',
      category: 'Other Demat Form',
      subcategory: 'Account Closure Form'
    },
    {
      id: '6',
      name: 'Granting of Exposure to Clients.pdf',
      size: '4.2 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-03'),
      url: 'https://example.com/files/granting-exposure-clients.pdf',
      category: 'Policies',
      subcategory: 'Granting of Exposure to Clients'
    },
    {
      id: '7',
      name: 'FATCA Form.pdf',
      size: '1.9 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-20'),
      url: 'https://example.com/files/fatca-form.pdf',
      category: 'Other Forms',
      subcategory: 'FATCA Form'
    },
    {
      id: '8',
      name: 'Important DP Circular.pdf',
      size: '2.8 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-18'),
      url: 'https://example.com/files/important-dp-circular.pdf',
      category: 'Important Circulars',
      subcategory: 'Important DP Circular'
    }
  ]);

  // Categories data
  const categories = [
    {
      id: 'kyc-forms',
      name: 'Combine KYC Forms',
      icon: FileCheck,
      subcategories: [
        'Individual CKYC Form',
        'Non Individual CKYC Form',
        'Rights and Obligation',
        'Risk Disclosure Documents',
        'Rights and Obligations for Trading A/c'
      ]
    },
    {
      id: 'demat-forms',
      name: 'Other Demat Form',
      icon: ClipboardList,
      subcategories: [
        'Multiple Nomination',
        'Account Closure Form',
        'Transposition Form',
        'Transmission Form',
        'Name Change Application',
        'Signature Change Application',
        'Email – Mobile Declaration',
        'Permitted To Trade Data',
        'Demat Tariff',
        'List of Approved Securities'
      ]
    },
    {
      id: 'policies',
      name: 'Policies',
      icon: Shield,
      subcategories: [
        'Granting of Exposure to Clients',
        'Policy on Handling of Good Till Cancelled (GTC) Orders',
        'Combined Risk Management and Internal Control Policy',
        'RMS Manual',
        'PMLA Policy',
        'Limit Setting',
        'Policy of Inactive Accounts',
        'Pre-funded Instruments',
        'Code Modification Policy',
        'Policy on Squaring Off Client Positions',
        'Policy on Internal Shortage',
        'Policy For Voluntary Blocking of The Trading Account',
        'Policy of Outsourced Activities',
        'Surveillance Policy'
      ]
    },
    {
      id: 'other-forms',
      name: 'Other Forms',
      icon: FileText,
      subcategories: [
        'FATCA Form',
        'KRA Individual Form',
        'KRA Non Individual Form',
        'C-KYC Individual Form',
        'C-KYC Non Individual Form',
        'Important Exchange Circular',
        'Important SEBI Circular'
      ]
    },
    {
      id: 'circulars',
      name: 'Important Circulars',
      icon: Bell,
      subcategories: [
        'Important DP Circular',
        'Important Exchange Circular',
        'Important SEBI Circular',
        'New Status and Sub-Status for Demat Accounts',
        'Additional Criteria for Dormant Demat Accounts',
        'Validation of KYC Records with KRA',
        'SEBI Master CIR on Surveillance of Securities Market',
        'SEBI CIR on KYC Upload by Registration Agencies to Central KYC Registry',
        'Implementation of Two-Factor Authentication in EASI & EASIEST Login',
        'Review of KYC Validation',
        'Aadhaar Seeding (Linkage of PAN with Aadhaar)',
        'SCORES 2.0 – SEBI Complaint Redressal System for Investors'
      ]
    }
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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



  const handleFileAction = (action: string, file: FileItem) => {
    switch (action) {
      case 'view':
        if (file.url) {
          window.open(file.url, '_blank');
        }
        break;
      case 'download':
        if (file.url) {
          const link = document.createElement('a');
          link.href = file.url;
          link.download = file.name;
          link.click();
        }
        break;
      case 'delete':
        setUploadedFiles(uploadedFiles.filter(f => f.id !== file.id));
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

  const filteredFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'files', label: 'Files', icon: FolderOpen },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const categoryFiles = uploadedFiles.filter(file => file.category === category.name);
          
          return (
            <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{categoryFiles.length} files</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.subcategories.slice(0, 3).map((subcategory, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{subcategory}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {category.subcategories.length > 3 && (
                    <div className="text-center pt-2">
                      <Button variant="outline" size="sm">
                        View All ({category.subcategories.length})
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Files List */}
      {filteredFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>All Files ({filteredFiles.length})</CardTitle>
            <CardDescription>
              Browse and download all available files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {file.category} • {file.subcategory} • {file.size} • {file.uploadDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileAction('view', file)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileAction('download', file)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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
        return renderDownloads();
      case 'overview':
        return renderOverview();
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

  // Keep existing render methods for other tabs
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,45,000</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Investment</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹82,000</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹44,000</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Demat A/c</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">3</div>
            <p className="text-xs text-muted-foreground">
              All accounts active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest financial activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">SIP Investment</p>
                  <p className="text-sm text-gray-500">Today</p>
                </div>
              </div>
              <span className="font-bold text-green-600">+₹5,000</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Dividend Received</p>
                  <p className="text-sm text-gray-500">Yesterday</p>
                </div>
              </div>
              <span className="font-bold text-blue-600">+₹1,200</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Demat Account Fee</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <span className="font-bold text-red-600">-₹500</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        title={sidebarCollapsed ? item.label : ''}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {!sidebarCollapsed && <span>{item.label}</span>}
                      </button>
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
                    {sidebarItems.find(item => item.id === activeTab)?.label}
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