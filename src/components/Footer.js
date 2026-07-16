// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  // Get current year automatically
  const currentYear = new Date().getFullYear();
  const startYear = 2019;

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            <span>Wisefares © {startYear}-{currentYear} Wisefares GLBL Inc. </span>
            <Link to="/legal" className="hover:text-[#1a2b4c] mx-2">Legal</Link>
            <span>|</span>
            <Link to="/policy" className="hover:text-[#1a2b4c] mx-2">Policy</Link>
            <span>|</span>
            <Link to="/support" className="hover:text-[#1a2b4c] mx-2">Support</Link>
            <span>|</span>
            <Link to="/cookies" className="hover:text-[#1a2b4c] mx-2">Cookies</Link>
            <span>|</span>
            <Link to="/blog" className="hover:text-[#1a2b4c] mx-2">Blog</Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.facebook.com/wisefares" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#1a2b4c] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/company/wisefares-travels-and-tours/posts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#1a2b4c] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#1a2b4c] transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;