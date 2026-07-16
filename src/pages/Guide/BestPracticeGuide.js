// pages/BestPracticesGuide.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Copy, 
  Check, 
  Shield, 
  Zap, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Code,
  Lock,
  RefreshCw,
  ArrowLeft,
  TrendingUp,
  BarChart,
  Database,
  Server,
  Clock,
  Layout
} from 'lucide-react';

const BestPracticesGuide = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    validation: `// Validate input before sending to API
const validateFlightSearch = (params) => {
  const errors = [];
  
  if (!params.origin || params.origin.length !== 3) {
    errors.push("Origin must be a valid 3-letter airport code");
  }
  
  if (!params.destination || params.destination.length !== 3) {
    errors.push("Destination must be a valid 3-letter airport code");
  }
  
  if (!params.date || !/^\\d{4}-\\d{2}-\\d{2}$/.test(params.date)) {
    errors.push("Date must be in YYYY-MM-DD format");
  }
  
  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
  
  return true;
};`,

    retry: `const fetchWithRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (err) {
    // Don't retry on 4xx errors (client errors)
    if (err.response?.status >= 400 && err.response?.status < 500) {
      throw err;
    }
    
    if (retries > 0) {
      console.log(\`Retrying... \${retries} attempts left\`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(fn, retries - 1, delay * 2);
    }
    
    throw err;
  }
};

// Usage
const searchFlights = async (params) => {
  return fetchWithRetry(() => {
    return api.post("/flights/search", params);
  });
};`,

    caching: `// Simple caching implementation
const cache = new Map();

const getCachedData = async (key, fetchFn, ttl = 60000) => {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    console.log("Returning cached data");
    return cached.data;
  }
  
  const data = await fetchFn();
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
  
  return data;
};

// Usage
const searchFlightsWithCache = async (params) => {
  const cacheKey = \`flight_search_\${JSON.stringify(params)}\`;
  return getCachedData(cacheKey, () => api.post("/flights/search", params), 30000);
};`,

    environment: `// environment.config.js
const environments = {
  development: {
    API_BASE_URL: "https://api-dev.wisefares.com/v1",
    API_KEY: process.env.DEV_API_KEY,
    DEBUG: true
  },
  staging: {
    API_BASE_URL: "https://api-staging.wisefares.com/v1",
    API_KEY: process.env.STAGING_API_KEY,
    DEBUG: true
  },
  production: {
    API_BASE_URL: "https://api.wisefares.com/v1",
    API_KEY: process.env.PROD_API_KEY,
    DEBUG: false
  }
};

const environment = process.env.NODE_ENV || "development";
export const config = environments[environment];`
  };

  const bestPractices = [
    {
      icon: Layout,
      title: "Use Proper API Architecture",
      description: "Structure your application to separate concerns with a backend layer between your frontend and the Wisefares API.",
      points: [
        "Protects your API credentials",
        "Allows better control over logic",
        "Improves scalability and maintainability"
      ]
    },
    {
      icon: AlertCircle,
      title: "Handle Errors Gracefully",
      description: "Always anticipate API failures and handle them properly with user-friendly messages and logging.",
      points: [
        "Display user-friendly error messages",
        "Log errors for debugging",
        "Retry failed requests when appropriate"
      ]
    },
    {
      icon: Code,
      title: "Implement Request Validation",
      description: "Validate all input before sending requests to the API to prevent unnecessary calls and reduce errors.",
      points: [
        "Prevents unnecessary API calls",
        "Reduces errors",
        "Improves performance"
      ],
      code: "validation"
    },
    {
      icon: Database,
      title: "Use Caching for Performance",
      description: "Avoid repeated API calls for the same data to improve response time and reduce API usage.",
      points: [
        "Faster response time",
        "Reduced API usage",
        "Improved user experience"
      ],
      code: "caching"
    },
    {
      icon: TrendingUp,
      title: "Manage Rate Limits",
      description: "APIs often have usage limits. Implement request throttling and queue requests when necessary.",
      points: [
        "Avoid sending too many requests at once",
        "Implement request throttling",
        "Queue requests if necessary"
      ]
    },
    {
      icon: Lock,
      title: "Secure Your Integration",
      description: "Security should always be a priority when integrating with APIs.",
      doPoints: [
        "Store API keys in environment variables",
        "Use HTTPS for all requests",
        "Authenticate every request"
      ],
      dontPoints: [
        "Expose API keys in frontend code",
        "Hardcode credentials",
        "Share sensitive data publicly"
      ]
    },
    {
      icon: Zap,
      title: "Optimize API Calls",
      description: "Only request what you need to improve performance and reduce costs.",
      points: [
        "Avoid unnecessary repeated calls",
        "Combine requests where possible",
        "Use efficient endpoints"
      ]
    },
    {
      icon: RefreshCw,
      title: "Implement Retry Logic",
      description: "Network issues can cause temporary failures. Implement smart retry logic to handle them.",
      code: "retry"
    },
    {
      icon: BarChart,
      title: "Monitor and Log API Activity",
      description: "Track your API usage and performance to enable faster debugging and better reliability.",
      points: [
        "Faster debugging",
        "Better system reliability",
        "Performance optimization"
      ]
    },
    {
      icon: Server,
      title: "Use Environment Configuration",
      description: "Manage different environments properly for development, staging, and production.",
      code: "environment"
    },
    {
      icon: Database,
      title: "Maintain Consistent Data Handling",
      description: "Ensure consistent formatting and structure across your app for better maintainability.",
      points: [
        "Normalize API responses",
        "Use consistent naming conventions",
        "Handle null/empty values safely"
      ]
    },
    {
      icon: TrendingUp,
      title: "Plan for Scalability",
      description: "Design your system to handle growth with asynchronous processing and load balancing.",
      points: [
        "Use asynchronous processing",
        "Implement load balancing",
        "Optimize database queries"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-900 to-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/guides" className="hover:text-white transition-colors">Guides</Link>
            <ChevronRight size={14} />
            <span className="text-white">Best Practices</span>
          </div>
          
          <Link 
            to="/guides" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Guides
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <Shield size={40} className="text-green-300" />
            <h1 className="text-4xl lg:text-5xl font-bold">Best Practices for API Integration</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Optimize your integration with industry best practices
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span className="flex items-center text-gray-300 text-sm">
              <Clock size={14} className="mr-1" />
              12 min read
            </span>
            <span className="flex items-center text-gray-300 text-sm">
              <Zap size={14} className="mr-1" />
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
            Integrating with the Wisefares API requires more than just making requests—it involves building a reliable, 
            secure, and scalable system.
          </p>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <p className="text-green-800 text-sm">
              <strong> Goal:</strong> This guide outlines best practices to help you optimize performance, 
              improve reliability, and ensure a seamless user experience.
            </p>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">1. Use Proper API Architecture</h2>
          <p className="text-gray-600 mb-6">
            Structure your application to separate concerns:
          </p>
          <div className="bg-gray-900 rounded-lg p-6 mb-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center space-x-2">
                <Layout size={20} className="text-blue-400" />
                <span className="text-white">Frontend (UI)</span>
                <ChevronRight size={16} className="text-gray-500" />
                <Server size={20} className="text-green-400" />
                <span className="text-white">Backend (API Layer)</span>
                <ChevronRight size={16} className="text-gray-500" />
                <Zap size={20} className="text-purple-400" />
                <span className="text-white">Wisefares API</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Protects your API credentials",
              "Allows better control over logic",
              "Improves scalability and maintainability"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices Grid */}
        <div className="space-y-12">
          {bestPractices.map((practice, index) => (
            <section key={index} className="scroll-mt-24">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <practice.icon size={24} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#1a2b4c]">{practice.title}</h2>
              </div>
              
              <p className="text-gray-600 mb-4">{practice.description}</p>
              
              {practice.points && (
                <div className="grid md:grid-cols-3 gap-3 mb-4">
                  {practice.points.map((point, i) => (
                    <div key={i} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle size={16} className="text-green-600" />
                      <span className="text-sm text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {practice.doPoints && practice.dontPoints && (
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CheckCircle size={16} className="mr-2" /> ✅ Do:
                    </h4>
                    <ul className="space-y-2">
                      {practice.doPoints.map((point, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <XCircle size={16} className="mr-2" /> ❌ Don't:
                    </h4>
                    <ul className="space-y-2">
                      {practice.dontPoints.map((point, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {practice.code && codeExamples[practice.code] && (
                <div className="relative bg-gray-900 rounded-lg overflow-hidden mt-4">
                  <button
                    onClick={() => copyToClipboard(codeExamples[practice.code], practice.code)}
                    className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors z-10"
                    title="Copy code"
                  >
                    {copiedCode === practice.code ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} className="text-gray-400" />
                    )}
                  </button>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300 font-mono">
                      {codeExamples[practice.code]}
                    </code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Common Pitfalls */}
        <section className="mt-12 mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Common Pitfalls</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { issue: "Too many API calls", impact: "Rate limiting", solution: "Use caching" },
                  { issue: "Poor error handling", impact: "Bad UX", solution: "Handle errors properly" },
                  { issue: "Exposed API keys", impact: "Security risk", solution: "Use backend storage" }
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.issue}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.impact}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-[#1a2b4c] mb-4">Summary</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Build a secure and scalable integration</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Optimize performance with caching and efficient calls</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Handle errors and retries properly</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Monitor your system continuously</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default BestPracticesGuide;