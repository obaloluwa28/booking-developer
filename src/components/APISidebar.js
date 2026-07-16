// components/APISidebar.js
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const APISidebar = ({ 
  isOpen, 
  onClose, 
  apiName, 
  basePath, 
  endpointName,
  httpMethod
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedItems, setExpandedItems] = useState({
    reference: true,
    errors: false,
    transport: false,
    application: true,
    release: false
  });

  // Update active section based on current path and hash
  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash.replace('#', '');
    
    console.log('APISidebar - Current path:', path);
    console.log('APISidebar - Endpoint name:', endpointName);
    
    if (hash) {
      setActiveSection(hash);
    } else if (path.includes(`/${endpointName}`)) {
      console.log('Setting active section to postEndpoint');
      setActiveSection('postEndpoint');
    } else if (path.includes('/schemas')) {
      setActiveSection('schemas');
    } else if (path.includes('/errors')) {
      setActiveSection('introduction');
    } else if (path.includes('/release-notes')) {
      setActiveSection('version');
    } else {
      setActiveSection('overview');
    }
  }, [location.pathname, location.hash, endpointName]);

  // Auto-expand parent sections when child is active
  useEffect(() => {
    if (['clientErrors', 'serverErrors'].includes(activeSection)) {
      setExpandedItems(prev => ({ ...prev, transport: true }));
    }
    if (['badRequest', 'invalidData', 'forbidden'].includes(activeSection)) {
      setExpandedItems(prev => ({ ...prev, application: true }));
    }
    if (activeSection === 'version') {
      setExpandedItems(prev => ({ ...prev, release: true }));
    }
    if (['postEndpoint', 'schemas'].includes(activeSection)) {
      setExpandedItems(prev => ({ ...prev, reference: true }));
    }
  }, [activeSection]);

  const toggleExpand = (section) => {
    setExpandedItems(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNavigation = (path, sectionName, hash = '') => {
    console.log('Navigating to:', path, hash);
    setActiveSection(sectionName);
    if (hash) {
      navigate(`${path}${hash}`);
    } else {
      navigate(path);
    }
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Dynamic menu sections based on basePath and endpointName
  const menuSections = [
    {
      title: 'Menu',
      items: [
        { 
          name: 'Overview',
          path: `/product-catalog/agentic-apis/${basePath}`,
          key: 'overview'
        },
        { 
          name: 'Reference documentation', 
          subItems: [
            { 
              name: endpointName,
              subItems: [
                { 
                  name: `${httpMethod} /${endpointName}`,
                  path: `/product-catalog/agentic-apis/${basePath}/${endpointName}`, 
                  key: 'postEndpoint' 
                }
              ],
              key: 'endpoint'
            },
            { name: 'Schemas', path: `/product-catalog/agentic-apis/${basePath}/schemas`, key: 'schemas' }
          ],
          key: 'reference'
        }
      ]
    },
    {
      title: 'Errors documentation',
      items: [
        { 
          name: 'Introduction', 
          path: `/product-catalog/agentic-apis/${basePath}/errors`, 
          hash: '#introduction',
          key: 'introduction' 
        },
        { 
          name: 'Transport Layer', 
          subItems: [
            { 
              name: 'Client Errors (4xx)', 
              path: `/product-catalog/agentic-apis/${basePath}/errors`, 
              hash: '#client-errors',
              key: 'clientErrors' 
            },
            { 
              name: 'Server Errors (5xx)', 
              path: `/product-catalog/agentic-apis/${basePath}/errors`, 
              hash: '#server-errors',
              key: 'serverErrors' 
            }
          ],
          key: 'transport'
        },
        { 
          name: 'Application Layer', 
          subItems: [
            { 
              name: 'Bad Request', 
              path: `/product-catalog/agentic-apis/${basePath}/errors`, 
              hash: '#bad-request',
              key: 'badRequest' 
            },
            { 
              name: 'Invalid Data', 
              path: `/product-catalog/agentic-apis/${basePath}/errors`, 
              hash: '#invalid-data',
              key: 'invalidData' 
            },
            { 
              name: 'Forbidden', 
              path: `/product-catalog/agentic-apis/${basePath}/errors`, 
              hash: '#forbidden',
              key: 'forbidden' 
            }
          ],
          key: 'application'
        }
      ]
    },
    {
      title: 'Help',
      items: [
        { 
          name: 'Release notes', 
          subItems: [
            { name: '1.0 - January 30, 2026', path: `/product-catalog/agentic-apis/${basePath}/release-notes`, key: 'version' }
          ],
          key: 'release'
        }
      ]
    }
  ];

  const renderMenuItem = (item, depth = 0) => {
    const hasSubItems = item.subItems;
    const isExpanded = expandedItems[item.key];
    const paddingLeft = depth * 4;

    // Check if this item or any of its children is active
    const isThisItemActive = activeSection === item.key;
    
    // Check if any child is active (for parent items)
    let hasActiveChild = false;
    if (hasSubItems) {
      hasActiveChild = item.subItems.some(subItem => {
        if (subItem.subItems) {
          return subItem.subItems.some(nestedItem => activeSection === nestedItem.key);
        }
        return activeSection === subItem.key;
      });
    }

    if (hasSubItems) {
      return (
        <div key={item.name}>
          <button 
            onClick={() => toggleExpand(item.key)}
            style={{ paddingLeft: `${paddingLeft}px` }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
              isThisItemActive || hasActiveChild
                ? 'bg-blue-50 text-[#1a2b4c] font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="capitalize">{item.name}</span>
            {isExpanded ? 
              <ChevronDown size={16} className="text-gray-400" /> : 
              <ChevronRight size={16} className="text-gray-400" />
            }
          </button>
          
          {isExpanded && (
            <div className="ml-4">
              {item.subItems.map((subItem) => {
                if (subItem.subItems) {
                  return renderMenuItem(subItem, depth + 1);
                }
                const isSubItemActive = activeSection === subItem.key;
                return (
                  <button
                    key={subItem.name}
                    onClick={() => handleNavigation(subItem.path, subItem.key || subItem.name, subItem.hash)}
                    style={{ paddingLeft: `${(depth + 1) * 16 + 12}px` }}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                      isSubItemActive
                        ? 'bg-blue-50 text-[#1a2b4c] font-medium'
                        : 'text-gray-500 hover:text-[#1a2b4c] hover:bg-gray-50'
                    }`}
                  >
                    {subItem.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const isLeafItemActive = activeSection === item.key;
    return (
      <button
        key={item.name}
        onClick={() => handleNavigation(item.path, item.key || item.name, item.hash)}
        style={{ paddingLeft: `${paddingLeft + 12}px` }}
        className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
          isLeafItemActive
            ? 'bg-blue-50 text-[#1a2b4c] font-medium'
            : 'text-gray-500 hover:text-[#1a2b4c] hover:bg-gray-50'
        }`}
      >
        {item.name}
      </button>
    );
  };

  return (
    <>
      {/* Sidebar - Fixed positioning with lower z-index than footer */}
      <div className={`
        fixed lg:fixed inset-y-0 left-0 z-20 w-72 bg-white border-r border-gray-200 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        overflow-y-auto h-screen shadow-lg lg:shadow-none
      `}>
        <div className="p-6 h-full flex flex-col">
          {/* Mobile Close Button */}
          <button 
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          {/* Menu Header */}
          <div className="mb-2 flex-shrink-0">
            <h1 className="text-xl font-bold text-[#1a2b4c]">{apiName}</h1>
          </div>

          {/* Menu Sections - Scrollable area */}
          <div className="flex-1 overflow-y-auto mt-2">
            <div className="space-y-4">
              {menuSections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sticky top-0 bg-white py-2 z-10">
                    {section.title}
                  </h2>
                  <div>
                    {section.items.map(item => renderMenuItem(item))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default APISidebar;