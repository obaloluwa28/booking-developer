// flight/FlightRetrieve/FlightRetrievePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, Home, Download } from 'lucide-react';
import APISidebar from '../../components/APISidebar';

const FlightRetrievePage = () => {
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
          apiName="Wisefares Flight Retrieve API"
          basePath="wisefares-flight-retrieve-api"
          endpointName="flightretrieve"
          httpMethod='GET'
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
                <Link to="/product-catalog/agentic-apis/wisefares-flight-retrieve-api" className="hover:text-white">
                  Wisefares Flight Retrieve API
                </Link>
                <ChevronRight size={14} />
                <span className="text-white font-medium">flightretrieve</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">flightretrieve</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 font-mono rounded">v1</span>
                    <span className="text-xs text-white">Wisefares Flight Retrieve API</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white">OAS 3.0</span>
                  <button className="flex items-center space-x-2 text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#003341] transition-colors">
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
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">Wisefares Flight Retrieve API</h2>
              <p className="text-gray-700 mb-6">
                Creates a comprehensive flight retrieve operation across multiple sources for flexible origins, destinations, or dates, utilizing data from both the Wisefares Cache and third-party providers.
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

            {/* POST /flightretrieve Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">GET</span>
                <h2 className="text-2xl font-bold text-[#1a2b4c]">/flightretrieve</h2>
              </div>

              <p className="text-gray-700 mb-6">
                Creates a comprehensive flight retrieve operation across multiple sources for flexible origins, destinations, or dates, utilizing data from both the Wisefares Cache and third-party providers.
              </p>

              {/* Parameters */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1a2b4c] mb-3">PARAMETERS</h3>
                <p className="text-gray-500 italic">No parameters</p>
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
                          Successful response unless errors element is returned.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="font-semibold text-[#1a2b4c] mb-2">Example Value</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-96 overflow-y-auto">
                  {`{
    "flights": [
        {
          "source": "amadeus",
          "type": "flight-offer",
          "id": "1",
          "searchCriteria": {
            "origin": "LOS",
            "destination": "DOH",
            "tripType": "return",
            "class": "economy"
        },
         "itineraries": [
            {
                "duration": "PT20H15M",
                "segments": [
                    {
                        "departure": {
                        "iataCode": "LOS",
                        "terminal": "2I",
                        "at": "2025-11-03T14:45:00"
                            },
                        "arrival": {
                        "iataCode": "CAI",
                        "terminal": "3",
                        "at": "2025-11-03T20:50:00"
                             },
                        "carrierCode": "MS",
                        "number": "876",
                        "aircraft": {
                        "code": "321"
                            },
                        "operating": {
                        "carrierCode": "MS"
                            },
                        "duration": "PT5H5M",
                        "numberOfStops": 0
                        },
                        {
                            "departure": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-04T09:05:00"
                            },
                            "arrival": {
                                "iataCode": "DOH",
                                "at": "2025-11-04T13:00:00"
                            },
                            "carrierCode": "MS",
                            "number": "935",
                            "aircraft": {
                                "code": "333"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT2H55M",
                            "numberOfStops": 0
                        }
                    ]
                },
                {
                    "duration": "PT11H25M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DOH",
                                "at": "2025-11-09T04:20:00"
                            },
                            "arrival": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-09T06:50:00"
                            },
                            "carrierCode": "MS",
                            "number": "938",
                            "aircraft": {
                                "code": "32N"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT3H30M",
                            "numberOfStops": 0
                        },
                        {
                            "departure": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-09T08:55:00"
                            },
                            "arrival": {
                                "iataCode": "LOS",
                                "terminal": "2I",
                                "at": "2025-11-09T13:45:00"
                            },
                            "carrierCode": "MS",
                            "number": "875",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT5H50M",
                            "numberOfStops": 0
                        }
                    ]
                }
            ],
            "price": {
                "currency": "EUR",
                "total": 1795.82,
                "base": 403,
                "grandTotal": 1795.82
            },
            "validatingAirlineCodes": [
                "MS"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "EUR",
                        "total": "587.09",
                        "base": "141.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "28",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "29",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        }
                    ]
                },
                {
                    "travelerId": "2",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "EUR",
                        "total": "587.09",
                        "base": "141.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "28",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "29",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        }
                    ]
                },
                {
                    "travelerId": "3",
                    "fareOption": "STANDARD",
                    "travelerType": "CHILD",
                    "price": {
                        "currency": "EUR",
                        "total": "550.34",
                        "base": "106.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "28",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "29",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        }
                    ]
                },
                {
                    "travelerId": "4",
                    "fareOption": "STANDARD",
                    "travelerType": "HELD_INFANT",
                    "associatedAdultId": "1",
                    "price": {
                        "currency": "EUR",
                        "total": "71.30",
                        "base": "15.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "28",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "29",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        }
                    ]
                }
            ],
            "numberOfBookableSeats": 9,
            "lastTicketingDate": "2025-11-03",
            "cabin": "economy"
        },
        {
            "source": "amadeus",
            "type": "flight-offer",
            "id": "2",
            "searchCriteria": {
                "origin": "LOS",
                "destination": "DOH",
                "tripType": "return",
                "class": "economy"
            },
            "itineraries": [
                {
                    "duration": "PT10H35M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "LOS",
                                "terminal": "2I",
                                "at": "2025-11-03T14:45:00"
                            },
                            "arrival": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-03T20:50:00"
                            },
                            "carrierCode": "MS",
                            "number": "876",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT5H5M",
                            "numberOfStops": 0
                        },
                        {
                            "departure": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-03T23:25:00"
                            },
                            "arrival": {
                                "iataCode": "DOH",
                                "at": "2025-11-04T03:20:00"
                            },
                            "carrierCode": "MS",
                            "number": "937",
                            "aircraft": {
                                "code": "32N"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT2H55M",
                            "numberOfStops": 0
                        }
                    ]
                },
                {
                    "duration": "PT11H25M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DOH",
                                "at": "2025-11-09T04:20:00"
                            },
                            "arrival": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-09T06:50:00"
                            },
                            "carrierCode": "MS",
                            "number": "938",
                            "aircraft": {
                                "code": "32N"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT3H30M",
                            "numberOfStops": 0
                        },
                        {
                            "departure": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-09T08:55:00"
                            },
                            "arrival": {
                                "iataCode": "LOS",
                                "terminal": "2I",
                                "at": "2025-11-09T13:45:00"
                            },
                            "carrierCode": "MS",
                            "number": "875",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT5H50M",
                            "numberOfStops": 0
                        }
                    ]
                }
            ],
            "price": {
                "currency": "EUR",
                "total": 1796.86,
                "base": 403,
                "grandTotal": 1796.86
            },
            "validatingAirlineCodes": [
                "MS"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "EUR",
                        "total": "587.35",
                        "base": "141.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "17",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "18",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "28",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "29",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        }
                    ]
                },
                {
                    "travelerId": "2",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "EUR",
                        "total": "587.35",
                        "base": "141.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "17",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "18",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "28",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "29",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        }
                    ]
                },
                {
                    "travelerId": "3",
                    "fareOption": "STANDARD",
                    "travelerType": "CHILD",
                    "price": {
                        "currency": "EUR",
                        "total": "550.60",
                        "base": "106.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "17",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "18",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "28",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "29",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        }
                    ]
                },
                {
                    "travelerId": "4",
                    "fareOption": "STANDARD",
                    "travelerType": "HELD_INFANT",
                    "associatedAdultId": "1",
                    "price": {
                        "currency": "EUR",
                        "total": "71.56",
                        "base": "15.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "17",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "18",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "28",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "29",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        }
                    ]
                }
            ],
            "numberOfBookableSeats": 9,
            "lastTicketingDate": "2025-11-03",
            "cabin": "economy"
        },
        {
            "source": "amadeus",
            "type": "flight-offer",
            "id": "3",
            "searchCriteria": {
                "origin": "LOS",
                "destination": "DOH",
                "tripType": "return",
                "class": "economy"
            },
            "itineraries": [
                {
                    "duration": "PT20H15M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "LOS",
                                "terminal": "2I",
                                "at": "2025-11-03T14:45:00"
                            },
                            "arrival": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-03T20:50:00"
                            },
                            "carrierCode": "MS",
                            "number": "876",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT5H5M",
                            "numberOfStops": 0
                        },
                        {
                            "departure": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-04T09:05:00"
                            },
                            "arrival": {
                                "iataCode": "DOH",
                                "at": "2025-11-04T13:00:00"
                            },
                            "carrierCode": "MS",
                            "number": "935",
                            "aircraft": {
                                "code": "333"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT2H55M",
                            "numberOfStops": 0
                        }
                    ]
                },
                {
                    "duration": "PT25H45M",
                    "segments": [
                        {
                            "departure": {
                                "iataCode": "DOH",
                                "at": "2025-11-09T14:00:00"
                            },
                            "arrival": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-09T16:30:00"
                            },
                            "carrierCode": "MS",
                            "number": "936",
                            "aircraft": {
                                "code": "738"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT3H30M",
                            "numberOfStops": 0
                        },
                        {
                            "departure": {
                                "iataCode": "CAI",
                                "terminal": "3",
                                "at": "2025-11-10T08:55:00"
                            },
                            "arrival": {
                                "iataCode": "LOS",
                                "terminal": "2I",
                                "at": "2025-11-10T13:45:00"
                            },
                            "carrierCode": "MS",
                            "number": "875",
                            "aircraft": {
                                "code": "321"
                            },
                            "operating": {
                                "carrierCode": "MS"
                            },
                            "duration": "PT5H50M",
                            "numberOfStops": 0
                        }
                    ]
                }
            ],
            "price": {
                "currency": "EUR",
                "total": 2146.53,
                "base": 738,
                "grandTotal": 2146.53
            },
            "validatingAirlineCodes": [
                "MS"
            ],
            "travelerPricings": [
                {
                    "travelerId": "1",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "EUR",
                        "total": "710.73",
                        "base": "259.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "42",
                            "cabin": "ECONOMY",
                            "fareBasis": "ERING",
                            "class": "E",
                            "includedCheckedBags": {
                                "quantity": 2
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "43",
                            "cabin": "ECONOMY",
                            "fareBasis": "ERING",
                            "class": "E",
                            "includedCheckedBags": {
                                "quantity": 2
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        }
                    ]
                },
                {
                    "travelerId": "2",
                    "fareOption": "STANDARD",
                    "travelerType": "ADULT",
                    "price": {
                        "currency": "EUR",
                        "total": "710.73",
                        "base": "259.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T",
                            "includedCheckedBags": {
                                "quantity": 1
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "42",
                            "cabin": "ECONOMY",
                            "fareBasis": "ERING",
                            "class": "E",
                            "includedCheckedBags": {
                                "quantity": 2
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        },
                        {
                            "segmentId": "43",
                            "cabin": "ECONOMY",
                            "fareBasis": "ERING",
                            "class": "E",
                            "includedCheckedBags": {
                                "quantity": 2
                            },
                            "includedCabinBags": {
                                "quantity": 1
                            }
                        }
                    ]
                },
                {
                    "travelerId": "3",
                    "fareOption": "STANDARD",
                    "travelerType": "CHILD",
                    "price": {
                        "currency": "EUR",
                        "total": "642.48",
                        "base": "194.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "42",
                            "cabin": "ECONOMY",
                            "fareBasis": "ERING",
                            "class": "E"
                        },
                        {
                            "segmentId": "43",
                            "cabin": "ECONOMY",
                            "fareBasis": "ERING",
                            "class": "E"
                        }
                    ]
                },
                {
                    "travelerId": "4",
                    "fareOption": "STANDARD",
                    "travelerType": "HELD_INFANT",
                    "associatedAdultId": "1",
                    "price": {
                        "currency": "EUR",
                        "total": "82.59",
                        "base": "26.00"
                    },
                    "fareDetailsBySegment": [
                        {
                            "segmentId": "3",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "4",
                            "cabin": "ECONOMY",
                            "fareBasis": "TRING",
                            "class": "T"
                        },
                        {
                            "segmentId": "42",
                            "cabin": "ECONOMY",
                            "fareBasis": "ERING",
                            "class": "E"
                        },
                        {
                            "segmentId": "43",
                            "cabin": "ECONOMY",
                            "fareBasis": "ERING",
                            "class": "E"
                        }
                    ]
                }
            ],
            "numberOfBookableSeats": 9,
            "lastTicketingDate": "2025-11-03",
            "cabin": "economy"
        },`}
                </pre>
              </div>
            </div>

            {/* Back button */}
            <div className="flex justify-center mt-8">
              <Link
                to="/product-catalog/agentic-apis/wisefares-flight-retrieve-api"
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

export default FlightRetrievePage;
