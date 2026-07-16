// pages/Admin/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  TrendingUp,
  Eye,
  Clock,
  PlusCircle,
  Edit,
  LogOut
} from 'lucide-react';
import { blogService } from '../services/blogService';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    totalCategories: 0,
    totalTags: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Get all posts - AWAIT the async function
      const allPosts = await blogService.getPosts();
      console.log('All posts:', allPosts); // Debug log
      
      // Make sure allPosts is an array
      const postsArray = Array.isArray(allPosts) ? allPosts : [];
      
      const published = postsArray.filter(p => p.status === 'published');
      const drafts = postsArray.filter(p => p.status === 'draft');
      const totalViews = postsArray.reduce((sum, post) => sum + (post.views || 0), 0);
      
      // Get categories and tags - AWAIT these too
      const categories = await blogService.getAllCategories();
      const tags = await blogService.getAllTags();

      setStats({
        totalPosts: postsArray.length,
        publishedPosts: published.length,
        draftPosts: drafts.length,
        totalViews,
        totalCategories: categories.length || 0,
        totalTags: tags.length || 0
      });

      // Recent posts (last 5)
      setRecentPosts([...postsArray]
        .sort((a, b) => new Date(b.publishedAt || b.updatedAt) - new Date(a.publishedAt || a.updatedAt))
        .slice(0, 5)
      );

      // Popular posts (most viewed)
      setPopularPosts([...postsArray]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5)
      );
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    blogService.logout();
    window.location.href = '/admin/login';
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <span className="text-2xl font-bold text-[#1a2b4c]">{value}</span>
      </div>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );

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
                className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-[#1a2b4c] rounded-lg font-medium"
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/posts"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
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

            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-[#1a2b4c]">Dashboard</h1>
              <Link
                to="/admin/posts/create"
                className="flex items-center space-x-2 px-4 py-2 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3b5c] transition-colors"
              >
                <PlusCircle size={18} />
                <span>New Post</span>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                icon={FileText}
                label="Total Posts"
                value={stats.totalPosts}
                color="bg-blue-600"
              />
              <StatCard
                icon={Eye}
                label="Total Views"
                value={stats.totalViews}
                color="bg-green-600"
              />
              <StatCard
                icon={TrendingUp}
                label="Published Posts"
                value={stats.publishedPosts}
                color="bg-purple-600"
              />
              <StatCard
                icon={Clock}
                label="Draft Posts"
                value={stats.draftPosts}
                color="bg-yellow-600"
              />
              <StatCard
                icon={Users}
                label="Categories"
                value={stats.totalCategories}
                color="bg-red-600"
              />
              <StatCard
                icon={Settings}
                label="Tags"
                value={stats.totalTags}
                color="bg-indigo-600"
              />
            </div>

            {/* Recent Posts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-[#1a2b4c] mb-4">Recent Posts</h2>
                <div className="space-y-4">
                  {recentPosts.length > 0 ? recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#1a2b4c]">{post.title}</h3>
                        <p className="text-xs text-gray-500">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/admin/posts/edit/${post.id}`}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Edit size={16} />
                        </Link>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-center py-4">No posts found</p>
                  )}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-[#1a2b4c] mb-4">Most Viewed</h2>
                <div className="space-y-4">
                  {popularPosts.length > 0 ? popularPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#1a2b4c]">{post.title}</h3>
                        <p className="text-xs text-gray-500">{post.views || 0} views</p>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-center py-4">No posts found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;