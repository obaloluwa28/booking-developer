// components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ProductCard = ({ title, description, version, badge, tags, slug }) => {
  // Define path mappings for different product types
  const pathMappings = {
    // Agentic APIs collection
    "agentic-apis": "/product-catalog/agentic-apis",
    
    // AI for Developers products
    "ai-for-developers": "/product-catalog/ai-for-developers",
    "car-apis": "/product-catalog/car-apis",
    
    // Wisefares IQ
    "wisefares-iq": "/product-catalog/wisefares-iq",
    
    // Flight APIs (go to agentic-apis subfolder)
    "wisefares-flight-search-api": "/product-catalog/agentic-apis/wisefares-flight-search-api",
    "wisefares-flight-retrieve-api": "/product-catalog/agentic-apis/wisefares-flight-retrieve-api",
    
    // Hotel API
    "hotel-api": "/product-catalog/hotel-api",
    
    // Default pattern for other products
    "default": "/product-catalog/"
  };

  // Get the path based on slug
  const getProductPath = () => {
    if (pathMappings[slug]) {
      return pathMappings[slug];
    }
    // Default fallback
    return `${pathMappings.default}${slug}`;
  };

  return (
    <Link to={getProductPath()} className="block group">
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-[#1a2b4c] group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          {badge && (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              badge.includes('Agentic') 
                ? 'bg-green-100 text-green-700' 
                : badge === 'Premium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {badge}
            </span>
          )}
        </div>
        
        <div className="mb-3">
          <span className="text-sm text-gray-500">v{version}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex items-center text-[#1a2b4c] text-sm font-medium group-hover:text-blue-600">
          <span>Learn more</span>
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;