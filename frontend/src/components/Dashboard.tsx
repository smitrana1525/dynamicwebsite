import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  ChevronRight
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: Date;
  url?: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Financial_Report_2024.pdf',
      size: '2.4 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-15'),
      url: 'https://example.com/files/financial-report-2024.pdf'
    },
    {
      id: '2',
      name: 'Budget_Planning.xlsx',
      size: '1.8 MB',
      type: 'Excel',
      uploadDate: new Date('2024-01-10'),
      url: 'https://example.com/files/budget-planning.xlsx'
    },
    {
      id: '3',
      name: 'Investment_Portfolio.pdf',
      size: '3.2 MB',
      type: 'PDF',
      uploadDate: new Date('2024-01-05'),
      url: 'https://example.com/files/investment-portfolio.pdf'
    }
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = () => {
    if (selectedFile) {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: selectedFile.name,
        size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
        type: selectedFile.type.split('/')[1].toUpperCase(),
        uploadDate: new Date(),
        url: `https://yourwebsite.com/files/${selectedFile.name}`
      };
      setUploadedFiles([newFile, ...uploadedFiles]);
      setSelectedFile(null);
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

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'overview', label: 'Overview', icon: BarChart3 },
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">$24,500</div>
                <div className="text-sm text-gray-600">Total Balance</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">$8,200</div>
                <div className="text-sm text-gray-600">Monthly Income</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">$4,400</div>
                <div className="text-sm text-gray-600">Total Savings</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Today's Schedule</span>
          </CardTitle>
          <CardDescription>
            Your financial activities and reminders for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Salary Deposit</p>
                <p className="text-sm text-gray-500">Expected today at 9:00 AM</p>
              </div>
              <span className="text-green-600 font-medium">+$4,200</span>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Budget Review Meeting</p>
                <p className="text-sm text-gray-500">Scheduled for 2:00 PM</p>
              </div>
              <span className="text-blue-600 font-medium">Meeting</span>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Credit Card Payment Due</p>
                <p className="text-sm text-gray-500">Due in 3 days</p>
              </div>
              <span className="text-yellow-600 font-medium">$850</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Upload className="h-6 w-6" />
              <span className="text-sm">Upload File</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">View Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Target className="h-6 w-6" />
              <span className="text-sm">Set Goals</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$8,200</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$3,800</div>
            <p className="text-xs text-muted-foreground">
              -5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$4,400</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
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
                  <p className="font-medium">Salary Deposit</p>
                  <p className="text-sm text-gray-500">Today</p>
                </div>
              </div>
              <span className="font-bold text-green-600">+$4,200</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Grocery Shopping</p>
                  <p className="text-sm text-gray-500">Yesterday</p>
                </div>
              </div>
              <span className="font-bold text-red-600">-$120</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Netflix Subscription</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <span className="font-bold text-red-600">-$15</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-6">
      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Files</span>
          </CardTitle>
          <CardDescription>
            Upload financial documents and reports to your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Choose File</Label>
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.xlsx,.xls,.doc,.docx,.txt"
            />
          </div>
          {selectedFile && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium">Selected: {selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                Size: {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          )}
          <Button 
            onClick={handleUploadSubmit}
            disabled={!selectedFile}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Your Files</span>
          </CardTitle>
          <CardDescription>
            Manage your uploaded financial documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {file.size} • {file.type} • {file.uploadDate.toLocaleDateString()}
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
                    onClick={() => handleFileAction('delete', file)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5" />
            <span>Financial Analytics</span>
          </CardTitle>
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
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Financial Goals</span>
          </CardTitle>
          <CardDescription>
            Track your progress towards financial milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Emergency Fund</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs text-gray-500">$7,500 / $10,000</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Vacation Fund</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-gray-500">$900 / $2,000</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Investment Portfolio</span>
                <span>60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-gray-500">$12,000 / $20,000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHome();
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <DollarSign className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">MoneyCare</h1>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">
              {user?.strName ? getFirstName(user.strName) : 'User'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <h1 className="text-xl font-bold text-gray-900">MoneyCare</h1>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="hidden lg:flex"
                  >
                    {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
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
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
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

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Header */}
          <header className="hidden lg:block bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="flex items-center space-x-2"
                  >
                    <Menu className="h-5 w-5" />
                    <span>Toggle Sidebar</span>
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {sidebarItems.find(item => item.id === activeTab)?.label}
                    </h2>
                    <p className="text-gray-600">
                      Welcome back, {user?.strName ? getFirstName(user.strName) : 'User'}!
                    </p>
                  </div>
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
                            {user?.authProvider && user.authProvider !== 'email' && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {user.authProvider}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
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
          <main className="flex-1 p-4 lg:p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 