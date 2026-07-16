// pages/GuidesPage.jsx
import React from 'react';
import { BookOpen, Code, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuidesPage = () => {
  const guides = [
    {
      title: "Getting Started with Wisefares APIs",
      description: "Learn the basics of integrating Wisefares APIs into your applications.",
      icon: <BookOpen size={24} />,
      readTime: "10 min",
      level: "Beginner",
      path: "/guides/getting-started"
    },
    {
      title: "Authentication Guide",
      description: "Understand how to securely authenticate your API requests.",
      icon: <Code size={24} />,
      readTime: "15 min",
      level: "Intermediate",
      path: "/guides/authentication"
    },
    {
      title: "Building AI-Powered Travel Apps",
      description: "Harness the power of AI to create intelligent travel solutions.",
      icon: <Zap size={24} />,
      readTime: "20 min",
      level: "Advanced",
      path: "/guides/ai-powered-apps"
    },
    {
      title: "Best Practices for API Integration",
      description: "Optimize your integration with industry best practices.",
      icon: <Award size={24} />,
      readTime: "12 min",
      level: "Intermediate",
      path: "/guides/best-practices"
    }
  ];

  return (
    <div>
      <section className="bg-[#f8fafc] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1a2b4c] mb-4">Developer Guides</h1>
          <p className="text-gray-600 max-w-2xl">
            Comprehensive documentation and tutorials to help you build amazing travel applications.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <Link 
                key={index}
                to={guide.path}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-[#1a2b4c] group-hover:text-blue-600 transition-colors">
                    {guide.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1a2b4c] group-hover:text-blue-600 transition-colors mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{guide.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">{guide.readTime} read</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${guide.level === 'Beginner' ? 'bg-green-100 text-green-700' : ''}
                        ${guide.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${guide.level === 'Advanced' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {guide.level}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidesPage;