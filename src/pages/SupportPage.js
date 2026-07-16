// pages/SupportPage.jsx
import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, Phone, FileText, ChevronRight, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupportPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  
  const phoneNumber = "+1 (800) 555-1234";
  const cleanPhoneNumber = "+18005551234";

  useEffect(() => {
    // Detect if user is on mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(userAgent));
    };
    
    checkMobile();
  }, []);

  const handlePhoneClick = (e) => {
    e.preventDefault();
    
    if (isMobile) {
      // On mobile, open phone app
      window.location.href = `tel:${cleanPhoneNumber}`;
    } else {
      // On desktop, show popup with number to copy
      setShowPhoneModal(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowPhoneModal(false);
    }, 2000);
  };

  const supportOptions = [
    {
      title: "Documentation",
      description: "Browse our comprehensive API documentation and guides",
      icon: <FileText size={24} />,
      link: "/guides",
      color: "bg-blue-50 text-blue-700",
      isExternal: false
    },
    {
      title: "Community Forum",
      description: "Connect with other developers and share solutions",
      icon: <MessageCircle size={24} />,
      link: "/community",
      color: "bg-green-50 text-green-700",
      isExternal: false
    },
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: <Mail size={24} />,
      link: "mailto:support@wisefares.com?subject=Support%20Request&body=Hello%20Wisefares%20Support%20Team%2C%0A%0A",
      color: "bg-purple-50 text-purple-700",
      isExternal: true
    },
    {
      title: "Phone Support",
      description: isMobile 
        ? "Call our support team directly" 
        : "Click to reveal phone number",
      icon: <Phone size={24} />,
      onClick: handlePhoneClick,
      color: "bg-orange-50 text-orange-700",
      isExternal: false,
      customAction: true
    }
  ];

  const faqs = [
    {
      question: "How do I get an API key?",
      answer: "Sign up for a developer account and create a new application in your dashboard to generate API keys."
    },
    {
      question: "What are the rate limits?",
      answer: "Rate limits vary by plan. Free tier allows 1000 requests per day, while paid plans offer higher limits."
    },
    {
      question: "Is there a sandbox environment?",
      answer: "Yes, we provide a complete sandbox environment for testing your integrations."
    }
  ];

  return (
    <div>
      {/* Phone Number Modal for Desktop */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-[#1a2b4c] mb-4">Call Support</h3>
            <p className="text-gray-600 mb-6">
              Click the button below to copy our support number. You can then paste it into your preferred calling app (Skype, Google Voice, etc.).
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-[#1a2b4c]">{phoneNumber}</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3b5c]"
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-6">
              <p className="mb-2">📱 <strong>Mobile users:</strong> Clicking this link will open your phone app</p>
              <p>💻 <strong>Desktop users:</strong> Use Skype, Google Voice, or any VoIP app to call us</p>
            </div>

            <button
              onClick={() => setShowPhoneModal(false)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <section className="bg-[#f8fafc] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1a2b4c] mb-4">Support</h1>
          <p className="text-gray-600 max-w-2xl">
            We're here to help you succeed. Choose the support option that works best for you.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supportOptions.map((option, index) => {
              const CardContent = (
                <>
                  <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center mb-4`}>
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2b4c] mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                  <div className="flex items-center text-[#1a2b4c] text-sm font-medium group-hover:underline">
                    Get help <ChevronRight size={16} className="ml-1" />
                  </div>
                </>
              );

              if (option.customAction) {
                return (
                  <button
                    key={index}
                    onClick={option.onClick}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group text-left w-full"
                  >
                    {CardContent}
                  </button>
                );
              }

              return option.isExternal ? (
                <a
                  key={index}
                  href={option.link}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group block"
                  {...(option.link.startsWith('mailto:') && {
                    onClick: (e) => {
                      e.preventDefault();
                      window.location.href = option.link;
                    }
                  })}
                >
                  {CardContent}
                </a>
              ) : (
                <Link
                  key={index}
                  to={option.link}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
                >
                  {CardContent}
                </Link>
              );
            })}
          </div>

          {/* FAQs */}
          <div className="bg-[#f8fafc] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-[#1a2b4c] mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;