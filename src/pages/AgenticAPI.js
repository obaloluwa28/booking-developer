// pages/AgenticAPIsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Menu, Info, X } from 'lucide-react';



const AgenticAPIsPage = () => {


  React.useEffect(() => {
  console.log('AgenticAPIsPage mounted');
  console.log('Current path:', window.location.pathname);
}, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const apiCollections = [];

  const apis = [
    {
      name: "Hotels Price Check API",
      version: "v1 beta",
      badge: "+ Agentic ready",
      description: "This API provides detailed rate information for specific room and rate option.",
      tags: ["HOTELS", "UTILITY", "TRAVEL AGENCY"],
      type: "REST API",
      beta: true,
      category: "Hotels",
      slug: "hotels-price-check-api"
    },
    {
      name: "Hotels Rates API",
      version: "v1 beta",
      badge: "+ Agentic ready",
      description: "The Hotel Rates API provides comprehensive rate and inventory details for a specific hotel property based on...",
      tags: ["HOTELS", "UTILITY", "TRAVEL AGENCY"],
      type: "REST API",
      beta: true,
      category: "Hotels",
      slug: "hotels-rates-api"
    },
    {
      name: "Hotel Search API",
      version: "v1 beta",
      badge: "+ Agentic ready",
      description: "This API lets you perform a broad availability search for hotel properties within a specific geographical area an...",
      tags: ["HOTELS", "UTILITY", "TRAVEL AGENCY"],
      type: "REST API",
      beta: true,
      category: "Hotels",
      slug: "hotel-search-api"
    },
    {
      name: "Booking Management API",
      version: "v1 beta",
      badge: "+ Agentic ready",
      description: "The Booking Management API - Beta allows you to manage Wisefares Reservations (bookings) through a set of filters.",
      tags: ["BOOKING", "TRIP MANAGEMENT", "TRAVEL AGENCY"],
      type: "REST API",
      beta: true,
      category: "Booking",
      slug: "booking-management-api"
    },
    {
      name: "Wisefares Flight Search API",
      version: "v1",
      badge: "+ Agentic ready",
      description: "Wisefares Flight Refresh is an API focused on high-volume itinerary validation workflows, empowering cache-based solutions.",
      tags: ["SEARCH", "AIR", "TRAVEL AGENCY"],
      type: "REST API",
      beta: false,
      category: "Air",
      slug: "wisefares-flight-search-api"
    },
    {
      name: "Wisefares Flight Retrieve API",
      version: "v1",
      badge: "Premium",
      description: "Wisefares Flight Shop Lite is a modern, multi-source shopping API designed to deliver the best available...",
      tags: ["SEARCH", "AIR", "TRAVEL AGENCY"],
      type: "REST API",
      beta: false,
      category: "Air",
      premium: true,
      slug: "wisefares-flight-retrieve-api"
    },
    {
      name: "Flight Reshop API",
      version: "1.0 beta",
      badge: "+ Agentic ready",
      description: "The Flight Reshop API enables the search for applicable itinerary exchange offers for an existing ticket or order...",
      tags: ["SEARCH", "AIR", "TRAVEL AGENCY"],
      type: "REST API",
      beta: true,
      category: "Air",
      slug: "flight-reshop-api"
    },
    {
      name: "Wisefares Flight Check API",
      version: "v1",
      badge: "+ Agentic ready",
      description: "Wisefares Flight Check is a multi-source API that allows customers to recreate valid offers from cached...",
      tags: ["SEARCH", "AIR", "TRAVEL AGENCY"],
      type: "REST API",
      beta: false,
      category: "Air",
      slug: "Wisefares-flight-check-api"
    }
  ];

  const filteredApis = selectedFilter === 'all' 
    ? apis 
    : apis.filter(api => 
        api.category.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        api.tags.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase()))
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-[#1a2b4c] text-white p-4 rounded-full shadow-lg"
      >
        <Menu size={24} />
      </button>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          overflow-y-auto h-screen lg:h-auto
        `}>
          <div className="p-6">
            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-gray-500"
            >
              <X size={20} />
            </button>

            {/* Menu Header */}
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</h2>
              <Link 
                to="/product-catalog/agentic-apis" 
                className="flex items-center justify-between text-[#1a2b4c] font-medium py-2 border-b border-gray-100"
              >
                <span>Explore collection</span>
                <ChevronRight size={16} />
              </Link>
              <Link 
                to="/product-catalog/agentic-apis/about" 
                className="flex items-center text-gray-600 hover:text-[#1a2b4c] py-2 text-sm pl-4"
              >
                <Info size={14} className="mr-2" />
                About
              </Link>
            </div>

            {/* Collections */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">COLLECTIONS</h2>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {apiCollections.map((collection, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFilter(collection.name.toLowerCase())}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                      selectedFilter === collection.name.toLowerCase() 
                        ? 'bg-blue-50 text-[#1a2b4c]' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{collection.icon}</span>
                      <span className="text-sm font-medium">{collection.name}</span>
                    </span>
                    <span className="text-xs text-gray-400">{collection.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-[#003341] border-b border-gray-200 sticky top-5 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center space-x-2 text-sm text-white mb-4">
                <Link to="/" className="hover:text-white">Home</Link>
                <ChevronRight size={14} />
                <Link to="/product-catalog" className="hover:text-white">Product Catalog</Link>
                <ChevronRight size={14} />
                <span className="text-white font-medium">Agentic APIs</span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Agentic APIs</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-white">SEARCH | Wisefares AI | TRAVEL AGENCY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-3">
                Wisefares's Agentic-Ready APIs
              </h2>
              <h3 className="text-lg text-gray-700 mb-4">
                Powering the future of AI-infused travel
              </h3>
              <p className="text-gray-600 max-w-3xl mb-4">
                For product managers, application architects, and engineering directors shaping the future of travel, 
                Wisefares introduces its <span className="font-semibold text-[#1a2b4c]">Agentic-ready APIs</span>: A meticulously 
                adapted selection of our battle-tested travel technology APIs, engineered specifically for seamless 
                integration with your LLM-based applications.
              </p>
              <Link 
                to="/guides/agentic-apis" 
                className="inline-flex items-center text-[#1a2b4c] font-medium hover:underline"
              >
                Read more <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Reference Documents Title */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#1a2b4c]">Reference Documents:</h3>
            </div>

            {/* API Grid */}
            <div className="space-y-4">
              {filteredApis.map((api, index) => (
               <Link
  key={index}
  to={`/product-catalog/agentic-apis/${api.slug}`}
  onClick={(e) => {
    console.log('=== LINK CLICKED ===');
    console.log('API name:', api.name);
    console.log('API slug:', api.slug);
    console.log('Full URL:', `/product-catalog/agentic-apis/${api.slug}`);
    // Don't prevent default, let it navigate
  }}
  className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
>
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {api.badge && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${api.badge.includes('Agentic') 
                            ? 'bg-green-100 text-green-700' 
                            : api.badge === 'Premium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {api.badge}
                        </span>
                      )}
                      <h4 className="text-xl font-bold text-[#1a2b4c]">{api.name}</h4>
                    </div>
                    <span className="text-xs text-gray-400">{api.type}</span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-sm text-gray-500">{api.version}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {api.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {api.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AgenticAPIsPage;