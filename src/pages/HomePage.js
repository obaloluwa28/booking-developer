import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Cpu } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const phrases = [
      "Build apps that move the world.",
      "Create travel experiences that inspire.",
      "Power your AI with real travel data.",
      "Connect to the future of travel."
    ];
    
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setTypedText(
        isDeleting
          ? fullText.substring(0, typedText.length - 1)
          : fullText.substring(0, typedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  const featuredProducts = [
    {
      title: "Agentic APIs",
      description: "Empower your AI agents with direct, accurate, and realtime access to Wisefares's industry...",
      version: "1.0",
      badge: "+Agentic ready",
      tags: ["SEARCH", "Wisefares AI", "TRAVEL AGENCY"],
      slug: "agentic-apis"
    },
    {
      title: "Wisefares IQ",
      description: "This collection compiles APIs embedded with intelligence powered by WisefaresIQ™ to enable you to build smarter, faster, and more...",
      version: "1.0",
      badge: "+Agentic ready",
      tags: ["SEARCH", "Wisefares AI", "TRAVEL AGENCY"],
      slug: "wisefares-iq"
    },
    {
      title: "AI for Developers",
      description: "AI for Developers is your entry point for all of Wisefares's AI solutions available to developers. Whether they are AI capabilities of our APIs or...",
      version: "1.0",
      badge: "+Agentic ready",
      tags: ["SEARCH", "Wisefares AI", "TRAVEL AGENCY"],
      slug: "ai-for-developers"
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-white to-gray-700 animate-gradient">
        <style jsx>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 15s ease infinite;
          }
        `}</style>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a2b4c] mb-6 max-w-5xl min-h-[120px] sm:min-h-[100px]">
              {typedText}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl">
              Our powerful APIs and services. Your solutions.
            </p>
            <Link 
              to="/product-catalog" 
              className="group bg-[#1a2b4c] text-white px-8 py-4 rounded-lg hover:bg-[#2a3b5c] transition-all transform hover:scale-105 font-medium inline-flex items-center space-x-2 shadow-lg"
            >
              <span>Explore Our APIs</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Tags */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-bold text-gray-500 tracking-wider">AI FOR DEVELOPERS</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs font-bold text-gray-500 tracking-wider">AIRLINES</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs font-bold text-gray-500 tracking-wider">TRAVEL AGENCIES</span>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="bg-[#f8fafc] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
                <Cpu size={16} className="text-[#1a2b4c]" />
                <span className="text-sm font-semibold text-[#1a2b4c]">Wisefares AI APIs</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2b4c] mb-6">
                Together, these tools unlock the ability for AI to seamlessly shop, book, service, and optimize trips in real time — moving agentic AI from promise to practical reality as a critical accelerator for travel industry innovation.
              </h2>
              
              <Link 
                to="/product-catalog" 
                className="inline-flex items-center text-[#1a2b4c] font-semibold hover:underline group"
              >
                VIEW ALL APIS 
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Content - Stats/Features */}
            <div className="grid grid-cols-2 gap-6">
              {['Real-time Processing', '99.9% Uptime', 'Global Coverage', '24/7 Support'].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-[#1a2b4c] mb-2">→</div>
                  <div className="text-sm text-gray-600">{stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1a2b4c]">Featured Product Collections</h2>
            <Link 
              to="/product-catalog" 
              className="text-[#1a2b4c] font-medium hover:underline hidden sm:block"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a2b4c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to start building?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get started with our APIs and documentation today. Join thousands of developers building the future of travel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/guides" 
              className="bg-white text-[#1a2b4c] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Read Documentation
            </Link>
            <Link 
              to="/support" 
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-[#1a2b4c] transition-colors font-medium"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;