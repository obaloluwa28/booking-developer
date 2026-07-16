import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Search, 
  Menu,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  X,
  Filter,
  Calendar,
  Eye,
} from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { blogService } from '../services/blogService';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [settings, setSettings] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  const loadCategories = useCallback(async () => {
    try {
      const allCategories = await blogService.getAllCategories();
      setCategories(Array.isArray(allCategories) ? allCategories : []);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    }
  }, []);

  const loadTags = useCallback(async () => {
    try {
      const allTags = await blogService.getAllTags();
      setTags(Array.isArray(allTags) ? allTags : []);
    } catch (error) {
      console.error('Error loading tags:', error);
      setTags([]);
    }
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const blogSettings = await blogService.getSettings();
      setSettings(blogSettings || {});
    } catch (error) {
      console.error('Error loading settings:', error);
      setSettings({});
    }
  }, []);

  const loadRecentPosts = useCallback(async () => {
    try {
      const result = await blogService.getPublishedPosts(1, 5);
      if (result && result.success && Array.isArray(result.posts)) {
        setRecentPosts(result.posts);
      }
    } catch (error) {
      console.error('Error loading recent posts:', error);
    }
  }, []);

  const loadPopularPosts = useCallback(async () => {
    try {
      const result = await blogService.getPublishedPosts(1, 5, { sort: 'popular' });
      if (result && result.success && Array.isArray(result.posts)) {
        setPopularPosts(result.posts);
      }
    } catch (error) {
      console.error('Error loading popular posts:', error);
    }
  }, []);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const filters = {};
      if (selectedCategory) filters.category = selectedCategory;
      if (selectedTag) filters.tag = selectedTag;
      if (searchQuery) filters.search = searchQuery;
      if (sortBy) filters.sort = sortBy;
      
      const result = await blogService.getPublishedPosts(currentPage, 6, filters);
      
      if (result && result.success && Array.isArray(result.posts)) {
        setPosts(result.posts);
        setTotalPages(result.totalPages || 1);
        setTotalPosts(result.total || 0);
      } else {
        setPosts([]);
        setTotalPages(1);
        setTotalPosts(0);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedTag, searchQuery, sortBy]);

  useEffect(() => {
    loadCategories();
    loadTags();
    loadSettings();
    loadRecentPosts();
    loadPopularPosts();
  }, [loadCategories, loadTags, loadSettings, loadRecentPosts, loadPopularPosts]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setIsSidebarOpen(false);
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setSelectedTag('');
    setCurrentPage(1);
    setIsSidebarOpen(false);
  };

  const handleTagClick = async (tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    setSelectedCategory('');
    setCurrentPage(1);
    setIsSidebarOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTag('');
    setSearchQuery('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedTag) count++;
    if (searchQuery) count++;
    if (sortBy !== 'newest') count++;
    return count;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-[#1a2b4c] text-white p-4 rounded-full shadow-lg hover:bg-[#2a3b5c] transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden fixed bottom-20 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle filters"
      >
        <Filter size={24} />
        {getActiveFilterCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            {getActiveFilterCount()}
          </span>
        )}
      </button>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className={`
          fixed lg:sticky top-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          overflow-y-auto h-screen shadow-lg lg:shadow-none
        `}>
          <div className="p-6">
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>

            {/* Blog Info */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1a2b4c] mb-2">
                {settings?.blogTitle || 'Wisefares Blog'}
              </h2>
              <p className="text-sm text-gray-600">
                {settings?.blogDescription || 'Insights and updates from the Wisefares team'}
              </p>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <label htmlFor="search" className="sr-only">Search articles</label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
                  aria-label="Search articles"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-[#1a2b4c]"
                  aria-label="Submit search"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Sort Options */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Sort By
              </h3>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setSortBy('newest')}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'newest'
                      ? 'bg-blue-50 text-[#1a2b4c] font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Newest First
                </button>
                <button
                  onClick={() => setSortBy('oldest')}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'oldest'
                      ? 'bg-blue-50 text-[#1a2b4c] font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Oldest First
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === 'popular'
                      ? 'bg-blue-50 text-[#1a2b4c] font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Most Popular
                </button>
              </div>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Categories</span>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Clear
                    </button>
                  )}
                </h3>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-50 text-[#1a2b4c] font-medium border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[#1a2b4c]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Popular Tags</span>
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag('')}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Clear
                    </button>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {tags.slice(0, 15).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                        selectedTag === tag
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Recent Posts
                </h3>
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="block hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <h4 className="text-sm font-medium text-[#1a2b4c] line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Calendar size={10} className="mr-1" />
                        {formatDate(post.publishedAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Posts */}
            {popularPosts.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Popular Posts
                </h3>
                <div className="space-y-3">
                  {popularPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="block hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <h4 className="text-sm font-medium text-[#1a2b4c] line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Eye size={10} className="mr-1" />
                        {post.views || 0} views
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters Button */}
            {getActiveFilterCount() > 0 && (
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <X size={16} />
                <span>Clear All Filters ({getActiveFilterCount()})</span>
              </button>
            )}

            {/* Posts Count */}
            {!loading && posts.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Showing {posts.length} of {totalPosts} posts
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <div className={`
          fixed lg:hidden inset-y-0 right-0 z-40 w-72 bg-white border-l border-gray-200 transform 
          ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'} 
          transition-transform duration-300 ease-in-out
          overflow-y-auto h-screen shadow-lg
        `}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#1a2b4c]">Quick Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Filter Options */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Sort By</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSortBy('newest');
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      sortBy === 'newest' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50'
                    }`}
                  >
                    Newest First
                  </button>
                  <button
                    onClick={() => {
                      setSortBy('oldest');
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      sortBy === 'oldest' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50'
                    }`}
                  >
                    Oldest First
                  </button>
                  <button
                    onClick={() => {
                      setSortBy('popular');
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      sortBy === 'popular' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50'
                    }`}
                  >
                    Most Popular
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  clearFilters();
                  setIsFilterOpen(false);
                }}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"
              >
                Clear All Filters
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              Use the sidebar menu for more filter options
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 sticky top-9 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:text-[#1a2b4c] transition-colors">
                  Home
                </Link>
                <ChevronRight size={14} />
                <span className="text-[#1a2b4c] font-medium">Blog</span>
              </div>

              {/* Title and Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold text-[#1a2b4c] mb-2">
                    {settings?.blogTitle || 'Wisefares Blog'}
                  </h1>
                  {!loading && totalPosts > 0 && (
                    <p className="text-sm text-gray-500">
                      {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} published
                    </p>
                  )}
                </div>
                
                {/* Active Filters Summary */}
                {getActiveFilterCount() > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 hidden sm:inline">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory && (
                        <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          <span>Category: {selectedCategory}</span>
                          <button 
                            onClick={() => setSelectedCategory('')}
                            className="hover:text-blue-900"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {selectedTag && (
                        <span className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          <span>Tag: {selectedTag}</span>
                          <button 
                            onClick={() => setSelectedTag('')}
                            className="hover:text-green-900"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {searchQuery && (
                        <span className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          <span>Search: "{searchQuery}"</span>
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="hover:text-purple-900"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {sortBy !== 'newest' && (
                        <span className="inline-flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                          <span>Sort: {sortBy}</span>
                          <button 
                            onClick={() => setSortBy('newest')}
                            className="hover:text-orange-900"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2b4c]"></div>
                <p className="text-gray-500">Loading posts...</p>
              </div>
            ) : (
              <>
                {posts.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex flex-col items-center space-y-4 mt-12">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg border transition-colors ${
                              currentPage === 1
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-[#1a2b4c]'
                            }`}
                            aria-label="Previous page"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          
                          <div className="flex items-center space-x-2">
                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }
                              
                              return (
                                <button
                                  key={i}
                                  onClick={() => handlePageChange(pageNum)}
                                  className={`w-10 h-10 rounded-lg transition-colors ${
                                    currentPage === pageNum
                                      ? 'bg-[#1a2b4c] text-white'
                                      : 'text-gray-600 hover:bg-gray-100'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                          </div>
                          
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg border transition-colors ${
                              currentPage === totalPages
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-[#1a2b4c]'
                            }`}
                            aria-label="Next page"
                          >
                            <ChevronRightIcon size={20} />
                          </button>
                        </div>
                        
                        <p className="text-sm text-gray-500">
                          Page {currentPage} of {totalPages}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                    <div className="max-w-md mx-auto">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                      <p className="text-gray-500 mb-6">
                        {getActiveFilterCount() > 0 
                          ? "No posts match your current filters. Try adjusting your search criteria."
                          : "Check back later for new content."}
                      </p>
                      {getActiveFilterCount() > 0 && (
                        <button
                          onClick={clearFilters}
                          className="inline-flex items-center px-4 py-2 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3b5c] transition-colors"
                        >
                          <X size={16} className="mr-2" />
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlays */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
      
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
          aria-label="Close filter overlay"
        />
      )}
    </div>
  );
};

export default BlogPage;