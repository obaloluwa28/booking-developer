import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { blogService } from '../services/blogService';

const AdminPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const allPosts = await blogService.getPosts();
      setPosts(allPosts || []);
      setFilteredPosts(allPosts || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const filterPosts = useCallback(() => {
    let filtered = Array.isArray(posts) ? [...posts] : [];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title?.toLowerCase().includes(query) ||
        p.excerpt?.toLowerCase().includes(query) ||
        p.author?.name?.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(filtered);
  }, [posts, statusFilter, searchQuery]);

  useEffect(() => {
    filterPosts();
  }, [filterPosts]);

  const handleDelete = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      await blogService.deletePost(postToDelete.id);
      await loadPosts();
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'draft':
        return <Clock size={16} className="text-yellow-600" />;
      case 'archived':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-[#1a2b4c]">Manage Posts</h1>
              <Link
                to="/admin/posts/create"
                className="flex items-center space-x-2 px-4 py-2 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3b5c] transition-colors"
              >
                <PlusCircle size={18} />
                <span>Create New Post</span>
              </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Posts Table */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2b4c]"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-[#1a2b4c]">{post.title}</div>
                              <div className="text-sm text-gray-500">{post.excerpt?.substring(0, 60)}...</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {post.author?.name}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(post.status)}
                              <span className="text-sm text-gray-600 capitalize">{post.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {post.views || 0}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <Link
                              to={`/blog/${post.slug}`}
                              target="_blank"
                              className="inline-block p-1 text-gray-400 hover:text-blue-600"
                            >
                              <Eye size={18} />
                            </Link>
                            <Link
                              to={`/admin/posts/edit/${post.id}`}
                              className="inline-block p-1 text-gray-400 hover:text-green-600"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(post)}
                              className="inline-block p-1 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          No posts found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-[#1a2b4c] mb-2">Delete Post</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{postToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPostsPage;