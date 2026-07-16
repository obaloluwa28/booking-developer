// flight/FlightSearch/ErrorsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  Menu,
  Home,
  Download,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Server,
  XCircle
} from 'lucide-react';
import APISidebar from '../../components/APISidebar';

const ErrorsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    introduction: true,
    transportLayer: true,
    applicationLayer: true,
    errorExamples: true
  });

  // Scroll to section based on URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const transportErrors = [
    {
      status: 400,
      statusText: 'Bad request',
      type: 'Validation',
      errorCode: 'Invalid parameters',
      message: 'Invalid date format. Use DD-MM-YYYY.',
      rootCause: 'Using wrong date format.',
      solution: 'Verify your date format(DD-MM-YYYY).'
    },
    {
      status: 422,
      statusText: 'NotProcessed',
      type: 'Validation',
      errorCode: 'Validation Error',
      message: 'Authentication data is missing.',
      rootCause: 'Return date is required for return trips.',
      solution: 'Provide return date for round trips.'
    }
  ];

  const serverErrors = [
    {
      status: 500,
      statusText: 'NotProcessed',
      type: 'Server Error',
      errorCode: 'n/a',
      message: 'n/a',
      rootCause: 'API encountered an unexpected condition that prevented it from fulfilling the client\'s request.',
      solution: 'Wait at least 500 milliseconds and resend the request.'
    },
    {
      status: 503,
      statusText: 'NotProcessed',
      type: 'Service Unavailable',
      errorCode: 'n/a',
      message: 'Server is currently unavailable. Please try again later and report if the problem persists.',
      rootCause: 'Server is down or under maintenance.',
      solution: 'Wait at least 500 milliseconds and resend the request.'
    },
    {
      status: 504,
      statusText: 'NotProcessed',
      type: 'Gateway Timeout',
      errorCode: 'n/a',
      message: 'Server timed out trying to fulfill the request. Please try again later and report if the problem persists.',
      rootCause: 'Server is down or under maintenance.',
      solution: 'Wait at least 500 milliseconds and resend the request.'
    }
  ];

  const applicationErrors = [
    {
      category: 'BAD_REQUEST',
      examples: [
      {
        type: 'INVALID_PARAMETERS',
        description: 'Occurs when one or more request parameters contain invalid or unsupported values.',
        rootCause: 'Incorrect value or format provided in one or more parameters.',
        solution: 'Validate parameter formats and ensure values comply with the API documentation.',
        example: {
            "success": false,
            "error": {
            "code": "INVALID_PARAMETERS",
            "message": "Invalid date format. Use DD-MM-YYYY"
            }
        }
        },
        {
          type: 'VALIDATION ERROR',
          description: 'The request is missing mandatory data.',
          rootCause: 'Incorrect request data provided.',
          solution: 'Check the required parameters in the API documentation.',
          example: {
            "success": false,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Return date is required for return trips"
            }
         }
        }
      ]
    },
    {
      category: 'INTERNAL SERVER ERROR',
  examples: [
  {
    type: 'INTERNAL_ERROR',
    description: 'Occurs when the system encounters an unexpected condition during execution.',
    rootCause: 'Unhandled server-side exception or dependency failure.',
    solution: 'Investigate server logs and verify system dependencies.',
    example: {
      "success": false,
      "error": {
        "code": "INTERNAL_ERROR",
        "message": "An unexpected error occurred"
      }
    }
  }
]
    },
    {
      category: 'FORBIDDEN',
      examples: [
        {
          type: 'FORBIDDEN_CUSTOMER_CODE',
          description: 'Client provided wrong customer code in the request.',
          rootCause: 'Incorrect request data provided.',
          solution: 'Check the allowed values in the API documentation.',
          example: {
            timestamp: '2026-07-03T07:29:10.737Z',
            errors: [
              {
                category: 'FORBIDDEN',
                type: 'FORBIDDEN_CUSTOMER_CODE',
                description: 'Client provided wrong customer code in the request.',
                fieldName: 'pseudoCityCode',
                fieldPath: 'processingOptions.pseudoCityCode',
                fieldValue: 'ABC1'
              }
            ]
          }
        }
      ]
    }
  ];

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
                <span className="text-white font-medium">Errors</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Errors</h1>
                  <p className="text-white">Error handling and response codes for the Flight Search API</p>
                </div>
                <button className="hidden lg:flex items-center space-x-2 text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#003341] transition-colors">
                  <Download size={18} />
                  <span>Download Error Spec</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Introduction Section */}
            <div id="introduction" className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8 scroll-mt-24">
              <button
                onClick={() => toggleSection('introduction')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <AlertCircle size={20} className="text-[#1a2b4c]" />
                  <h2 className="text-xl font-semibold text-[#1a2b4c]">Introduction</h2>
                </div>
                {expandedSections.introduction ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {expandedSections.introduction && (
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    This API follows the Remote Procedure Call (RPC) programming pattern. To understand the root cause and the solution to a problem, it's important to identify the layer to which the error belongs.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mt-4">
                    <h3 className="font-semibold text-[#1a2b4c] mb-2">Error Object Properties</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">status</span>: The status of the error, indicating whether the request was processed or not.</li>
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">type</span>: An application-specific error type, or one from the list of typical Sabre API errors.</li>
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">errorCode</span>: A specific code representing the error.</li>
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">timeStamp</span>: Provides the exact point in time, expressed in UTC, when the response was generated.</li>
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">message</span>: A human-readable description of what went wrong.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Transport Layer Section */}
            <div id="transport-layer" className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8 scroll-mt-24">
              <button
                onClick={() => toggleSection('transportLayer')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <Server size={20} className="text-[#1a2b4c]" />
                  <h2 className="text-xl font-semibold text-[#1a2b4c]">Transport Layer</h2>
                </div>
                {expandedSections.transportLayer ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {expandedSections.transportLayer && (
                <div className="p-6">
                  <p className="text-gray-700 mb-6">
                    Transport oriented errors are returned as HTTP statuses and can be accompanied by more details in the response to the JSON message.
                  </p>
                </div>
              )}
            </div>

            {/* Client Errors Section (4xx) */}
            <div id="client-errors" className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8 scroll-mt-24">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2b4c]">HTTP Status 4XX</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">HTTP Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">ErrorCode</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Message</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Root Cause</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Solution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transportErrors.map((error, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-mono text-red-600">{error.status}</td>
                          <td className="px-4 py-3 text-sm">{error.statusText}</td>
                          <td className="px-4 py-3 text-sm">{error.type}</td>
                          <td className="px-4 py-3 text-sm font-mono">{error.errorCode}</td>
                          <td className="px-4 py-3 text-sm">{error.message}</td>
                          <td className="px-4 py-3 text-sm">{error.rootCause}</td>
                          <td className="px-4 py-3 text-sm">{error.solution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Server Errors Section (5xx) */}
            <div id="server-errors" className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8 scroll-mt-24">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2b4c]">HTTP Status 5XX</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">HTTP Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">ErrorCode</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Message</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Root Cause</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b">Solution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {serverErrors.map((error, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-mono text-red-600">{error.status}</td>
                          <td className="px-4 py-3 text-sm">{error.statusText}</td>
                          <td className="px-4 py-3 text-sm">{error.type}</td>
                          <td className="px-4 py-3 text-sm font-mono">{error.errorCode}</td>
                          <td className="px-4 py-3 text-sm">{error.message}</td>
                          <td className="px-4 py-3 text-sm">{error.rootCause}</td>
                          <td className="px-4 py-3 text-sm">{error.solution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Application Layer Section */}
            <div id="application-layer" className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8 scroll-mt-24">
              <button
                onClick={() => toggleSection('applicationLayer')}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <XCircle size={20} className="text-[#1a2b4c]" />
                  <h2 className="text-xl font-semibold text-[#1a2b4c]">Application Layer</h2>
                </div>
                {expandedSections.applicationLayer ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {expandedSections.applicationLayer && (
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    Application oriented errors are returned as HTTP status <code className="bg-gray-100 px-2 py-0.5 rounded">200</code> and will always be accompanied by more details in the response to the JSON message.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-[#1a2b4c] mb-2">Error Structure</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">timestamp</span>: Provides the exact point in time, expressed in UTC, when the response was generated.</li>
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">errors</span>: An array containing detailed error information. Each item in the array is an Error object.</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-[#1a2b4c] mb-2">Error Object Properties</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">category</span>: A high-level grouping of errors indicating what kind of (client-side or server-side) problem occurred.</li>
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">type</span>: An application-specific error type, or one from the list of typical Sabre API errors.</li>
                      <li><span className="font-mono text-sm bg-gray-200 px-1 rounded">description</span>: A human-readable description of what went wrong with enough information that a software developer can use.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Bad Request Section */}
            <div id="bad-request" className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8 scroll-mt-24">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2b4c]">Category: BAD_REQUEST</h3>
              </div>
              <div className="p-6">
                {applicationErrors[0].examples.map((error, errIdx) => (
                  <div key={errIdx} className="mb-6 last:mb-0">
                    <div className="bg-gray-50 p-4 rounded-lg mb-3">
                      <div className="grid grid-cols-3 gap-4 mb-2">
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase">Type</span>
                          <p className="font-mono text-sm text-[#1a2b4c]">{error.type}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-xs font-semibold text-gray-500 uppercase">Description</span>
                          <p className="text-sm text-gray-700">{error.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase">Root Cause</span>
                          <p className="text-sm text-gray-700">{error.rootCause}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase">Solution</span>
                          <p className="text-sm text-gray-700">{error.solution}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                      <pre>{JSON.stringify(error.example, null, 2)}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invalid Data Section */}
            <div id="invalid-data" className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8 scroll-mt-24">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2b4c]">Category: INVALID_DATA</h3>
              </div>
              <div className="p-6">
                {applicationErrors[1].examples.map((error, errIdx) => (
                  <div key={errIdx} className="mb-6 last:mb-0">
                    <div className="bg-gray-50 p-4 rounded-lg mb-3">
                      <div className="grid grid-cols-3 gap-4 mb-2">
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase">Type</span>
                          <p className="font-mono text-sm text-[#1a2b4c]">{error.type}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-xs font-semibold text-gray-500 uppercase">Description</span>
                          <p className="text-sm text-gray-700">{error.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase">Root Cause</span>
                          <p className="text-sm text-gray-700">{error.rootCause}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase">Solution</span>
                          <p className="text-sm text-gray-700">{error.solution}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                      <pre>{JSON.stringify(error.example, null, 2)}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forbidden Section */}
            <div id="forbidden" className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8 scroll-mt-24">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#1a2b4c]">Category: FORBIDDEN</h3>
              </div>
              <div className="p-6">
                {applicationErrors[2].examples.map((error, errIdx) => (
                  <div key={errIdx} className="mb-6 last:mb-0">
                    <div className="bg-gray-50 p-4 rounded-lg mb-3">
                      <div className="grid grid-cols-3 gap-4 mb-2">
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase">Type</span>
                          <p className="font-mono text-sm text-[#1a2b4c]">{error.type}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-xs font-semibold text-gray-500 uppercase">Description</span>
                          <p className="text-sm text-gray-700">{error.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase">Root Cause</span>
                          <p className="text-sm text-gray-700">{error.rootCause}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase">Solution</span>
                          <p className="text-sm text-gray-700">{error.solution}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                      <pre>{JSON.stringify(error.example, null, 2)}</pre>
                    </div>
                  </div>
                ))}
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

export default ErrorsPage;