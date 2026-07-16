const API_BASE_URL = 'http://localhost:5000/api';

export const blogService = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        return { success: true, message: 'Login successful' };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error' };
    }
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  },

  getPosts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      const data = await response.json();
      return data.posts || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  getPublishedPosts: async (page = 1, limit = 6, filters = {}) => {
    try {
      const params = new URLSearchParams({ page, limit, ...filters });
      const response = await fetch(`${API_BASE_URL}/posts/published?${params}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching published posts:', error);
      return { posts: [], total: 0, currentPage: page, totalPages: 1, hasMore: false };
    }
  },

  getPostBySlug: async (slug) => {
    try {
      console.log('Fetching post with slug:', slug);
      const response = await fetch(`${API_BASE_URL}/posts/${slug}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Post data received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  },

  getPostById: async (id) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/admin/posts/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching post by id:', error);
      return null;
    }
  },

  createPost: async (postData) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/admin/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      return { success: false, message: 'Network error' };
    }
  },

  updatePost: async (id, updatedData) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/admin/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating post:', error);
      return { success: false, message: 'Network error' };
    }
  },

  deletePost: async (id) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/admin/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting post:', error);
      return { success: false, message: 'Network error' };
    }
  },

  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getAllTags: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tags`);
      const data = await response.json();
      return data.tags || [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  },

  // In blogService.js, update the getSettings method:

  getSettings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`);
      const data = await response.json();

      // Return a properly structured object with defaults
      return {
        blogTitle: data.blog_title || 'Wisefares Blog',
        blogDescription: data.blog_description || 'Insights and updates from the Wisefares team',
        postsPerPage: parseInt(data.posts_per_page) || 6,
        enableComments: data.enable_comments === '1',
        moderationRequired: data.moderation_required === '1',
        emailNotifications: true, // Add this if not coming from backend
        adminEmail: data.admin_email || 'admin@wisefares.com',
        socialLinks: {
          twitter: data.social_twitter || '',
          facebook: data.social_facebook || '',
          linkedin: data.social_linkedin || '',
          github: data.social_github || ''
        },
        seo: {
          metaTitle: data.seo_meta_title || '',
          metaDescription: data.seo_meta_description || '',
          googleAnalyticsId: data.google_analytics_id || ''
        }
      };
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Return default settings on error
      return {
        blogTitle: 'Wisefares Blog',
        blogDescription: 'Insights and updates from the Wisefares team',
        postsPerPage: 6,
        enableComments: false,
        moderationRequired: true,
        emailNotifications: true,
        adminEmail: 'admin@wisefares.com',
        socialLinks: {
          twitter: '',
          facebook: '',
          linkedin: '',
          github: ''
        },
        seo: {
          metaTitle: '',
          metaDescription: '',
          googleAnalyticsId: ''
        }
      };
    }
  },

  updateSettings: async (settings) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating settings:', error);
      return { success: false, message: 'Network error' };
    }
  },

  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      return await response.json();
    } catch (error) {
      console.error('Error uploading image:', error);
      return { success: false, message: 'Network error' };
    }
  }
};