import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, Home } from 'lucide-react';
import APISidebar from '../../components/APISidebar';

const WisefaresFlightSearchAPIPage = () => {
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
                <span className="text-white font-medium">Wisefares Flight Search API</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Wisefares Flight Search API</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 font-mono rounded">v1</span>
                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-full">
                      + Agentic ready
                    </span>
                    {/* <span className="text-xs text-gray-500">Updated Jan 30, 2026</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Documentation Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Title with version */}
            <div className="mb-8">
              <p className="text-gray-600">Cache-based flight shopping API for intelligent travel search</p>
            </div>

            {/* Overview Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">WisefaresFlight Search API Overview</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2b4c] mb-3">What is it?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    WisefaresFlight Search API lets you efficiently search across large date and geography ranges as part of Wisefares's modern services, helping travel platforms return intelligent, flexible, content-rich results that inspire travelers and improve flight shopping decisions. The API is a modern, cache-based shopping API designed to support open origin or destination, and open date search scenarios across multi-source flight content, enabling travel platforms to deliver personalized and exploratory travel experiences. Responses can be queried from a custom cache maintained for the subscriber, as well as from public cache, or API subscribers' private content, if needed.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a2b4c] mb-2">WisefaresFlight Search API is capable of:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Searching across large date and geography ranges: Allows exploring destinations from an airport or city to anywhere (empty, airport, city, country, region, theme), anytime (with default ranges)</li>
                    <li>Comparing travel dates: Ability to compare trips, for e.g., 7 or 8 days and thereby select a trip based on price and location (offer leisure travelers with flexible travel dates the best destinations based on a specified length of stay)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a2b4c] mb-2">from a request perspective:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Open Date (departure date range, length of stay)</li>
                    <li>Open Destination or Open Origin</li>
                    <li>Search preferences that include the ability to specify a region, theme, or multiple lengths of stay</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a2b4c] mb-2">from a content perspective:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Public Cached content</li>
                    <li>Private Custom Cached content</li>
                    <li>3rd Party pushed content</li>
                    <li>Support for other multi-source/multi-provider/multi-distribution cached content like NDC Cache/LCC Cache (when made available)</li>
                  </ul>
                </div>

                {/* <div>
                  <h4 className="font-semibold text-[#1a2b4c] mb-2">from a response perspective:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Full offer detail, itinerary and fare information</li>
                    <li>Price only, for leads fares</li>
                  </ul>
                </div> */}
              </div>
            </div>

            {/* Why use it section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">Why use it?</h2>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-[#1a2b4c] font-bold">•</span>
                  <div>
                    <span className="font-semibold text-[#1a2b4c]">Inspire your customer with booking ideas for the perfect destination:</span>
                    <span className="text-gray-700"> As customers identify preferences such as activity or geographical regions, WisefaresFlight Search API gives you the flexibility to return top destinations within those preferences, which helps improve conversions from looking to booking.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#1a2b4c] font-bold">•</span>
                  <div>
                    <span className="font-semibold text-[#1a2b4c]">Leverage our comprehensive air shopping cache databases:</span>
                    <span className="text-gray-700"> Enable efficient searches across large date and geographical ranges and points of sale with flexible, advanced search capabilities.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#1a2b4c] font-bold">•</span>
                  <div>
                    <span className="font-semibold text-[#1a2b4c]">Lightweight, easy-to-use and mobile friendly:</span>
                    <span className="text-gray-700"> Instant access with sub-second results that can be easily integrated in a variety of applications and widgets, from calendar search to theme-based destination offerings.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">Use Cases</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#1a2b4c] mb-2">Overall lowest and non-stop fares at a glance:</h3>
                  <p className="text-gray-700">You could use this API to create a graphical user interface to chart up to 330 days of the lowest published, private fares for a popular destination or city pair. Combined it with multiple length of stay functionality. From this chart, leisure travelers with flexible travel dates and longer advanced purchase windows can compare flight prices up to 330 days from a specified departure date.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2b4c] mb-2">Map mode:</h3>
                  <p className="text-gray-700">Create different GUI modes (e.g., Google Flights 'map mode') where lowest offer per date range within month returned or choose as a destination finder where "lowest per every single day" or "lowest per date range" is returned.</p>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">How it works</h2>

              <div className="mb-4">
                <code className="bg-gray-100 px-3 py-1.5 rounded text-sm font-mono">/flight/Search</code>
              </div>

              <p className="text-gray-700 mb-4">To retrieve flight options, send a call to <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/flight/Search</code>. The Flight Search API returns results that match the requested criteria by completing the following steps:</p>

              <ol className="list-decimal pl-5 space-y-2 text-gray-700 mb-6">
                <li>Search for flight options by lowest fare and requested filter parameters.</li>
                <li>Returns a response containing available offers matching the request criteria.</li>
              </ol>

              <p className="text-gray-700 mb-4">
                <strong className="text-[#1a2b4c]">WisefaresFlight Search API</strong> is available via JSON REST technology and uses the multi-source engine to retrieve shopped fare data for a given origin or destination available in the Wisefarescache (public, private and 3rd party content). In total, each request returns a nonstop lead fare and an overall lead fare available to every destination or origin in the world for which lead fares are found.
              </p>

              <p className="text-gray-700 mb-4">
                The API supports retrieving shopped fare data for a given city pair/departure date available in the Wisefarescache (public, private and 3rd party content).
              </p>

              <p className="text-gray-700 mb-4">
                When you include the required parameters, each request returns a nonstop lead fare and an overall lead fare for each of the next 330 consecutive days from the API request.
              </p>

              <p className="text-gray-700 mb-4">
                The API allows searching from airport or city to anywhere (empty, airport, city, country, region, theme), anytime (with default ranges).
              </p>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-[#1a2b4c]">The API supports <span className="italic">Open Date</span> search parameters:</p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Offers for a given departure date, date range and length of stay</li>
                    <li>Grouped by day, date range and or month</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#1a2b4c]">The API supports <span className="italic">Open Destination</span> search parameters:</p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Offers for a broad set of destinations, for a given origin</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How to use */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">How to use</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#1a2b4c] mb-2">Authentication</h3>
                  <p className="text-gray-700">You must provide an authentication token to all endpoints within the Flight Search API. Tokens can be obtained from the OAuth Token Create API.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1a2b4c] mb-2">Endpoint</h3>
                  <code className="bg-gray-100 px-3 py-1.5 rounded text-sm font-mono">flight/search/</code>
                  <p className="text-gray-700 mt-2">To retrieve offers matching your preferred search parameters, send a POST request to the endpoint.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a2b4c] mb-2">Example Request:</h4>
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

                <div>
                  <h4 className="font-semibold text-[#1a2b4c] mb-2">Example Response:</h4>
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
            </div>

            {/* Back to list button */}
            <div className="flex justify-center mt-8">
              <Link
                to="/product-catalog/agentic-apis"
                className="inline-flex items-center px-6 py-3 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#0f1a2c] transition-colors"
              >
                <ChevronRight size={20} className="mr-2 rotate-180" />
                Back to Agentic APIs
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

export default WisefaresFlightSearchAPIPage;