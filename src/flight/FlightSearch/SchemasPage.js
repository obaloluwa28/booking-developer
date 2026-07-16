import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Menu,
  Home,
  Download,
  ChevronDown
} from 'lucide-react';
import APISidebar from '../../components/APISidebar';

const SchemasPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSchema, setExpandedSchema] = useState(true);
  const [expandedPassengerSchema, setExpandedPassengerSchema] = useState(false);
  const [expandedResponseSchema, setExpandedResponseSchema] = useState(false);
  const [expandedProps, setExpandedProps] = useState({});
  const [expandedNestedProps, setExpandedNestedProps] = useState({});
  const [expandedEnums, setExpandedEnums] = useState({});

  const toggleSchema = () => {
    setExpandedSchema(prev => !prev);
  };

  const togglePassengerSchema = () => {
    setExpandedPassengerSchema(prev => !prev);
  };

  const toggleResponseSchema = () => {
    setExpandedResponseSchema(prev => !prev);
  };

  const toggleProp = (propName) => {
    setExpandedProps(prev => ({
      ...prev,
      [propName]: !prev[propName]
    }));
  };

  const toggleNestedProp = (propName) => {
    setExpandedNestedProps(prev => ({
      ...prev,
      [propName]: !prev[propName]
    }));
  };

  const toggleEnum = (enumName) => {
    setExpandedEnums(prev => ({
      ...prev,
      [enumName]: !prev[enumName]
    }));
  };

  const schemas = {
    FlightSearchRequest: {
      properties: [
        {
          name: 'origin',
          required: true,
          type: 'string',
          example: 'LOS',
          description: 'IATA code of departure airport'
        },
        {
          name: 'destination',
          required: true,
          type: 'string',
          example: 'DOH',
          description: 'IATA code of arrival airport'
        },
        {
          name: 'start_date',
          required: true,
          type: 'string($date)',
          example: '03-02-2026',
          description: 'Departure date (DD-MM-YYYY)'
        },
        {
          name: 'return_date',
          required: false,
          type: 'string($date)',
          example: '09-02-2026',
          description: 'Return date (Required if tripType is return)'
        },
        {
          name: 'tripType',
          required: true,
          type: 'string',
          example: 'return',
          description: 'Type of trip',
          enum: ['one-way', 'return', 'multi-city']
        },
        {
          name: 'class',
          required: true,
          type: 'string',
          example: 'economy',
          description: 'Travel class',
          enum: ['economy', 'business', 'first']
        },
        {
          name: 'pax',
          required: true,
          type: 'PassengerDetails',
          description: 'Passenger details',
          nested: true,
          nestedProperties: [
            {
              name: 'adults',
              required: true,
              type: 'integer',
              minimum: 1,
              example: 2,
              description: 'Number of adult passengers'
            },
            {
              name: 'children',
              required: false,
              type: 'integer',
              minimum: 0,
              example: 1,
              description: 'Number of child passengers'
            },
            {
              name: 'infants',
              required: false,
              type: 'integer',
              minimum: 0,
              example: 1,
              description: 'Number of infant passengers'
            }
          ]
        }
      ]
    },
    PassengerDetails: {
      properties: [
        {
          name: 'adults',
          required: true,
          type: 'integer',
          minimum: 1,
          example: 2,
          description: 'Number of adult passengers'
        },
        {
          name: 'children',
          required: false,
          type: 'integer',
          minimum: 0,
          example: 1,
          description: 'Number of child passengers'
        },
        {
          name: 'infants',
          required: false,
          type: 'integer',
          minimum: 0,
          example: 1,
          description: 'Number of infant passengers'
        }
      ]
    },
    FlightSearchResponse: {
      properties: [
        {
          name: 'searchId',
          required: true,
          type: 'string($uuid)',
          example: '245bb6c4-5ff9-4052-445f-b3e962194b91',
          description: 'Unique identifier for the flight search session'
        },
        {
          name: 'searchRequestId',
          required: true,
          type: 'integer',
          example: 223,
          description: 'Internal request tracking ID'
        },
        {
          name: 'status',
          required: true,
          type: 'string',
          example: 'searching',
          description: 'Current search status',
          enum: ['searching', 'completed', 'failed']
        },
        {
          name: 'message',
          required: true,
          type: 'string',
          example: 'Search initiated across multiple GDS systems',
          description: 'Status message'
        }
      ]
    }
  };

  const renderNestedProperty = (nestedProp, parentName) => {
    const nestedKey = `${parentName}-${nestedProp.name}`;
    const isExpanded = expandedNestedProps[nestedKey];

    return (
      <div className="space-y-2">
        <div className="flex items-start">
          <div className="min-w-[80px] flex items-center">
            <span className="text-sm text-[#1a2b4c] font-mono">{nestedProp.name}</span>
            {nestedProp.required && <span className="text-red-500 text-xs ml-1">*</span>}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNestedProp(nestedKey);
              }}
              className="flex items-center ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-0.5 rounded">
                {nestedProp.type}
              </span>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="ml-[88px] mt-2 space-y-2 border-l-2 border-green-200 pl-4">
            {nestedProp.minimum !== undefined && (
              <div className="text-xs text-gray-500">
                minimum: {nestedProp.minimum}
              </div>
            )}
            <div className="text-sm text-gray-500">
              example: <span className="font-mono text-gray-600">{nestedProp.example}</span>
            </div>
            <div className="text-sm text-gray-600">
              {nestedProp.description}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderProperty = (prop) => {
    const propKey = `FlightSearchRequest-${prop.name}`;
    const isExpanded = expandedProps[propKey];
    const isEnumExpanded = expandedEnums[prop.name];

    if (prop.nested) {
      return (
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-[#1a2b4c] min-w-[100px]">{prop.name}</span>
            {prop.required && <span className="text-red-500 text-xs ml-1">*</span>}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleProp(propKey);
              }}
              className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              {!isExpanded && <span className="text-gray-400 ml-1">[...]</span>}
            </button>
          </div>

          {isExpanded && (
            <div className="ml-6 mt-3 space-y-4 border-l-2 border-blue-200 pl-4">
              <div className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded">
                {prop.type}
              </div>

              {/* PassengerDetails properties with arrows next to names */}
              <div className="space-y-4">
                {prop.nestedProperties.map((nestedProp, idx) => (
                  <div key={idx}>
                    {renderNestedProperty(nestedProp, prop.name)}
                    {idx < prop.nestedProperties.length - 1 && (
                      <div className="border-b border-gray-100 my-3"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="text-[#1a2b4c] min-w-[100px]">{prop.name}</span>
          {prop.required && <span className="text-red-500 text-xs ml-1">*</span>}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleProp(propKey);
            }}
            className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            {!isExpanded && <span className="text-gray-400 ml-1">[...]</span>}
          </button>
        </div>

        {isExpanded && (
          <div className="ml-6 mt-3 space-y-3 border-l-2 border-blue-200 pl-4">
            <div className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-1 rounded">
              ▼ {prop.type}
            </div>
            <div className="text-sm text-gray-500">
              example: <span className="font-mono text-gray-600">{prop.example}</span>
            </div>
            <div className="text-sm text-gray-600">
              {prop.description}
            </div>
            {prop.enum && (
              <div className="mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEnum(prop.name);
                  }}
                  className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <span>Enum:</span>
                  {isEnumExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {isEnumExpanded && (
                  <div className="mt-2 text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded">
                    [ {prop.enum.join(', ')} ]
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderPassengerProperty = (prop) => {
    const propKey = `PassengerDetails-${prop.name}`;
    const isExpanded = expandedProps[propKey];

    return (
      <div className="space-y-2">
        <div className="flex items-start">
          <div className="min-w-[100px] flex items-center">
            <span className="text-sm text-[#1a2b4c] font-mono">{prop.name}</span>
            {prop.required && <span className="text-red-500 text-xs ml-1">*</span>}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleProp(propKey);
              }}
              className="flex items-center ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>
          <div className="flex-1">
            <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-0.5 rounded">
              {prop.type}
            </span>
          </div>
        </div>

        {isExpanded && (
          <div className="ml-[108px] mt-2 space-y-2 border-l-2 border-blue-200 pl-4">
            {prop.minimum !== undefined && (
              <div className="text-xs text-gray-500">
                minimum: {prop.minimum}
              </div>
            )}
            <div className="text-sm text-gray-500">
              example: <span className="font-mono text-gray-600">{prop.example}</span>
            </div>
            <div className="text-sm text-gray-600">
              {prop.description}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderResponseProperty = (prop) => {
    const propKey = `FlightSearchResponse-${prop.name}`;
    const isExpanded = expandedProps[propKey];
    const isEnumExpanded = expandedEnums[prop.name];

    return (
      <div className="space-y-2">
        <div className="flex items-start">
          <div className="min-w-[120px] flex items-center">
            <span className="text-sm text-[#1a2b4c] font-mono">{prop.name}</span>
            {prop.required && <span className="text-red-500 text-xs ml-1">*</span>}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleProp(propKey);
              }}
              className="flex items-center ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-0.5 rounded">
                {prop.type}
              </span>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="ml-[128px] mt-2 space-y-2 border-l-2 border-blue-200 pl-4">
            <div className="text-sm text-gray-500">
              example: <span className="font-mono text-gray-600">{prop.example}</span>
            </div>
            <div className="text-sm text-gray-600">
              {prop.description}
            </div>
            {prop.enum && (
              <div className="mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEnum(prop.name);
                  }}
                  className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <span>Enum:</span>
                  {isEnumExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {isEnumExpanded && (
                  <div className="mt-2 text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded">
                    [ {prop.enum.join(', ')} ]
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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
          apiName="Sabre Flight Search API"
          basePath="wisefares-flight-search-api"
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
                  Sabre Flight Search API
                </Link>
                <ChevronRight size={14} />
                <span className="text-white font-medium">Schemas</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Schemas</h1>
                  <p className="text-white">Data models used in the Flight Search API</p>
                </div>
                <button className="flex items-center space-x-2 text-white border border-[#1a2b4c] px-4 py-2 rounded-lg hover:bg-[#1a2b4c] hover:text-white transition-colors">
                  <Download size={18} />
                  <span>Download YAML</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* FlightSearchRequest Schema - First div */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">FlightSearchRequest</span>
                      <button
                        onClick={toggleSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.FlightSearchRequest.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* PassengerDetails Schema - Second div */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-5">
                <div className="flex items-start">
                  <div className="min-w-[200px] flex items-center">
                    <span className="text-xl font-semibold text-[#1a2b4c]">PassengerDetails</span>
                    <button
                      onClick={togglePassengerSchema}
                      className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {expandedPassengerSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                  </div>

                  {expandedPassengerSchema && (
                    <div className="flex-1 font-mono text-sm text-gray-700">
                      {'{'}
                      <div className="ml-6 space-y-4 mt-2">
                        {schemas.PassengerDetails.properties.map((prop, idx) => (
                          <div key={idx}>
                            {renderPassengerProperty(prop)}
                          </div>
                        ))}
                      </div>
                      {'}'}
                    </div>
                  )}

                  {!expandedPassengerSchema && (
                    <div className="flex-1 font-mono text-sm text-gray-400 italic">
                      {'{ ... }'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* FlightSearchResponse Schema - Third div */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-5">
                <div className="flex items-start">
                  <div className="min-w-[200px] flex items-center">
                    <span className="text-xl font-semibold text-[#1a2b4c]">FlightSearchResponse</span>
                    <button
                      onClick={toggleResponseSchema}
                      className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {expandedResponseSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                  </div>

                  {expandedResponseSchema && (
                    <div className="flex-1 font-mono text-sm text-gray-700">
                      {'{'}
                      <div className="ml-6 space-y-4 mt-2">
                        {schemas.FlightSearchResponse.properties.map((prop, idx) => (
                          <div key={idx}>
                            {renderResponseProperty(prop)}
                          </div>
                        ))}
                      </div>
                      {'}'}
                    </div>
                  )}

                  {!expandedResponseSchema && (
                    <div className="flex-1 font-mono text-sm text-gray-400 italic">
                      {'{ ... }'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Example Request */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-[#1a2b4c] mb-4">Example Request</h2>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {`{
                "origin": "LOS",
                "destination": "DOH",
                "start_date": "03-02-2026",
                "return_date": "09-02-2026",
                "tripType": "return",
                "class": "economy",
                "pax": {
                    "adults": 2,
                    "children": 1,
                    "infants": 1
                }
                }`}
              </pre>
            </div>

            {/* Example Response */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-[#1a2b4c] mb-4">Example Response</h2>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {`{
                "searchId": "245bb6c4-5ff9-4052-445f-b3e962194b91",
                "searchRequestId": 223,
                "status": "searching",
                "message": "Search initiated across multiple GDS systems"
                }`}
              </pre>
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

export default SchemasPage;