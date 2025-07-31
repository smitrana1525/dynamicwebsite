import React, { useState, useEffect } from 'react';
import { apiService, FileCategory } from '../services/api';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  FileCheck, 
  ClipboardList, 
  Shield, 
  FileText, 
  Bell,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CategoryFormData {
  name: string;
  sortOrder: number;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<FileCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<FileCategory | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    sortOrder: 0
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sortOrder: 0
    });
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    if (formData.sortOrder <= 0) {
      setError('Sort order must be greater than 0');
      return;
    }

    // Check for duplicate sort order
    const existingCategory = categories.find(cat => cat.sortOrder === formData.sortOrder);
    if (existingCategory && (!editingCategory || existingCategory.id !== editingCategory.id)) {
      setError(`Sort order ${formData.sortOrder} is already used by category "${existingCategory.name}". Please choose a different sort order.`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (editingCategory) {
        await apiService.updateCategory(editingCategory.id, {
          name: formData.name,
          description: '', // Empty description since we removed it
          icon: 'FileCheck', // Default icon since we removed it
          isActive: editingCategory.isActive,
          sortOrder: formData.sortOrder
        });
        setSuccess('Category updated successfully!');
      } else {
        await apiService.createCategory({
          name: formData.name,
          description: '', // Empty description since we removed it
          icon: 'FileCheck', // Default icon since we removed it
          sortOrder: formData.sortOrder
        });
        setSuccess('Category created successfully!');
      }

      resetForm();
      loadCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('403') || error.message.includes('Forbidden')) {
          setError('Access denied. You need admin privileges to create categories. Please contact your administrator.');
        } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          setError('Authentication required. Please log in again.');
        } else {
          setError(`Failed to save category: ${error.message}`);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: FileCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      sortOrder: category.sortOrder
    });
    setShowForm(true);
  };

  const handleDelete = async (categoryId: number) => {
    if (!window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await apiService.deleteCategory(categoryId);
      setSuccess('Category deleted successfully!');
      loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = () => {
    return <FileCheck className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-600">Create and manage file categories</p>
        </div>
        <Button onClick={() => setShowForm(true)} disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
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

      {/* Category Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{editingCategory ? 'Edit Category' : 'Create New Category'}</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
                         <form onSubmit={handleSubmit} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <Label htmlFor="name">Category Name *</Label>
                   <Input
                     id="name"
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     placeholder="Enter category name"
                     required
                   />
                 </div>
                 <div>
                   <Label htmlFor="sortOrder">Sort Order *</Label>
                   <Input
                     id="sortOrder"
                     type="number"
                     value={formData.sortOrder}
                     onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                     placeholder="Enter unique sort order"
                     required
                   />
                 </div>
               </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingCategory ? 'Update' : 'Create'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Categories List */}
      {loading && !showForm ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading categories...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                                         <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                       {getIconComponent()}
                     </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.documentCount} files</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
                             <CardContent>
                 <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                   <span className="font-medium">Sort Order: {category.sortOrder}</span>
                   <span className={`px-2 py-1 rounded-full ${
                     category.isActive 
                       ? 'bg-green-100 text-green-800' 
                       : 'bg-red-100 text-red-800'
                   }`}>
                     {category.isActive ? 'Active' : 'Inactive'}
                   </span>
                 </div>
               </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && categories.length === 0 && !showForm && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No categories found</p>
            <p className="text-sm text-gray-400 mt-2">Create your first category to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoryManagement; 