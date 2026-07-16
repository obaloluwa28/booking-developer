// pages/FlightSearchPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, Home, Download,  } from 'lucide-react';
import APISidebar from '../../components/APISidebar';

const FlightSearchPage = () => {
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
  httpMethod='POST'
/>

        {/* Main Content */}
        <div className="flex-1 lg:ml-72 min-h-screen">
          {/* Header */}
          <div className="bg-[#003341] border-b border-gray-200 sticky top-5 z-30">
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
                <span className="text-white font-medium">flightsearch</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">FlightSearch</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 font-mono rounded">v1</span>
                    <span className="text-xs text-white">Wisefares Flight Search API</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">OAS 3.0</span>
                  <button className="flex items-center space-x-2 text-white border border-[#1a2b4c] px-4 py-2 rounded-lg hover:bg-[#1a2b4c] hover:text-white transition-colors">
                    <Download size={18} />
                    <span>Download YAML</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Server Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">

              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">Wisefares Flight Search API</h2>
              <p className="text-gray-700 mb-6">
                Creates a comprehensive flight search across multiple sources for flexible origins, destinations, or dates, utilizing data from both the Wisefares Cache and
              </p>

              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">Servers</h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Current server</p>
                  <code className="text-sm text-[#1a2b4c] font-mono">https://{'{environment}'}.Wisefares.com{'{basePath}'}</code>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Computed URL:</p>
                  <code className="text-sm text-[#1a2b4c] font-mono">https://api.cert.platform.Wisefares.com/v1/offers</code>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-[#1a2b4c] mb-3">Server variables</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-32 text-sm text-gray-600">environment</span>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">api.cert.platform</code>
                    </div>
                    <div className="flex items-center">
                      <span className="w-32 text-sm text-gray-600">basePath</span>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/offers</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* POST /flightSearch Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">POST</span>
                <h2 className="text-2xl font-bold text-[#1a2b4c]">/flightSearch</h2>
              </div>

              <p className="text-gray-700 mb-6">
                Creates a comprehensive flight search across multiple sources for flexible origins, destinations, or dates, utilizing data from both the Wisefares Cache and
              </p>

              {/* Parameters */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1a2b4c] mb-3">PARAMETERS</h3>
                <p className="text-gray-500 italic">No parameters</p>
              </div>

              {/* Request Body */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1a2b4c] mb-3">REQUEST BODY</h3>
                <p className="text-gray-700 mb-4">
                  Search for flight offers using preferred criteria for open dates or destinations. The API allows to search from airport or city to anywhere (empty, airport, city, country, region, theme), anytime (with default ranges).
                </p>

                <h4 className="font-semibold text-[#1a2b4c] mb-2">Example Value (openOriginRequest)</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  {`{
    "origin": "LOS",
    "destination": "DOH",
    "start_date": "03-02-2026",
    "return_date": "09-02-2026",
    "tripType": "return", // one-way, return, muti-city
    "class": "economy",  // economy, business, first
    "pax": {
        "adults": 2,
        "children": 1,
        "infants": 1
    }
}`}
                </pre>
              </div>

              {/* Responses */}
              <div>
                <h3 className="text-lg font-semibold text-[#1a2b4c] mb-3">RESPONSES</h3>

                <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1a2b4c]">200</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Successful response unless errors element is returned. Media type APPLICATION/JSON Controls Accept header.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold text-[#1a2b4c] mb-2">Example Value</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  {`{
    "searchId": "245bb6c4-5ff9-4052-445f-b3e962194b91",
    "searchRequestId": 223,
    "status": "searching",
    "message": "Search initiated across multiple GDS systems"
}`}
                </pre>
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

export default FlightSearchPage;