// pages/AuthenticationGuide.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Copy, 
  Check, 
  Key, 
  Shield, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Code,
  Lock,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';

const AuthenticationGuide = () => {
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
    Authorization: \`Bearer YOUR_ACCESS_TOKEN\`,
    "Content-Type": "application/json"
  }
});

const fetchFlights = async () => {
  try {
    const res = await api.get("/flights");
    console.log(res.data);
  } catch (error) {
    console.error("API Error:", error.response?.data);
  }
};

fetchFlights();`,

    python: `import requests

url = "https://api.wisefares.com/v1/flights"
headers = {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Content-Type": "application/json"
}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    print(response.json())
except requests.exceptions.RequestException as e:
    print(f"API Error: {e}")`,

    curl: `curl -X GET "https://api.wisefares.com/v1/flights" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json"`
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1a2b4c] to-[#2a3b5c] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/guides" className="hover:text-white transition-colors">Guides</Link>
            <ChevronRight size={14} />
            <span className="text-white">Authentication Guide</span>
          </div>
          
          <Link 
            to="/guides" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Guides
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Authentication Guide</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Securely authenticate your Wisefares API requests
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span className="flex items-center text-gray-300 text-sm">
              <Clock size={14} className="mr-1" />
              15 min read
            </span>
            <span className="flex items-center text-gray-300 text-sm">
              <Shield size={14} className="mr-1" />
              Intermediate
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Overview</h2>
          <p className="text-gray-600 mb-4">
            The Wisefares API uses token-based authentication to ensure that all requests are securely authorized. 
            Every request to the API must include a valid access token.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-blue-800 text-sm">
              <strong> Note:</strong> This guide explains how to obtain, use, and manage authentication credentials 
              when integrating with the Wisefares platform.
            </p>
          </div>
        </section>

        {/* Authentication Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Authentication Flow</h2>
          <p className="text-gray-600 mb-6">
            The authentication process follows these steps:
          </p>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { step: 1, title: "Obtain API credentials", desc: "Get your API Key and Secret" },
              { step: 2, title: "Generate access token", desc: "Request a new token" },
              { step: 3, title: "Include token in requests", desc: "Use Bearer authentication" },
              { step: 4, title: "Refresh when expired", desc: "Handle token expiration" }
            ].map((item) => (
              <div key={item.step} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">{item.step}</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step 1: Obtain Credentials */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Step 1: Obtain API Credentials</h2>
          <p className="text-gray-600 mb-4">
            To begin, you will need the following credentials:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <Key size={20} className="text-blue-600" />
              <span className="font-mono text-sm">API Key</span>
              <span className="text-gray-400 text-sm">(Required)</span>
            </div>
            <div className="flex items-center space-x-3">
              <Lock size={20} className="text-blue-600" />
              <span className="font-mono text-sm">API Secret</span>
              <span className="text-gray-400 text-sm">(Required)</span>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle size={18} className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                <strong className="font-semibold">Keep your credentials secure.</strong> Do not expose them in client-side code.
                Store them in environment variables or a secure secrets manager.
              </p>
            </div>
          </div>
        </section>

        {/* Step 2: Generate Access Token */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Step 2: Generate Access Token</h2>
          <p className="text-gray-600 mb-4">
            Before making API calls, you need to generate an access token.
          </p>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-sm font-mono text-gray-300">POST /auth/token</span>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Request Body</span>
                <pre className="mt-2 text-sm text-gray-300 overflow-x-auto">
                  <code>{`{
  "apiKey": "YOUR_API_KEY",
  "apiSecret": "YOUR_API_SECRET"
}`}</code>
                </pre>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Response</span>
                <pre className="mt-2 text-sm text-gray-300 overflow-x-auto">
                  <code>{`{
  "success": true,
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Authenticate API Requests */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Step 3: Authenticate API Requests</h2>
          <p className="text-gray-600 mb-4">
            Include the access token in the Authorization header of every request.
          </p>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-sm font-mono text-gray-300">GET /flights/search</span>
            </div>
            <div className="p-4">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`Authorization: Bearer ACCESS_TOKEN
Content-Type: application/json`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Step 4: Token Expiration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Step 4: Token Expiration</h2>
          <p className="text-gray-600 mb-4">
            Access tokens are valid for a limited time.
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
              <span className="text-gray-600">Default expiration:</span>
              <code className="text-sm bg-gray-900 text-gray-300 px-2 py-1 rounded">3600 seconds (1 hour)</code>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
              <span className="text-gray-600">After expiration:</span>
              <code className="text-sm text-red-600">401 Unauthorized</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Recommended approach:</span>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Cache the token securely</li>
                <li>Track expiration time</li>
                <li>Automatically request a new token when expired</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Example: Authenticated Request */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Example: Authenticated Request (Node.js)</h2>
          
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

        {/* Error Handling */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Error Handling</h2>
          <p className="text-gray-600 mb-4">
            When authentication fails, the API returns a 401 Unauthorized response:
          </p>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-sm font-mono text-gray-300">401 Unauthorized Response</span>
            </div>
            <div className="p-4">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired access token"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Security Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Shield, text: "Store credentials in environment variables" },
              { icon: Lock, text: "Always use HTTPS" },
              { icon: Code, text: "Never expose tokens in frontend applications" },
              { icon: RefreshCw, text: "Rotate API keys periodically" },
              { icon: Shield, text: "Implement server-side authentication handling" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <item.icon size={18} className="text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Common Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Common Issues</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { issue: "Missing Token", desc: "No Authorization header", resolution: "Add Bearer token" },
                  { issue: "Invalid Token", desc: "Token malformed or incorrect", resolution: "Regenerate token" },
                  { issue: "Expired Token", desc: "Token timeout reached", resolution: "Request new token" }
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.issue}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.desc}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.resolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-blue-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-[#1a2b4c] mb-4">Summary</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">All API requests require authentication</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Use Bearer tokens for secure access</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Handle token expiration properly</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Protect your API credentials at all times</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AuthenticationGuide;