import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import PostImage from './PostImage';

const BlogCard = ({ post }) => {
  console.log('Rendering BlogCard with post:', post);
  
  if (!post) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/blog/${post.slug}`}>
        <PostImage 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[#1a2b4c] mb-2">
          <Link to={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            <span>{post.author?.name || 'Admin'}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'No date'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;