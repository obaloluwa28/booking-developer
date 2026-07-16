// pages/AiPoweredAppsGuide.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Copy, 
  Check, 
  Brain, 
  Rocket, 
  User, 
  Shield, 
  Zap,
  ArrowLeft,
  Database,
  Layout,
  Sparkles,
  Bot,
  ChartLine,
  Target,
  Clock,
  CheckCircle
} from 'lucide-react';

const AiPoweredAppsGuide = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    recommendations: `const recommendFlights = (flights, userPreferences) => {
  return flights.sort((a, b) => {
    const scoreA = Math.abs(a.price - userPreferences.budget) +
                   (a.airline === userPreferences.preferredAirline ? -100 : 0);
    const scoreB = Math.abs(b.price - userPreferences.budget) +
                   (b.airline === userPreferences.preferredAirline ? -100 : 0);
    return scoreA - scoreB;
  });
};`,

    integration: `import axios from "axios";

const getSmartFlights = async (query, userPreferences) => {
  // Step 1: Fetch data from Wisefares API
  const res = await axios.post(
    "https://api.wisefares.com/v1/flights/search",
    query,
    {
      headers: {
        Authorization: "Bearer YOUR_ACCESS_TOKEN"
      }
    }
  );

  const flights = res.data.data;

  // Step 2: Apply AI logic for smart ranking
  const rankedFlights = flights.sort((a, b) => {
    const priceScore = Math.abs(a.price - userPreferences.budget) -
                       Math.abs(b.price - userPreferences.budget);
    const airlineScore = (a.airline === userPreferences.preferredAirline ? -50 : 0) -
                         (b.airline === userPreferences.preferredAirline ? -50 : 0);
    return priceScore + airlineScore;
  });

  // Step 3: Return enhanced results
  return {
    flights: rankedFlights,
    recommended: rankedFlights[0],
    message: \`Found \${rankedFlights.length} flights matching your preferences\`
  };
};`,

    chatbot: `// AI Chatbot Intent Parser
const parseTravelIntent = (userMessage) => {
  const patterns = {
    origin: /(?:from|leaving|departing)\s+([A-Z]{3}|\w+)/i,
    destination: /(?:to|going to|arriving at)\s+([A-Z]{3}|\w+)/i,
    date: /(?:on|for)\s+(\w+\s+\d{1,2}(?:st|nd|rd|th)?|\d{4}-\d{2}-\d{2}|tomorrow|next week)/i,
    budget: /(?:budget|under|less than)\s+(\d+)/i
  };

  const intent = {
    action: "search_flights",
    parameters: {}
  };

  for (const [key, pattern] of Object.entries(patterns)) {
    const match = userMessage.match(pattern);
    if (match) {
      intent.parameters[key] = match[1];
    }
  }

  return intent;
};

// Example usage
const userMessage = "Find me a cheap flight from Lagos to Doha next week";
const intent = parseTravelIntent(userMessage);
// Returns: {
//   action: "search_flights",
//   parameters: {
//     origin: "Lagos",
//     destination: "Doha",
//     date: "next week"
//   }
// }`,

    profile: `{
  "userId": 101,
  "preferences": {
    "seatClass": "economy",
    "airlines": ["Qatar Airways", "Emirates"],
    "budget": 500000,
    "preferredAirports": ["LOS", "DXB"],
    "frequentDestinations": ["DXB", "LHR", "JFK"],
    "travelFrequency": "monthly",
    "specialOffers": true
  },
  "history": {
    "pastBookings": 12,
    "totalSpent": 4200000,
    "lastBooking": "2024-03-15"
  }
}`
  };

  const useCases = [
    {
      icon: Brain,
      title: "Smart Flight Recommendations",
      description: "AI analyzes user behavior and suggests relevant flights based on preferences, budget, and past searches.",
      code: "recommendations"
    },
    {
      icon: Bot,
      title: "AI Chatbot for Travel Booking",
      description: "Build a conversational assistant that interacts with users naturally to find and book flights.",
      code: "chatbot"
    },
    {
      icon: ChartLine,
      title: "Price Prediction",
      description: "Help users decide when to book by predicting whether flight prices will go up or down.",
      code: null
    },
    {
      icon: User,
      title: "Personalized Travel Experience",
      description: "Tailor the experience for each user based on their preferences and travel history.",
      code: "profile"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/guides" className="hover:text-white transition-colors">Guides</Link>
            <ChevronRight size={14} />
            <span className="text-white">AI-Powered Travel Apps</span>
          </div>
          
          <Link 
            to="/guides" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Guides
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <Brain size={40} className="text-purple-300" />
            <h1 className="text-4xl lg:text-5xl font-bold">Building AI-Powered Travel Apps</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Harness the power of AI to create intelligent travel solutions
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span className="flex items-center text-gray-300 text-sm">
              <Clock size={14} className="mr-1" />
              20 min read
            </span>
            <span className="flex items-center text-gray-300 text-sm">
              <Zap size={14} className="mr-1" />
              Advanced
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Overview</h2>
          <p className="text-gray-600 mb-4">
            Artificial Intelligence (AI) enables developers to build smarter, more personalized travel applications. 
            By combining Wisefares APIs with AI capabilities, you can deliver enhanced user experiences such as 
            intelligent search, automated recommendations, and conversational booking.
          </p>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
            <p className="text-purple-800 text-sm">
              <strong>🤖 AI + Travel:</strong> This guide outlines how to integrate AI into your travel application 
              using Wisefares APIs.
            </p>
          </div>
        </section>

        {/* What You Can Build */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">What You Can Build</h2>
          <p className="text-gray-600 mb-6">
            With AI + Wisefares APIs, you can create:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              "Smart Flight Recommendations",
              "Personalized Travel Suggestions",
              "Conversational Booking Assistants",
              "Price Prediction & Alerts",
              "Auto-filled Booking Forms"
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                <Sparkles size={20} className="text-purple-500 mx-auto mb-2" />
                <span className="text-xs text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Core Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Core Architecture</h2>
          <p className="text-gray-600 mb-6">
            A typical AI-powered travel app consists of:
          </p>
          <div className="bg-gray-900 rounded-lg p-6 mb-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                <Layout size={20} className="text-blue-400" />
                <span className="text-white">Frontend (Web/Mobile)</span>
                <ChevronRight size={16} className="text-gray-500" />
                <Database size={20} className="text-green-400" />
                <span className="text-white">Backend (API Server)</span>
                <ChevronRight size={16} className="text-gray-500" />
                <Rocket size={20} className="text-purple-400" />
                <span className="text-white">Wisefares APIs + AI Service</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Layout, title: "Frontend", desc: "User interface (React, mobile apps)" },
              { icon: Database, title: "Backend", desc: "Handles API calls and business logic" },
              { icon: Rocket, title: "Wisefares API", desc: "Flight data & booking" },
              { icon: Brain, title: "AI Layer", desc: "Intelligence (recommendations, NLP, predictions)" }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <item.icon size={24} className="text-purple-500 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">Use Cases</h2>
          {useCases.map((useCase, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <useCase.icon size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{useCase.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{useCase.description}</p>
              
              {useCase.code && codeExamples[useCase.code] && (
                <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <button
                    onClick={() => copyToClipboard(codeExamples[useCase.code], useCase.code)}
                    className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors z-10"
                    title="Copy code"
                  >
                    {copiedCode === useCase.code ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} className="text-gray-400" />
                    )}
                  </button>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300 font-mono">
                      {codeExamples[useCase.code]}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Chatbot Example Interaction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">AI Chatbot for Travel Booking</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h4 className="font-medium text-gray-700">Example Interaction</h4>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-lg px-4 py-2 max-w-[80%]">
                  Find me a cheap flight from Lagos to Doha next week
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 max-w-[80%]">
                  <p>I found several flights from Lagos (LOS) to Doha (DOH) for next week:</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>✈️ Qatar Airways - $850 - 7h 30m</li>
                    <li>✈️ Emirates - $920 - 8h 15m</li>
                    <li>✈️ Ethiopian Airlines - $780 - 9h 45m (1 stop)</li>
                  </ul>
                  <p className="mt-2">Would you like me to book the cheapest option?</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrating AI with Wisefares API */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Integrating AI with Wisefares API</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { step: 1, title: "Fetch Data", desc: "Use Wisefares API to get flight data", icon: Rocket },
              { step: 2, title: "Process with AI", desc: "Ranking, filtering, prediction, NLP parsing", icon: Brain },
              { step: 3, title: "Return Enhanced Results", desc: "Send intelligent results back to user", icon: Target }
            ].map((item) => (
              <div key={item.step} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon size={24} className="text-purple-600" />
                </div>
                <div className="text-sm font-bold text-purple-600 mb-1">Step {item.step}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Example: AI + API Integration</h3>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={() => copyToClipboard(codeExamples.integration, 'integration')}
              className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors z-10"
              title="Copy code"
            >
              {copiedCode === 'integration' ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-gray-300 font-mono">
                {codeExamples.integration}
              </code>
            </pre>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Combine AI with real-time API data",
              "Keep AI logic on the backend",
              "Continuously improve models using user data",
              "Provide fallback results if AI fails",
              "Ensure fast response times"
            ].map((practice, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{practice}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Considerations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Performance Considerations</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <Zap size={18} className="text-yellow-500 mr-2 mt-0.5" />
                <span className="text-gray-700">Cache frequent queries to reduce API calls</span>
              </li>
              <li className="flex items-start">
                <Zap size={18} className="text-yellow-500 mr-2 mt-0.5" />
                <span className="text-gray-700">Limit API calls where possible with intelligent throttling</span>
              </li>
              <li className="flex items-start">
                <Zap size={18} className="text-yellow-500 mr-2 mt-0.5" />
                <span className="text-gray-700">Use asynchronous processing for AI tasks</span>
              </li>
              <li className="flex items-start">
                <Zap size={18} className="text-yellow-500 mr-2 mt-0.5" />
                <span className="text-gray-700">Optimize response time for better UX</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Security & Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Security & Privacy</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Do not expose sensitive user data",
              "Anonymize data used for AI training",
              "Follow data protection regulations",
              "Secure API communication with HTTPS"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Shield size={18} className="text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Common Challenges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">Common Challenges</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Challenge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { challenge: "Slow AI responses", solution: "Use caching & async processing" },
                  { challenge: "Poor recommendations", solution: "Improve training data" },
                  { challenge: "Complex user queries", solution: "Use better NLP models" }
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.challenge}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-[#1a2b4c] mb-4">Summary</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">AI enhances travel applications with intelligence</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Wisefares APIs provide real-time travel data</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Combining both enables powerful user experiences</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Start simple and scale AI features gradually</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AiPoweredAppsGuide;