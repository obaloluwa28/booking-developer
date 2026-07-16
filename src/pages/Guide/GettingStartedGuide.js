// pages/GettingStartedGuide.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Copy, 
  Check, 
  Rocket, 
  Shield, 
  Zap, 
  AlertCircle,
  CheckCircle,
  Code,
  BookOpen,
  ArrowLeft,
  Globe,
  Search,
  Calendar,
  Clock,
  Server,
} from 'lucide-react';

const GettingStartedGuide = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeTab, setActiveTab] = useState('node');

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    node: `import axios from "axios";

const api = axios.create({
  baseURL: "https://api.wisefares.com/v1",
  headers: {
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
  }
});

const searchFlights = async () => {
  try {
    const response = await api.post("/flights/search", {
      origin: "LOS",
      destination: "DOH",
      start_date: "2026-03-02",
      return_date: "2026-03-09",
      tripType: "return",
      class: "economy",
      pax: { adults: 1 }
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

searchFlights();`,

    python: `import requests
import json

url = "https://api.wisefares.com/v1/flights/search"
headers = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
}

payload = {
    "origin": "LOS",
    "destination": "DOH",
    "start_date": "2026-03-02",
    "return_date": "2026-03-09",
    "tripType": "return",
    "class": "economy",
    "pax": {
        "adults": 1,
        "children": 0,
        "infants": 0
    }
}

try:
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()
    print(json.dumps(data, indent=2))
except requests.exceptions.RequestException as e:
    print(f"API Error: {e}")`,

    curl: `curl -X POST "https://api.wisefares.com/v1/flights/search" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": "LOS",
    "destination": "DOH",
    "start_date": "2026-03-02",
    "return_date": "2026-03-09",
    "tripType": "return",
    "class": "economy",
    "pax": {
      "adults": 1,
      "children": 0,
      "infants": 0
    }
  }'`
  };

  const features = [
    {
      icon: Search,
      title: "Flight Search",
      description: "Search for available flights based on user input with flexible parameters including dates, destinations, and passenger details."
    },
    {
      icon: Calendar,
      title: "Booking Management",
      description: "Create, retrieve, update, and manage flight bookings seamlessly through our API."
    },
    {
      icon: Globe,
      title: "Real-Time Data",
      description: "Access up-to-date flight schedules, pricing, and availability with real-time data synchronization."
    }
  ];

  const statusCodes = [
    { code: 200, status: "Success", description: "Request was successful" },
    { code: 400, status: "Bad Request", description: "Invalid parameters or malformed request" },
    { code: 401, status: "Unauthorized", description: "Invalid or missing authentication token" },
    { code: 500, status: "Server Error", description: "Internal server error" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/guides" className="hover:text-white transition-colors">Guides</Link>
            <ChevronRight size={14} />
            <span className="text-white">Getting Started</span>
          </div>
          
          <Link 
            to="/guides" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Guides
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <Rocket size={40} className="text-blue-300" />
            <h1 className="text-4xl lg:text-5xl font-bold">Getting Started with Wisefares APIs</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Learn the basics of integrating Wisefares APIs into your applications
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span className="flex items-center text-gray-300 text-sm">
              <Clock size={14} className="mr-1" />
              10 min read
            </span>
            <span className="flex items-center text-gray-300 text-sm">
              <BookOpen size={14} className="mr-1" />
              Beginner
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Overview</h2>
          <p className="text-gray-600 mb-4">
            The Wisefares API provides access to real-time flight data, search capabilities, and booking services. 
            It is designed to help developers build scalable travel applications, including booking platforms, 
            mobile apps, and travel management systems.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-blue-800 text-sm">
              <strong> Getting Started:</strong> This guide will walk you through the fundamentals of integrating 
              Wisefares APIs into your application.
            </p>
          </div>
        </section>

        {/* Base URL */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Base URL</h2>
          <p className="text-gray-600 mb-4">
            All API requests should be made to:
          </p>
          <div className="bg-gray-900 rounded-lg p-4">
            <code className="text-lg text-green-400 font-mono">
              https://api.wisefares.com/v1
            </code>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Prerequisites</h2>
          <p className="text-gray-600 mb-4">
            Before integrating, ensure you have:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "A basic understanding of REST APIs",
              "Familiarity with JSON request/response formats",
              "A development environment (e.g., Node.js, Python, PHP)",
              "Valid Wisefares API credentials"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Authentication</h2>
          <p className="text-gray-600 mb-4">
            All requests to the Wisefares API must be authenticated.
          </p>
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-sm font-mono text-gray-300">Header Format</span>
            </div>
            <div className="p-4">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json`}</code>
              </pre>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle size={18} className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                <strong> Need help?</strong> Refer to the{' '}
                <Link to="/guides/authentication" className="text-yellow-800 underline font-medium">
                  Authentication Guide
                </Link>{' '}
                for details on generating access tokens.
              </p>
            </div>
          </div>
        </section>

        {/* Making Your First API Request */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Making Your First API Request</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Flight Search Example</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <span className="text-sm font-mono text-gray-300">POST /flights/search</span>
              </div>
              <div className="p-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider block mb-2">Request Body</span>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{`{
  "origin": "LOS",
  "destination": "DOH",
  "start_date": "2026-03-02",
  "return_date": "2026-03-09",
  "tripType": "return",
  "class": "economy",
  "pax": {
    "adults": 1,
    "children": 0,
    "infants": 0
  }
}`}</code>
                </pre>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <span className="text-sm font-mono text-gray-300">Response</span>
              </div>
              <div className="p-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider block mb-2">Success Response</span>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{`{
  "success": true,
  "data": [
    {
      "flight_id": "FL12345",
      "airline": "Qatar Airways",
      "price": 450000,
      "departure": "10:00",
      "arrival": "18:30"
    }
  ]
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Core API Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Core API Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <feature.icon size={32} className="text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example Integration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Example Integration (Node.js)</h2>
          
          <div className="flex border-b border-gray-200 mb-4">
            {['node', 'python', 'curl'].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === lang
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {lang === 'node' ? 'Node.js' : lang === 'python' ? 'Python' : 'cURL'}
              </button>
            ))}
          </div>

          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={() => copyToClipboard(codeExamples[activeTab], activeTab)}
              className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors z-10"
              title="Copy code"
            >
              {copiedCode === activeTab ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                {codeExamples[activeTab]}
              </code>
            </pre>
          </div>
        </section>

        {/* Response Structure */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Response Structure</h2>
          <p className="text-gray-600 mb-4">
            All API responses follow a consistent structure:
          </p>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-4">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`{
  "success": true,
  "data": {},
  "message": "Request successful"
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Error Handling</h2>
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-sm font-mono text-gray-300">Error Response Example</span>
            </div>
            <div className="p-4">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "Incorrect request data provided"
  }
}`}</code>
              </pre>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Status Codes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meaning</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {statusCodes.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Testing the API */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Testing the API</h2>
          <p className="text-gray-600 mb-4">
            You can test Wisefares APIs using:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Postman", icon: Server, color: "orange" },
              { name: "Thunder Client", icon: Zap, color: "purple" },
              { name: "cURL", icon: Code, color: "green" },
              { name: "Insomnia", icon: Globe, color: "blue" }
            ].map((tool, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <tool.icon size={24} className={`text-${tool.color}-500 mx-auto mb-2`} />
                <span className="text-sm font-medium text-gray-700">{tool.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Authenticate all requests securely",
              "Validate input before sending requests",
              "Handle errors gracefully",
              "Use caching to improve performance",
              "Avoid unnecessary API calls"
            ].map((practice, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{practice}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-[#1a2b4c] mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/guides/authentication" className="group block bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200">
              <div className="flex items-center space-x-3">
                <Shield size={20} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Authentication Guide</h4>
                  <p className="text-sm text-gray-500">Learn how to securely authenticate your API requests</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link to="/guides/best-practices" className="group block bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200">
              <div className="flex items-center space-x-3">
                <Zap size={20} className="text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Best Practices</h4>
                  <p className="text-sm text-gray-500">Optimize your API integration with industry best practices</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GettingStartedGuide;