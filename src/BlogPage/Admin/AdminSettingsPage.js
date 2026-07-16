// pages/Admin/AdminSettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  Save,
  Globe,
  LayoutDashboard,
  FileText,
  Shield,
  Bell
} from 'lucide-react';
import { blogService } from '../services/blogService';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    blogTitle: '',
    blogDescription: '',
    postsPerPage: 6,
    enableComments: false,
    moderationRequired: true,
    emailNotifications: true,
    adminEmail: '',
    socialLinks: {
      twitter: '',
      facebook: '',
      linkedin: '',

    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      googleAnalyticsId: ''
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const blogSettings = await blogService.getSettings();
      console.log('Loaded settings:', blogSettings); // Debug log
      
      // Ensure all nested objects exist
      setSettings({
        blogTitle: blogSettings.blogTitle || '',
        blogDescription: blogSettings.blogDescription || '',
        postsPerPage: blogSettings.postsPerPage || 6,
        enableComments: blogSettings.enableComments || false,
        moderationRequired: blogSettings.moderationRequired || true,
        emailNotifications: blogSettings.emailNotifications || true,
        adminEmail: blogSettings.adminEmail || '',
        socialLinks: {
          twitter: blogSettings.socialLinks?.twitter || '',
          facebook: blogSettings.socialLinks?.facebook || '',
          linkedin: blogSettings.socialLinks?.linkedin || '',
        },
        seo: {
          metaTitle: blogSettings.seo?.metaTitle || '',
          metaDescription: blogSettings.seo?.metaDescription || '',
          googleAnalyticsId: blogSettings.seo?.googleAnalyticsId || ''
        }
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSocialChange = (platform, value) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: {
        ...(prev.socialLinks || {}),
        [platform]: value
      }
    }));
  };

  const handleSeoChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      seo: {
        ...(prev.seo || {}),
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await blogService.updateSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'social', name: 'Social Media', icon: Globe },
    { id: 'seo', name: 'SEO', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2b4c]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Admin Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
          <div className="p-6">
            <h1 className="text-xl font-bold text-[#1a2b4c] mb-6">Wisefares Admin</h1>
            
            <nav className="space-y-2">
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/posts"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <FileText size={20} />
                <span>Posts</span>
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-[#1a2b4c] rounded-lg font-medium"
              >
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-[#1a2b4c]">Blog Settings</h1>
              
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 px-4 py-2 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3b5c] disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>

            {/* Success Message */}
            {saveSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                Settings saved successfully!
              </div>
            )}

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 px-1 flex items-center space-x-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-[#1a2b4c] text-[#1a2b4c]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      name="blogTitle"
                      value={settings.blogTitle || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blog Description
                    </label>
                    <textarea
                      name="blogDescription"
                      value={settings.blogDescription || ''}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posts Per Page
                    </label>
                    <input
                      type="number"
                      name="postsPerPage"
                      value={settings.postsPerPage || 6}
                      onChange={handleChange}
                      min="1"
                      max="20"
                      className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="enableComments"
                        checked={settings.enableComments || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Enable Comments</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="moderationRequired"
                        checked={settings.moderationRequired || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Comments require moderation</span>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter URL
                    </label>
                    <input
                      type="url"
                      value={settings.socialLinks?.twitter || ''}
                      onChange={(e) => handleSocialChange('twitter', e.target.value)}
                      placeholder="https://twitter.com/wisefares"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      value={settings.socialLinks?.facebook || ''}
                      onChange={(e) => handleSocialChange('facebook', e.target.value)}
                      placeholder="https://facebook.com/wisefares"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={settings.socialLinks?.linkedin || ''}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/company/wisefares"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={settings.seo?.metaTitle || ''}
                      onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={settings.seo?.metaDescription || ''}
                      onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      value={settings.seo?.googleAnalyticsId || ''}
                      onChange={(e) => handleSeoChange('googleAnalyticsId', e.target.value)}
                      placeholder="UA-XXXXXXXXX-X"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      name="adminEmail"
                      value={settings.adminEmail || ''}
                      onChange={handleChange}
                      placeholder="admin@wisefares.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={settings.emailNotifications || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Receive email notifications for new comments</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="moderationRequired"
                        checked={settings.moderationRequired || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Notify when comments need moderation</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;