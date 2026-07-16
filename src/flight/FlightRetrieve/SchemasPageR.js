// flight/FlightRetrieve/SchemasPageR.jsx
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

const SchemasPageR = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedFlightSchema, setExpandedFlightSchema] = useState(true);
  const [expandedFlightOfferSchema, setExpandedFlightOfferSchema] = useState(true);
  const [expandedSearchCriteriaSchema, setExpandedSearchCriteriaSchema] = useState(true);
  const [expandedItinerarySchema, setExpandedItinerarySchema] = useState(true);
  const [expandedFlightSegmentSchema, setExpandedFlightSegmentSchema] = useState(true);
  const [expandedAirportLocationSchema, setExpandedAirportLocationSchema] = useState(true);
  const [expandedPriceBreakdownSchema, setExpandedPriceBreakdownSchema] = useState(true);
  const [expandedTravelerPricingSchema, setExpandedTravelerPricingSchema] = useState(true);
  const [expandedFareDetailsSchema, setExpandedFareDetailsSchema] = useState(true);
  const [expandedPaginationInfoSchema, setExpandedPaginationInfoSchema] = useState(true);
  const [expandedResponseSchema, setExpandedResponseSchema] = useState(true);
  const [expandedProps, setExpandedProps] = useState({});
  const [expandedNestedProps, setExpandedNestedProps] = useState({});
  const [expandedEnums, setExpandedEnums] = useState({});

  const toggleFlightSchema = () => {
    setExpandedFlightSchema(prev => !prev);
  };

  const toggleFlightOfferSchema = () => {
    setExpandedFlightOfferSchema(prev => !prev);
  };

  const toggleSearchCriteriaSchema = () => {
    setExpandedSearchCriteriaSchema(prev => !prev);
  };

  const toggleItinerarySchema = () => {
    setExpandedItinerarySchema(prev => !prev);
  };

  const toggleFlightSegmentSchema = () => {
    setExpandedFlightSegmentSchema(prev => !prev);
  };

  const toggleAirportLocationSchema = () => {
    setExpandedAirportLocationSchema(prev => !prev);
  };

  const togglePriceBreakdownSchema = () => {
    setExpandedPriceBreakdownSchema(prev => !prev);
  };

  const toggleTravelerPricingSchema = () => {
    setExpandedTravelerPricingSchema(prev => !prev);
  };

  const toggleFareDetailsSchema = () => {
    setExpandedFareDetailsSchema(prev => !prev);
  };

  const togglePaginationInfoSchema = () => {
    setExpandedPaginationInfoSchema(prev => !prev);
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
    Itinerary: {
      properties: [
        {
          name: 'duration',
          required: true,
          type: 'string',
          pattern: '^PT(\\d+H)?(\\d+M)?$',
          example: 'PT20H15M',
          description: 'Total journey time in ISO 8601 duration format',
          hasDetails: true
        },
        {
          name: 'segments',
          required: true,
          type: '[FlightSegment]',
          description: 'Individual flight segments',
          nested: true,
          nestedProperties: [
            {
              name: 'departure',
              required: true,
              type: 'AirportLocation',
              description: 'Departure airport information',
              nested: true,
              nestedProperties: [
                {
                  name: 'iataCode',
                  required: true,
                  type: 'string',
                  pattern: '^[A-Z]{3}$',
                  example: 'LOS',
                  description: 'IATA airport code',
                  hasDetails: true
                },
                {
                  name: 'terminal',
                  required: false,
                  type: 'string',
                  example: '2I',
                  description: 'Terminal number/letter',
                  hasDetails: true
                },
                {
                  name: 'at',
                  required: true,
                  type: 'string($date-time)',
                  example: '2025-11-03T14:45:00',
                  description: 'Scheduled time in ISO 8601 format',
                  hasDetails: true
                }
              ]
            },
            {
              name: 'arrival',
              required: true,
              type: 'AirportLocation',
              description: 'Arrival airport information',
              nested: true,
              nestedProperties: [
                {
                  name: 'iataCode',
                  required: true,
                  type: 'string',
                  pattern: '^[A-Z]{3}$',
                  example: 'CAI',
                  description: 'IATA airport code',
                  hasDetails: true
                },
                {
                  name: 'terminal',
                  required: false,
                  type: 'string',
                  example: '3',
                  description: 'Terminal number/letter',
                  hasDetails: true
                },
                {
                  name: 'at',
                  required: true,
                  type: 'string($date-time)',
                  example: '2025-11-03T20:50:00',
                  description: 'Scheduled time in ISO 8601 format',
                  hasDetails: true
                }
              ]
            },
            {
              name: 'carrierCode',
              required: true,
              type: 'string',
              pattern: '^[A-Z0-9]{2}$',
              example: 'MS',
              description: 'IATA airline code',
              hasDetails: true
            },
            {
              name: 'number',
              required: true,
              type: 'string',
              example: '876',
              description: 'Flight number',
              hasDetails: true
            },
            {
              name: 'aircraft',
              required: true,
              type: 'object',
              nested: true,
              nestedProperties: [
                {
                  name: 'code',
                  required: true,
                  type: 'string',
                  example: '321',
                  description: 'IATA aircraft type code',
                  hasDetails: true
                }
              ]
            },
            {
              name: 'operating',
              required: true,
              type: 'object',
              nested: true,
              nestedProperties: [
                {
                  name: 'carrierCode',
                  required: true,
                  type: 'string',
                  pattern: '^[A-Z0-9]{2}$',
                  example: 'MS',
                  description: 'Operating airline if different from marketing carrier',
                  hasDetails: true
                }
              ]
            },
            {
              name: 'duration',
              required: true,
              type: 'string',
              pattern: '^PT(\\d+H)?(\\d+M)?$',
              example: 'PT5H5M',
              description: 'Segment duration in ISO 8601 format',
              hasDetails: true
            },
            {
              name: 'numberOfStops',
              required: true,
              type: 'integer',
              minimum: 0,
              default: 0,
              example: 0,
              hasDetails: true
            },
            {
              name: 'stopLocations',
              required: false,
              type: '[StopLocation]',
              description: 'Connection points if stops > 0',
              nested: true,
              nestedProperties: [
                {
                  name: 'iataCode',
                  required: true,
                  type: 'string',
                  pattern: '^[A-Z]{3}$',
                  example: 'CAI',
                  hasDetails: true
                },
                {
                  name: 'duration',
                  required: true,
                  type: 'string',
                  pattern: '^PT(\\d+H)?(\\d+M)?$',
                  example: 'PT2H30M',
                  description: 'Layover duration',
                  hasDetails: true
                },
                {
                  name: 'arrival',
                  required: true,
                  type: 'string($date-time)',
                  example: '2025-11-03T20:50:00',
                  hasDetails: true
                },
                {
                  name: 'departure',
                  required: true,
                  type: 'string($date-time)',
                  example: '2025-11-03T23:25:00',
                  hasDetails: true
                }
              ]
            }
          ]
        }
      ]
    },
    SearchCriteria: {
      properties: [
        {
          name: 'origin',
          required: true,
          type: 'string',
          pattern: '^[A-Z]{3}$',
          example: 'LOS',
          description: 'IATA airport code for departure',
          hasDetails: true
        },
        {
          name: 'destination',
          required: true,
          type: 'string',
          pattern: '^[A-Z]{3}$',
          example: 'DOH',
          description: 'IATA airport code for arrival',
          hasDetails: true
        },
        {
          name: 'tripType',
          required: true,
          type: 'string',
          example: 'return',
          enum: ['one-way', 'return', 'multi-city'],
          hasDetails: true
        },
        {
          name: 'class',
          required: true,
          type: 'string',
          example: 'economy',
          enum: ['economy', 'premium_economy', 'business', 'first'],
          hasDetails: true
        },
        {
          name: 'adults',
          required: true,
          type: 'integer',
          minimum: 1,
          example: 2,
          hasDetails: true
        },
        {
          name: 'children',
          required: false,
          type: 'integer',
          minimum: 0,
          example: 1,
          hasDetails: true
        },
        {
          name: 'infants',
          required: false,
          type: 'integer',
          minimum: 0,
          example: 1,
          hasDetails: true
        }
      ]
    },
    FlightOffer: {
      properties: [
        {
          name: 'source',
          required: true,
          type: 'string',
          example: 'amadeus',
          description: 'GDS system that provided this offer',
          enum: ['amadeus', 'sabre', 'travelport'],
          hasDetails: true
        },
        {
          name: 'type',
          required: true,
          type: 'string',
          example: 'flight-offer',
          description: 'Type of offer',
          enum: ['flight-offer'],
          hasDetails: true
        },
        {
          name: 'id',
          required: true,
          type: 'string',
          example: '1',
          description: 'Unique identifier for this offer within the response',
          hasDetails: true
        },
        {
          name: 'searchCriteria',
          required: true,
          type: 'SearchCriteria',
          description: 'Search criteria used for this offer',
          nested: true,
          nestedProperties: [] // Will reference the SearchCriteria schema
        },
        {
          name: 'itineraries',
          required: true,
          type: '[Itinerary]',
          description: 'Outbound and return flight details (minItems: 1, maxItems: 2)',
          nested: true,
          nestedProperties: [] // Will reference Itinerary schema
        },
        {
          name: 'price',
          required: true,
          type: 'PriceBreakdown',
          description: 'Price breakdown for the offer',
          nested: true,
          nestedProperties: [] // Will reference PriceBreakdown schema
        },
        {
          name: 'validatingAirlineCodes',
          required: true,
          type: 'array',
          example: '["MS"]',
          description: 'Airlines responsible for ticket validation',
          hasDetails: true
        },
        {
          name: 'travelerPricings',
          required: true,
          type: '[TravelerPricing]',
          description: 'Price breakdown per traveler',
          nested: true,
          nestedProperties: [] // Will reference TravelerPricing schema
        },
        {
          name: 'numberOfBookableSeats',
          required: true,
          type: 'integer',
          minimum: 0,
          example: 9,
          description: 'Available seats for booking at this fare',
          hasDetails: true
        },
        {
          name: 'lastTicketingDate',
          required: true,
          type: 'string($date)',
          example: '2025-11-03',
          description: 'Last date to purchase this fare',
          hasDetails: true
        },
        {
          name: 'cabin',
          required: true,
          type: 'string',
          example: 'economy',
          enum: ['economy', 'premium_economy', 'business', 'first'],
          hasDetails: true
        },
        {
          name: 'lastTicketingDateTime',
          required: false,
          type: 'string($date-time)',
          example: '2025-11-03T23:59:00',
          description: 'Precise ticketing deadline',
          hasDetails: true
        }
      ]
    },
    Flight: {
      properties: [
        {
          name: 'flight_id',
          required: true,
          type: 'string',
          example: 'QR1402',
          hasDetails: true
        },
        {
          name: 'airline',
          required: true,
          type: 'string',
          example: 'Qatar Airways',
          hasDetails: true
        },
        {
          name: 'airline_code',
          required: true,
          type: 'string',
          pattern: '^[A-Z]{2}$',
          example: 'QR',
          hasDetails: true
        },
        {
          name: 'departure',
          required: true,
          type: 'object',
          nested: true,
          nestedProperties: [
            {
              name: 'airport',
              required: true,
              type: 'string',
              example: 'LOS',
              hasDetails: true
            },
            {
              name: 'airport_name',
              required: true,
              type: 'string',
              example: 'Murtala Muhammed International Airport',
              hasDetails: true
            },
            {
              name: 'terminal',
              required: false,
              type: 'string',
              example: 'I',
              hasDetails: true
            },
            {
              name: 'time',
              required: true,
              type: 'string($date-time)',
              example: '2026-02-03T08:00:00Z',
              hasDetails: true
            }
          ]
        },
        {
          name: 'arrival',
          required: true,
          type: 'object',
          nested: true,
          nestedProperties: [
            {
              name: 'airport',
              required: true,
              type: 'string',
              example: 'DOH',
              hasDetails: true
            },
            {
              name: 'airport_name',
              required: true,
              type: 'string',
              example: 'Hamad International Airport',
              hasDetails: true
            },
            {
              name: 'terminal',
              required: false,
              type: 'string',
              example: '1',
              hasDetails: true
            },
            {
              name: 'time',
              required: true,
              type: 'string($date-time)',
              example: '2026-02-03T14:30:00Z',
              hasDetails: true
            }
          ]
        },
        {
          name: 'duration',
          required: true,
          type: 'string',
          example: 'PT6H30M',
          description: 'Flight duration in ISO 8601 format',
          hasDetails: true
        },
        {
          name: 'stops',
          required: true,
          type: 'integer',
          minimum: 0,
          example: '0',
          hasDetails: true
        },
        {
          name: 'stop_airports',
          required: false,
          type: 'array',
          example: '[]',
          hasDetails: true
        },
        {
          name: 'price',
          required: true,
          type: 'object',
          nested: true,
          nestedProperties: [
            {
              name: 'amount',
              required: true,
              type: 'number($float)',
              example: '850.5',
              hasDetails: true
            },
            {
              name: 'currency',
              required: true,
              type: 'string',
              pattern: '^[A-Z]{3}$',
              example: 'USD',
              hasDetails: true
            },
            {
              name: 'base_fare',
              required: true,
              type: 'number',
              example: '750',
              hasDetails: true
            },
            {
              name: 'taxes',
              required: true,
              type: 'number',
              example: '100.5',
              hasDetails: true
            }
          ]
        },
        {
          name: 'available_seats',
          required: true,
          type: 'integer',
          example: '12',
          hasDetails: true
        },
        {
          name: 'cabin_baggage',
          required: true,
          type: 'string',
          example: '7kg',
          hasDetails: true
        },
        {
          name: 'checked_baggage',
          required: true,
          type: 'string',
          example: '30kg',
          hasDetails: true
        },
        {
          name: 'refundable',
          required: true,
          type: 'boolean',
          example: 'true',
          hasDetails: true
        }
      ]
    },
    FlightSearchResponse: {
      properties: [
        {
          name: 'success',
          required: true,
          type: 'boolean',
          example: 'true',
          description: 'Indicates if the request was successful',
          hasDetails: true
        },
        {
          name: 'data',
          required: true,
          type: 'object',
          description: 'Container for flight data',
          nested: true,
          nestedProperties: [
            {
              name: 'flights',
              required: true,
              type: '[Flight]',
              description: 'Array of flight objects',
              nested: true,
              nestedProperties: [] // This will be populated from the Flight schema
            },
            {
              name: 'total_count',
              required: true,
              type: 'integer',
              example: '15',
              description: 'Total number of flights found',
              hasDetails: true
            }
          ]
        },
        {
          name: 'metadata',
          required: true,
          type: 'object',
          description: 'Metadata about the search',
          nested: true,
          nestedProperties: [
            {
              name: 'search_id',
              required: true,
              type: 'string($uuid)',
              example: '245bb6c4-5ff9-4052-445f-b3e962194b91',
              description: 'Unique search identifier',
              hasDetails: true
            },
            {
              name: 'timestamp',
              required: true,
              type: 'string',
              example: '2024-01-15T10:30:00Z',
              description: 'Time when search started',
              hasDetails: true
            },
            {
              name: 'completion_time',
              required: true,
              type: 'string',
              example: '2024-01-15T10:30:05Z',
              description: 'Time when search completed',
              hasDetails: true
            }
          ]
        },
        {
          name: 'PaginationInfo',
          required: true,
          type: 'object',
          description: 'Pagination information',
          nested: true,
          nestedProperties: [] // Will reference PaginationInfo schema
        }
      ]
    },
    FlightSegment: {
      properties: [
        {
          name: 'departure',
          required: true,
          type: 'AirportLocation',
          description: 'Departure airport information',
          nested: true,
          nestedProperties: [
            {
              name: 'iataCode',
              required: true,
              type: 'string',
              pattern: '^[A-Z]{3}$',
              example: 'LOS',
              description: 'IATA airport code',
              hasDetails: true
            },
            {
              name: 'terminal',
              required: false,
              type: 'string',
              example: '2I',
              description: 'Terminal number/letter',
              hasDetails: true
            },
            {
              name: 'at',
              required: true,
              type: 'string($date-time)',
              example: '2025-11-03T14:45:00',
              description: 'Scheduled time in ISO 8601 format',
              hasDetails: true
            }
          ]
        },
        {
          name: 'arrival',
          required: true,
          type: 'AirportLocation',
          description: 'Arrival airport information',
          nested: true,
          nestedProperties: [
            {
              name: 'iataCode',
              required: true,
              type: 'string',
              pattern: '^[A-Z]{3}$',
              example: 'CAI',
              description: 'IATA airport code',
              hasDetails: true
            },
            {
              name: 'terminal',
              required: false,
              type: 'string',
              example: '3',
              description: 'Terminal number/letter',
              hasDetails: true
            },
            {
              name: 'at',
              required: true,
              type: 'string($date-time)',
              example: '2025-11-03T20:50:00',
              description: 'Scheduled time in ISO 8601 format',
              hasDetails: true
            }
          ]
        },
        {
          name: 'carrierCode',
          required: true,
          type: 'string',
          pattern: '^[A-Z0-9]{2}$',
          example: 'MS',
          description: 'IATA airline code',
          hasDetails: true
        },
        {
          name: 'number',
          required: true,
          type: 'string',
          example: '876',
          description: 'Flight number',
          hasDetails: true
        },
        {
          name: 'aircraft',
          required: true,
          type: 'object',
          description: 'Aircraft information',
          nested: true,
          nestedProperties: [
            {
              name: 'code',
              required: true,
              type: 'string',
              example: '321',
              description: 'IATA aircraft type code',
              hasDetails: true
            }
          ]
        },
        {
          name: 'operating',
          required: true,
          type: 'object',
          description: 'Operating airline information',
          nested: true,
          nestedProperties: [
            {
              name: 'carrierCode',
              required: true,
              type: 'string',
              pattern: '^[A-Z0-9]{2}$',
              example: 'MS',
              description: 'Operating airline if different from marketing carrier',
              hasDetails: true
            }
          ]
        },
        {
          name: 'duration',
          required: true,
          type: 'string',
          pattern: '^PT(\\d+H)?(\\d+M)?$',
          example: 'PT5H5M',
          description: 'Segment duration in ISO 8601 format',
          hasDetails: true
        },
        {
          name: 'numberOfStops',
          required: true,
          type: 'integer',
          minimum: 0,
          default: 0,
          example: 0,
          hasDetails: true
        },
        {
          name: 'stopLocations',
          required: false,
          type: '[StopLocation]',
          description: 'Connection points if stops > 0',
          nested: true,
          nestedProperties: [
            {
              name: 'iataCode',
              required: true,
              type: 'string',
              pattern: '^[A-Z]{3}$',
              example: 'CAI',
              hasDetails: true
            },
            {
              name: 'duration',
              required: true,
              type: 'string',
              pattern: '^PT(\\d+H)?(\\d+M)?$',
              example: 'PT2H30M',
              description: 'Layover duration',
              hasDetails: true
            },
            {
              name: 'arrival',
              required: true,
              type: 'string($date-time)',
              example: '2025-11-03T20:50:00',
              hasDetails: true
            },
            {
              name: 'departure',
              required: true,
              type: 'string($date-time)',
              example: '2025-11-03T23:25:00',
              hasDetails: true
            }
          ]
        }
      ]
    },
    AirportLocation: {
      properties: [
        {
          name: 'iataCode',
          required: true,
          type: 'string',
          pattern: '^[A-Z]{3}$',
          example: 'LOS',
          description: 'IATA airport code',
          hasDetails: true
        },
        {
          name: 'terminal',
          required: false,
          type: 'string',
          example: '2I',
          description: 'Terminal number/letter',
          hasDetails: true
        },
        {
          name: 'at',
          required: true,
          type: 'string($date-time)',
          example: '2025-11-03T14:45:00',
          description: 'Scheduled time in ISO 8601 format',
          hasDetails: true
        }
      ]
    },
    PriceBreakdown: {
      properties: [
        {
          name: 'currency',
          required: true,
          type: 'string',
          pattern: '^[A-Z]{3}$',
          example: 'EUR',
          description: 'ISO 4217 currency code',
          hasDetails: true
        },
        {
          name: 'total',
          required: true,
          type: 'number($float)',
          example: '1795.82',
          description: 'Total price including taxes and fees',
          hasDetails: true
        },
        {
          name: 'base',
          required: true,
          type: 'number($float)',
          example: '403',
          description: 'Base fare without taxes',
          hasDetails: true
        },
        {
          name: 'grandTotal',
          required: true,
          type: 'number($float)',
          example: '1795.82',
          description: 'Final total (may differ from total for some GDS)',
          hasDetails: true
        },
        {
          name: 'fees',
          required: false,
          type: '[Fee]',
          description: 'Detailed fee breakdown',
          nested: true,
          nestedProperties: [
            {
              name: 'amount',
              required: true,
              type: 'number',
              example: '75.25',
              hasDetails: true
            },
            {
              name: 'type',
              required: true,
              type: 'string',
              example: 'TICKETING',
              description: 'Fee type',
              hasDetails: true
            }
          ]
        },
        {
          name: 'taxes',
          required: false,
          type: '[Tax]',
          description: 'Detailed tax breakdown',
          nested: true,
          nestedProperties: [
            {
              name: 'amount',
              required: true,
              type: 'number',
              example: '45.50',
              hasDetails: true
            },
            {
              name: 'code',
              required: true,
              type: 'string',
              example: 'VAT',
              description: 'Tax code',
              hasDetails: true
            }
          ]
        }
      ]
    },
    TravelerPricing: {
      properties: [
        {
          name: 'travelerId',
          required: true,
          type: 'string',
          example: '1',
          description: 'Reference to passenger',
          hasDetails: true
        },
        {
          name: 'fareOption',
          required: true,
          type: 'string',
          example: 'STANDARD',
          enum: ['STANDARD', 'FLEXIBLE', 'CORPORATE'],
          hasDetails: true
        },
        {
          name: 'travelerType',
          required: true,
          type: 'string',
          example: 'ADULT',
          enum: ['ADULT', 'CHILD', 'HELD_INFANT', 'SEATED_INFANT', 'SENIOR'],
          hasDetails: true
        },
        {
          name: 'associatedAdultId',
          required: false,
          type: 'string',
          example: '1',
          description: 'Required for infants - references parent traveler',
          hasDetails: true
        },
        {
          name: 'price',
          required: true,
          type: 'object',
          nested: true,
          nestedProperties: [
            {
              name: 'currency',
              required: true,
              type: 'string',
              example: 'EUR',
              hasDetails: true
            },
            {
              name: 'total',
              required: true,
              type: 'string',
              example: '587.09',
              hasDetails: true
            },
            {
              name: 'base',
              required: true,
              type: 'string',
              example: '141.00',
              hasDetails: true
            }
          ]
        },
        {
          name: 'fareDetailsBySegment',
          required: true,
          type: '[FareDetails]',
          nested: true,
          nestedProperties: [] // Will reference FareDetails schema
        }
      ]
    },
    FareDetails: {
      properties: [
        {
          name: 'segmentId',
          required: true,
          type: 'string',
          example: '3',
          description: 'Reference to flight segment',
          hasDetails: true
        },
        {
          name: 'cabin',
          required: true,
          type: 'string',
          example: 'ECONOMY',
          enum: ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'],
          hasDetails: true
        },
        {
          name: 'fareBasis',
          required: true,
          type: 'string',
          example: 'TRING',
          description: 'Fare basis code',
          hasDetails: true
        },
        {
          name: 'class',
          required: true,
          type: 'string',
          example: 'T',
          description: 'Booking class/RBD code',
          hasDetails: true
        },
        {
          name: 'includedCheckedBags',
          required: true,
          type: 'object',
          nested: true,
          nestedProperties: [
            {
              name: 'quantity',
              required: true,
              type: 'integer',
              example: 1,
              description: 'Number of checked bags included',
              hasDetails: true
            },
            {
              name: 'weight',
              required: false,
              type: 'integer',
              example: 23,
              hasDetails: true
            },
            {
              name: 'weightUnit',
              required: false,
              type: 'string',
              example: 'KG',
              enum: ['KG', 'LB'],
              hasDetails: true
            }
          ]
        },
        {
          name: 'includedCabinBags',
          required: false,
          type: 'object',
          nested: true,
          nestedProperties: [
            {
              name: 'quantity',
              required: true,
              type: 'integer',
              example: 1,
              hasDetails: true
            }
          ]
        }
      ]
    },
    PaginationInfo: {
      properties: [
        {
          name: 'limit',
          required: true,
          type: 'integer',
          example: '10',
          description: 'Number of items per page',
          hasDetails: true
        },
        {
          name: 'offset',
          required: true,
          type: 'integer',
          example: '0',
          description: 'Offset for pagination',
          hasDetails: true
        },
        {
          name: 'count',
          required: true,
          type: 'integer',
          example: '10',
          description: 'Number of items in current page',
          hasDetails: true
        },
        {
          name: 'total',
          required: true,
          type: 'integer',
          example: '15',
          description: 'Total number of items',
          hasDetails: true
        },
        {
          name: 'next',
          required: false,
          type: 'string',
          example: '/api/flights?offset=10&limit=10',
          description: 'URL for next page',
          hasDetails: true
        },
        {
          name: 'previous',
          required: false,
          type: 'string',
          example: 'null',
          description: 'URL for previous page',
          hasDetails: true
        }
      ]
    }
  };

  const renderNestedProperty = (nestedProp, parentName, depth = 0) => {
    const nestedKey = `${parentName}-${nestedProp.name}`;
    const isExpanded = expandedNestedProps[nestedKey];
    const indent = depth * 20;

    if (nestedProp.nested) {
      return (
        <div className="space-y-2" style={{ marginLeft: `${indent}px` }}>
          <div className="flex items-start">
            <div className="min-w-[120px] flex items-center">
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
              <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-0.5 rounded">
                {nestedProp.type}
              </span>
            </div>
          </div>

          {isExpanded && (
            <div className="ml-4 mt-2 space-y-3 border-l-2 border-purple-200 pl-4">
              {nestedProp.nestedProperties?.map((prop, idx) => (
                <div key={idx}>
                  {renderNestedProperty(prop, nestedKey, depth + 1)}
                  {idx < (nestedProp.nestedProperties?.length || 0) - 1 && (
                    <div className="border-b border-gray-100 my-2"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // For properties with details (hasDetails = true)
    if (nestedProp.hasDetails) {
      return (
        <div className="space-y-2">
          <div className="flex items-start">
            <div className="min-w-[120px] flex items-center">
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
              <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-0.5 rounded">
                {nestedProp.type}
              </span>
            </div>
          </div>

          {isExpanded && (
            <div className="ml-[140px] mt-2 space-y-2 border-l-2 border-purple-200 pl-4">
              {nestedProp.pattern && (
                <div className="text-xs text-gray-500">
                  pattern: <span className="font-mono text-gray-600">{nestedProp.pattern}</span>
                </div>
              )}
              {nestedProp.minimum !== undefined && (
                <div className="text-xs text-gray-500">
                  minimum: {nestedProp.minimum}
                </div>
              )}
              {nestedProp.default !== undefined && (
                <div className="text-xs text-gray-500">
                  default: {nestedProp.default}
                </div>
              )}
              {nestedProp.example && (
                <div className="text-sm text-gray-500">
                  example: <span className="font-mono text-gray-600">{nestedProp.example}</span>
                </div>
              )}
              {nestedProp.description && (
                <div className="text-sm text-gray-600">
                  {nestedProp.description}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // Simple properties without details (no arrow)
    return (
      <div className="space-y-1">
        <div className="flex items-start">
          <div className="min-w-[120px]">
            <span className="text-sm text-[#1a2b4c] font-mono">{nestedProp.name}</span>
            {nestedProp.required && <span className="text-red-500 text-xs ml-1">*</span>}
          </div>
          <div className="flex-1">
            <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-0.5 rounded">
              {nestedProp.type}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderProperty = (prop) => {
    const propKey = `Property-${prop.name}`;
    const isExpanded = expandedProps[propKey];

    if (prop.nested) {
      return (
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-[#1a2b4c] min-w-[120px] font-mono">{prop.name}</span>
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
            <span className="ml-3 text-sm text-gray-600 font-mono bg-gray-50 px-2 py-0.5 rounded">
              {prop.type}
            </span>
          </div>

          {isExpanded && (
            <div className="ml-6 mt-3 space-y-4 border-l-2 border-purple-200 pl-4">
              {prop.nestedProperties?.map((nestedProp, idx) => (
                <div key={idx}>
                  {renderNestedProperty(nestedProp, prop.name, 0)}
                  {idx < (prop.nestedProperties?.length || 0) - 1 && (
                    <div className="border-b border-gray-100 my-3"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="text-[#1a2b4c] min-w-[120px] font-mono">{prop.name}</span>
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
          <div className="ml-6 mt-3 space-y-3 border-l-2 border-purple-200 pl-4">
            <div className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-1 rounded">
              ▼ {prop.type}
            </div>
            {prop.pattern && (
              <div className="text-xs text-gray-500">
                pattern: <span className="font-mono text-gray-600">{prop.pattern}</span>
              </div>
            )}
            {prop.minimum !== undefined && (
              <div className="text-xs text-gray-500">
                minimum: {prop.minimum}
              </div>
            )}
            {prop.default !== undefined && (
              <div className="text-xs text-gray-500">
                default: {prop.default}
              </div>
            )}
            <div className="text-sm text-gray-500">
              example: <span className="font-mono text-gray-600">{prop.example}</span>
            </div>
            {prop.description && (
              <div className="text-sm text-gray-600">
                {prop.description}
              </div>
            )}
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
                  {expandedEnums[prop.name] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {expandedEnums[prop.name] && (
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
          apiName="Wisefares Flight Retrieve API"
          basePath="wisefares-flight-retrieve-api"
          endpointName="flightretrieve"
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
                <Link to="/product-catalog/agentic-apis/wisefares-flight-retrieve-api" className="hover:text-white">
                  Wisefares Flight Retrieve API
                </Link>
                <ChevronRight size={14} />
                <span className="text-white font-medium">Schemas</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Schemas</h1>
                  <p className="text-white">Data models used in the Flight Retrieve API</p>
                </div>
                <button className="flex items-center space-x-2 text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#003341] transition-colors">
                  <Download size={18} />
                  <span>Download YAML</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6 py-4">

            {/* FlightSearchResponse Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
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
                              {renderProperty(prop)}
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
            </div>


            {/* Flight Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">Flight</span>
                      <button
                        onClick={toggleFlightSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedFlightSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedFlightSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.Flight.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedFlightSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* FlightOffer Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">FlightOffer</span>
                      <button
                        onClick={toggleFlightOfferSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedFlightOfferSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedFlightOfferSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.FlightOffer.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedFlightOfferSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>


            {/* SearchCriteria Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">SearchCriteria</span>
                      <button
                        onClick={toggleSearchCriteriaSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedSearchCriteriaSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedSearchCriteriaSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.SearchCriteria.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedSearchCriteriaSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Itinerary Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">Itinerary</span>
                      <button
                        onClick={toggleItinerarySchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedItinerarySchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedItinerarySchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.Itinerary.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedItinerarySchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* FlightSegment Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">FlightSegment</span>
                      <button
                        onClick={toggleFlightSegmentSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedFlightSegmentSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedFlightSegmentSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.FlightSegment.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedFlightSegmentSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* AirportLocation Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">AirportLocation</span>
                      <button
                        onClick={toggleAirportLocationSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedAirportLocationSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedAirportLocationSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.AirportLocation.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedAirportLocationSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* PriceBreakdown Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">PriceBreakdown</span>
                      <button
                        onClick={togglePriceBreakdownSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedPriceBreakdownSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedPriceBreakdownSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.PriceBreakdown.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedPriceBreakdownSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* TravelerPricing Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">TravelerPricing</span>
                      <button
                        onClick={toggleTravelerPricingSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedTravelerPricingSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedTravelerPricingSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.TravelerPricing.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedTravelerPricingSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* FareDetails Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">FareDetails</span>
                      <button
                        onClick={toggleFareDetailsSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedFareDetailsSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedFareDetailsSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.FareDetails.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedFareDetailsSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* PaginationInfo Schema - ADDED AFTER FAREDETAILS */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="px-6 py-5">
                  <div className="flex items-start">
                    <div className="min-w-[200px] flex items-center">
                      <span className="text-xl font-semibold text-[#1a2b4c]">PaginationInfo</span>
                      <button
                        onClick={togglePaginationInfoSchema}
                        className="flex items-center ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {expandedPaginationInfoSchema ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </div>

                    {expandedPaginationInfoSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-700">
                        {'{'}
                        <div className="ml-6 space-y-4 mt-2">
                          {schemas.PaginationInfo.properties.map((prop, idx) => (
                            <div key={idx}>
                              {renderProperty(prop)}
                            </div>
                          ))}
                        </div>
                        {'}'}
                      </div>
                    )}

                    {!expandedPaginationInfoSchema && (
                      <div className="flex-1 font-mono text-sm text-gray-400 italic">
                        {'{ ... }'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Example Itinerary */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-[#1a2b4c] mb-4">Example Itinerary</h2>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {`{
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
      "numberOfStops": 0,
      "stopLocations": []
    }
  ]
}`}
              </pre>
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

export default SchemasPageR;