// contexts/BlogContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { blogService } from '../services/blogService';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Load initial data
  useEffect(() => {
    loadPosts();
    loadSettings();
    loadCategories();
    loadTags();
  }, []);

  const loadPosts = (filters = {}) => {
    setLoading(true);
    const allPosts = blogService.getPosts(filters);
    setPosts(allPosts);
    setLoading(false);
  };

  const loadSettings = () => {
    const blogSettings = blogService.getSettings();
    setSettings(blogSettings);
  };

  const loadCategories = () => {
    const allCategories = blogService.getAllCategories();
    setCategories(allCategories);
  };

  const loadTags = () => {
    const allTags = blogService.getAllTags();
    setTags(allTags);
  };

  const value = {
    posts,
    settings,
    loading,
    categories,
    tags,
    loadPosts,
    loadSettings,
    loadCategories,
    loadTags,
    refreshData: () => {
      loadPosts();
      loadCategories();
      loadTags();
    }
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};