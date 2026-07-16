// flight/FlightSearch/ReleaseNotesPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Menu,
  Home,
  Download,
  Calendar,
  Tag,
  Globe,
  FileJson,
  Link as LinkIcon
} from 'lucide-react';
import APISidebar from '../../components/APISidebar';

const ReleaseNotesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        {/* Sidebar Component */}
        <APISidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          apiName="Wisefares Flight Search API"
          basePath="wisefares-flight-search-api"
          endpointName="flightsearch"
          httpMethod="POST"
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-72 min-h-screen">
          {/* Header */}
          <div className="bg-[#003341] border-b border-gray-200 sticky top-6 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center space-x-2 text-sm text-white mb-4">
                <Link to="/" className="hover:text-white flex items-center">
                  <Home size={14} className="mr-1" />
                  Home
                </Link>
                <ChevronRight size={14} />
                <Link to="/product-catalog" className="hover:text-white">Product Catalog</Link>
                <ChevronRight size={14} />
                <Link to="/product-catalog/agentic-apis" className="hover:text-white">Agentic APIs</Link>
                <ChevronRight size={14} />
                <Link to="/product-catalog/agentic-apis/wisefares-flight-search-api" className="hover:text-white">
                  Wisefares Flight Search API
                </Link>
                <ChevronRight size={14} />
                <span className="text-white font-medium">Release Notes</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Release Notes</h1>
                  <p className="text-white">Version history and updates for the Flight Search API</p>
                </div>
                <button className="hidden lg:flex items-center space-x-2 text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#003341] transition-colors">
                  <Download size={18} />
                  <span>Download Changelog</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Release Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              {/* Release Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar size={20} className="text-[#1a2b4c]" />
                      <h2 className="text-2xl font-bold text-[#1a2b4c]">1.0 - January 30, 2026</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag size={16} className="text-green-600" />
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Latest Release
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-6xl font-bold text-blue-200 opacity-50">v1</span>
                  </div>
                </div>
              </div>

              {/* Release Content */}
              <div className="p-8">
                {/* Version Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#1a2b4c] mb-4 flex items-center">
                    <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
                    Version Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      This is the first release of the wisefares Flight Search API.
                    </p>
                    
                    <div className="mt-4 space-y-2 text-gray-600">
                      <p className="flex items-start">
                        <span className="font-semibold min-w-[100px]">Version:</span>
                        <span className="font-mono text-[#1a2b4c]">v1</span>
                      </p>
                      <p className="flex items-start">
                        <span className="font-semibold min-w-[100px]">Release Date:</span>
                        <span>January 30, 2026</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* API Information Table */}
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2b4c] mb-4 flex items-center">
                    <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
                    API Information
                  </h3>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 bg-gray-50 w-1/3">
                            <div className="flex items-center space-x-2">
                              <Tag size={16} className="text-[#1a2b4c]" />
                              <span>Version</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <code className="bg-blue-50 text-[#1a2b4c] px-3 py-1 rounded-full font-mono">v1</code>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 bg-gray-50">
                            <div className="flex items-center space-x-2">
                              <Globe size={16} className="text-[#1a2b4c]" />
                              <span>Environment</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Production</span>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 bg-gray-50">
                            <div className="flex items-center space-x-2">
                              <FileJson size={16} className="text-[#1a2b4c]" />
                              <span>Format</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono">JSON</code>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 bg-gray-50">
                            <div className="flex items-center space-x-2">
                              <LinkIcon size={16} className="text-[#1a2b4c]" />
                              <span>Endpoint</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <code className="bg-gray-100 px-3 py-1.5 rounded text-sm font-mono text-[#1a2b4c]">
                              /v1/offers/flightsearch/
                            </code>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* What's New Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-[#1a2b4c] mb-4">What's New in v1.0</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                      <span className="text-gray-700">Initial release of the wisefares Flight Search API</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                      <span className="text-gray-700">Support for open date and open destination searches</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                      <span className="text-gray-700">Multi-source content including GDS, NDC, and LCC</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></span>
                      <span className="text-gray-700">Cache-based shopping for fast response times</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Back button */}
            <div className="flex justify-center mt-8">
              <Link
                to="/product-catalog/agentic-apis/wisefares-flight-search-api"
                className="inline-flex items-center px-6 py-3 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#0f1a2c] transition-colors"
              >
                <ChevronRight size={20} className="mr-2 rotate-180" />
                Back to API Overview
              </Link>
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

export default ReleaseNotesPage;
