import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  Image as ImageIcon,
  LayoutDashboard,
  FileText,
  Settings,
  X,
  CheckCircle,
  Clock
} from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import { blogService } from '../services/blogService';

const AdminCreatePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    categories: [],
    tags: [],
    status: 'draft',
    author: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Author at Wisefares'
    }
  });

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadCategories = useCallback(async () => {
    const cats = await blogService.getAllCategories();
    setAvailableCategories(Array.isArray(cats) ? cats : []);
  }, []);

  const loadTags = useCallback(async () => {
    const ts = await blogService.getAllTags();
    setAvailableTags(Array.isArray(ts) ? ts : []);
  }, []);

  const loadPost = useCallback(async () => {
    const post = await blogService.getPostById(id);
    if (post) {
      setFormData(post);
    } else {
      navigate('/admin/posts');
    }
  }, [id, navigate]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      await loadCategories();
      await loadTags();

      if (isEditing) {
        await loadPost();
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [isEditing, loadCategories, loadTags, loadPost]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const addCategory = () => {
    if (newCategory && !formData.categories.includes(newCategory)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
          setFormData(prev => ({ ...prev, featuredImage: data.imageUrl }));
          console.log('Image uploaded:', data.imageUrl);
        } else {
          alert('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async (status) => {
    setSaving(true);
    
    try {
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt || '',
        content: formData.content || '',
        featuredImage: formData.featuredImage || '',
        categories: formData.categories || [],
        tags: formData.tags || [],
        status: status
      };
      
      if (formData.slug && formData.slug.trim() !== '') {
        postData.slug = formData.slug.trim();
      }
      
      console.log('Saving post data:', postData);
      
      if (isEditing) {
        await blogService.updatePost(id, postData);
      } else {
        await blogService.createPost(postData);
      }
      
      navigate('/admin/posts');
    } catch (error) {
      console.error('Error saving post:', error);
      setSaving(false);
    }
  };

  const handlePublish = () => {
    handleSave('published');
  };

  const handleSaveDraft = () => {
    handleSave('draft');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2b4c]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Admin Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
          <div className="p-6">
            <h1 className="text-xl font-bold text-[#1a2b4c] mb-6">Wisefares Admin</h1>
            
            <nav className="space-y-2">
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/posts"
                className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-[#1a2b4c] rounded-lg font-medium"
              >
                <FileText size={20} />
                <span>Posts</span>
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin/posts"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-[#1a2b4c]">
                  {isEditing ? 'Edit Post' : 'Create New Post'}
                </h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Eye size={18} />
                  <span>{previewMode ? 'Edit' : 'Preview'}</span>
                </button>
                <button
                  onClick={handleSaveDraft}
                  disabled={saving}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <Clock size={18} />
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={handlePublish}
                  disabled={saving}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3b5c] disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      <span>{isEditing ? 'Update' : 'Publish'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {previewMode ? (
              /* Preview Mode */
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h1 className="text-3xl font-bold text-[#1a2b4c] mb-4">{formData.title}</h1>
                
                {formData.featuredImage && (
                  <img
                    src={formData.featuredImage}
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                
                <div className="flex items-center space-x-4 mb-6">
                  {formData.author?.avatar && (
                    <img
                      src={formData.author.avatar}
                      alt={formData.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-[#1a2b4c]">{formData.author?.name}</p>
                    <p className="text-sm text-gray-500">{formData.author?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {formData.categories.map((cat) => (
                    <span key={cat} className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formData.content }} />
              </div>
            ) : (
              /* Edit Mode */
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter post title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="leave-empty-to-auto-generate"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to auto-generate from title
                  </p>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the post"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.featuredImage ? (
                      <div className="relative">
                        <img
                          src={formData.featuredImage}
                          alt="Featured"
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                        <ImageIcon size={24} className="text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    )}
                  </div>
                  {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                      >
                        <span>{cat}</span>
                        <button
                          onClick={() => removeCategory(cat)}
                          className="hover:text-red-600"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      list="categories"
                    />
                    <datalist id="categories">
                      {Array.isArray(availableCategories) && availableCategories.map((cat) => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                    <button
                      type="button"
                      onClick={addCategory}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-600"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="New tag"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      list="tags"
                    />
                    <datalist id="tags">
                      {Array.isArray(availableTags) && availableTags.map((tag) => (
                        <option key={tag} value={tag} />
                      ))}
                    </datalist>
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={handleContentChange}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePostPage;