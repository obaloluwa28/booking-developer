import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, Home } from 'lucide-react';
import APISidebar from '../../components/APISidebar';

const WisefaresFlightRetrievePage = () => {
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
                <span className="text-white font-medium">Wisefares Flight Retrieve API</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Wisefares Flight Retrieve API</h1>
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
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">WisefaresFlight Retrieve API Overview</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2b4c] mb-3">What is it?</h3>
                  <p className="text-gray-700 leading-relaxed">
                  This is a Flight Search Response.
                   It represents a list of available flight offers returned after a user searches for flights.
                    Example search:
                    Origin: LOS (Lagos)
                    Destination: DOH (Doha)
                    Trip Type: Return
                    Cabin: Economy
                    The API responded with multiple flight offers that match that criteria.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a2b4c] mb-2">WisefaresFlight Retrieve API is capable of:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Display available flights options</li>
                    <li>show full itinerary(outbound + return)</li>
                    <li>Show stopovers and duration</li>
                    <li>Show aircraft types</li>
                    <li>Show airlines code</li>
                    <li>Show baggage allowance</li>
                    <li>Calculate pricing per traveler</li>
                    <li>Handle multiple traveler types(Adult, Child, Infant)</li>
                    <li>Support seat availability</li>
                    <li>Show ticketing deadline</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1a2b4c] mb-2">from a response perspective:</h4>
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
                    <span className="font-semibold text-[#1a2b4c]">Support multi-city trips:</span>
                    <span className="text-gray-700"> The response contains an array of itineraries, and each itinerary contains one or more flight segments. This allows the system to handle not only one-way and return journeys, but also trips involving multiple destinations, such as Lagos to Doha to Bangkok and back to Lagos. The structure is flexible enough to include additional travel legs without requiring changes to the overall design.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#1a2b4c] font-bold">•</span>
                  <div>
                    <span className="font-semibold text-[#1a2b4c]">Multiple Traveler types:</span>
                    <span className="text-gray-700"> The response includes a dedicated traveler pricing section where each passenger is defined individually, such as Adult, Child, or Infant. Since airlines apply different pricing rules and baggage allowances depending on passenger type, this structure ensures accurate fare calculation and compliance with airline pricing standards.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#1a2b4c] font-bold">•</span>
                  <div>
                    <span className="font-semibold text-[#1a2b4c]">Support Fares Rules:</span>
                    <span className="text-gray-700"> Within each segment, detailed fare information such as cabin class, booking class, and fare basis codes is included. This allows the system to retrieve and apply conditions like refund policies, change penalties, and reissue fees. Supporting fare rules is essential for managing ticket modifications and cancellations after booking.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#1a2b4c] font-bold">•</span>
                  <div>
                    <span className="font-semibold text-[#1a2b4c]">Support dynamic pricing:</span>
                    <span className="text-gray-700">Airline fares change based on availability, demand, and booking class. The response includes total price, base fare, taxes, and seat availability information. Because pricing is stored as part of the offer rather than hardcoded, the system can revalidate or reprice an offer before confirming a booking, reducing pricing errors and financial risk.</span>
                  </div>
                </li>
                                <li className="flex gap-3">
                  <span className="text-[#1a2b4c] font-bold">•</span>
                  <div>
                    <span className="font-semibold text-[#1a2b4c]">Structure is scalable:</span>
                    <span className="text-gray-700">Because pricing, itineraries, and traveler information are modular and separated logically, the system can easily expand to include additional features such as commission handling, multi-currency support, seat selection, baggage upgrades, promo codes, or corporate discounts without redesigning the core architecture.</span>
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
                <code className="bg-gray-100 px-3 py-1.5 rounded text-sm font-mono">/flight/Retrieve</code>
              </div>

              <p className="text-gray-700 mb-4">To retrieve flight options, send a call to <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">/flight/Retrieve</code>. The Flight Search API returns results that match the requested criteria by completing the following steps:</p>

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
                  <code className="bg-gray-100 px-3 py-1.5 rounded text-sm font-mono">flight/retrieve/</code>
                  <p className="text-gray-700 mt-2">To retrieve offers matching your preferred search parameters, send a POST request to the endpoint.</p>
                </div>



                <div>
                  <h4 className="font-semibold text-[#1a2b4c] mb-2">Example Response:</h4>
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

export default WisefaresFlightRetrievePage;