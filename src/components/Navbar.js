import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, FileText, BookOpen, HelpCircle, ExternalLink } from 'lucide-react';
import UserDropdown from './UserDropdown';
import { useAuth } from './AuthContext';

import wisefareslogo from '../image/wisefareslogo.png'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mock search data - wrapped in useMemo to prevent unnecessary re-renders
  const searchableContent = useMemo(() => [
    // APIs
    { type: 'api', title: 'Wisefares Flight Search API', path: '/product-catalog/agentic-apis/wisefares-flight-search-api', category: 'API', description: 'Search for flights across multiple GDS systems' },
    { type: 'api', title: 'Wisefares Flight Retrieve API', path: '/product-catalog/agentic-apis/wisefares-flight-retrieve-api', category: 'API', description: 'Retrieve flight details and bookings' },
    { type: 'api', title: 'Hotels Price Check API', path: '/product-catalog/agentic-apis/hotels-price-check-api', category: 'API', description: 'Check hotel prices and availability' },
    { type: 'api', title: 'Hotels Rates API', path: '/product-catalog/agentic-apis/hotels-rates-api', category: 'API', description: 'Get hotel rate information' },
    { type: 'api', title: 'Hotel Search API', path: '/product-catalog/agentic-apis/hotel-search-api', category: 'API', description: 'Search for hotels by location' },
    { type: 'api', title: 'Booking Management API', path: '/product-catalog/agentic-apis/booking-management-api', category: 'API', description: 'Manage flight bookings' },
    { type: 'api', title: 'Flight Reshop API', path: '/product-catalog/agentic-apis/flight-reshop-api', category: 'API', description: 'Modify and rebook flights' },
    { type: 'api', title: 'Wisefares Flight Check API', path: '/product-catalog/agentic-apis/wisefares-flight-check-api', category: 'API', description: 'Validate flight bookings' },

    // Documentation Pages
    { type: 'doc', title: 'Getting Started Guide', path: '/guides/getting-started', category: 'Guide', description: 'Learn how to get started with Wisefares APIs' },
    { type: 'doc', title: 'Authentication Guide', path: '/guides/authentication', category: 'Guide', description: 'How to authenticate API requests' },
    { type: 'doc', title: 'Error Handling', path: '/guides/errors', category: 'Guide', description: 'Understanding API errors and how to handle them' },
    { type: 'doc', title: 'Rate Limits', path: '/guides/rate-limits', category: 'Guide', description: 'API rate limiting and best practices' },
    { type: 'doc', title: 'Webhooks', path: '/guides/webhooks', category: 'Guide', description: 'Setting up and using webhooks' },

    // Support Pages
    { type: 'support', title: 'FAQ', path: '/support/faq', category: 'Support', description: 'Frequently asked questions' },
    { type: 'support', title: 'Contact Support', path: '/support/contact', category: 'Support', description: 'Get help from our support team' },
    { type: 'support', title: 'API Status', path: '/support/status', category: 'Support', description: 'Check API system status' },

    // Blog Posts
    { type: 'blog', title: 'Introducing Agentic APIs', path: '/blog/introducing-agentic-apis', category: 'Blog', description: 'Learn about our new Agentic-ready APIs' },
    { type: 'blog', title: 'Best Practices for Flight Search', path: '/blog/flight-search-best-practices', category: 'Blog', description: 'Optimize your flight search implementation' },
  ], []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      ).slice(0, 8);

      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchableContent]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide results when navigating
  useEffect(() => {
    setShowResults(false);
    setSearchQuery('');
  }, [location.pathname]);

  const handleSearchFocus = () => {
    if (searchResults.length > 0 || searchQuery.length >= 2) {
      setShowResults(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (path) => {
    navigate(path);
    setShowResults(false);
    setSearchQuery('');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'api':
        return <FileText size={16} className="text-blue-600" />;
      case 'doc':
        return <BookOpen size={16} className="text-green-600" />;
      case 'support':
        return <HelpCircle size={16} className="text-purple-600" />;
      case 'blog':
        return <ExternalLink size={16} className="text-orange-600" />;
      default:
        return <Search size={16} className="text-gray-400" />;
    }
  };

  const navLinks = [
    { name: 'PRODUCT CATALOG', path: '/product-catalog' },
    { name: 'GUIDES', path: '/guides' },
    { name: 'SUPPORT', path: '/support' },
    { name: 'BLOG', path: '/blog' },
  ];

  const isActive = (path) => location.pathname === path;

  // Show loading state or navbar
  if (loading) {
    return (
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 lg:h-20">
          {/* Logo Section - Using Image */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={wisefareslogo} 
                alt="Wisefares" 
                className="h-8 w-auto lg:h-10"
              />
              <span className="text-[10px] lg:text-xs text-gray-500 font-light tracking-wider hidden sm:inline">
                DEV STUDIO
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${isActive(link.path)
                    ? 'text-[#1a2b4c] border-b-2 border-[#1a2b4c] pb-1'
                    : 'text-gray-700 hover:text-[#1a2b4c]'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block relative w-80 xl:w-96" ref={searchRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              placeholder="Search APIs, Documentation, Developer Guides"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />

            {/* Search Results Dropdown */}
            {showResults && (searchResults.length > 0 || isSearching) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-xs mt-1">Searching...</p>
                  </div>
                ) : (
                  <>
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.path)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">{getIcon(result.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-[#1a2b4c]">{result.title}</span>
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                {result.category}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{result.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                    {searchResults.length === 0 && searchQuery.length >= 2 && (
                      <div className="p-4 text-center text-gray-500">
                        <p className="text-sm">No results found for "{searchQuery}"</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* User Section - Desktop */}
          <div className="hidden lg:flex items-center ml-4">
            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <Link
                to="/auth"
                className="text-sm font-medium px-4 py-2 rounded-lg transition-colors text-gray-700 hover:text-[#1a2b4c] hover:bg-gray-100"
              >
                SIGN IN
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#1a2b4c] hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="relative mb-4" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                placeholder="Search APIs, Documentation..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />

              {/* Mobile Search Results */}
              {showResults && (searchResults.length > 0 || isSearching) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-xs mt-1">Searching...</p>
                    </div>
                  ) : (
                    <>
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleResultClick(result.path);
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5">{getIcon(result.type)}</div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-[#1a2b4c]">{result.title}</span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                  {result.category}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">{result.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                      {searchResults.length === 0 && searchQuery.length >= 2 && (
                        <div className="p-4 text-center text-gray-500">
                          <p className="text-sm">No results found for "{searchQuery}"</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium py-2 ${
                    isActive(link.path)
                      ? 'text-[#1a2b4c] bg-gray-50 px-3 rounded'
                      : 'text-gray-700 hover:text-[#1a2b4c] px-3'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile User Section */}
              {isLoggedIn ? (
                <div className="px-3 pt-2">
                  <UserDropdown />
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium py-2 px-3 text-gray-700 hover:text-[#1a2b4c]"
                >
                  SIGN IN
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;