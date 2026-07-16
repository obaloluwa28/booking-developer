import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye, Clock, Tag as TagIcon, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { blogService } from '../services/blogService';
import PostImage from '../components/PostImage';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Define loadRelatedPosts first
  const loadRelatedPosts = useCallback(async (category, currentPostId) => {
    try {
      const result = await blogService.getPublishedPosts(1, 3, { category });
      if (result && result.success && Array.isArray(result.posts)) {
        const filtered = result.posts.filter(p => p.id !== currentPostId);
        setRelatedPosts(filtered.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading related posts:', error);
    }
  }, []);

  // Define loadPost with useCallback, referencing loadRelatedPosts
  const loadPost = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading post with slug:', slug);
      const data = await blogService.getPostBySlug(slug);
      console.log('Received data:', data);
      
      if (data && data.success) {
        setPost(data);
        if (data.categories && data.categories.length > 0) {
          loadRelatedPosts(data.categories[0], data.id);
        }
      } else {
        setError('Post not found');
      }
    } catch (error) {
      console.error('Error loading post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  }, [slug, loadRelatedPosts]); 

  // Use useEffect with loadPost dependency
  useEffect(() => {
    loadPost();
  }, [loadPost]); 

  const formatContent = (content) => {
    if (!content) return null;

    if (content.includes('<')) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, idx) => {
      if (!paragraph.trim()) return null;

      if (paragraph.match(/^\d+\.\s.+/gm)) {
        const items = paragraph.split('\n');
        return (
          <ol key={idx} className="list-decimal ml-6 mb-4 space-y-2">
            {items.map((item, i) => {
              const match = item.match(/^\d+\.\s(.+)$/);
              return (
                <li key={i} className="text-gray-700">
                  {match ? match[1] : item}
                </li>
              );
            })}
          </ol>
        );
      }

      if (paragraph.match(/^[•\-*]\s.+/gm)) {
        const items = paragraph.split('\n');
        return (
          <ul key={idx} className="list-disc ml-6 mb-4 space-y-2">
            {items.map((item, i) => {
              const cleanItem = item.replace(/^[•\-*]\s/, '');
              return (
                <li key={i} className="text-gray-700">{cleanItem}</li>
              );
            })}
          </ul>
        );
      }

      const lines = paragraph.split('\n');
      if (lines.length > 1) {
        return (
          <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
            {lines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      }

      return <p key={idx} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>;
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title;
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2b4c] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The post you're looking for doesn't exist or has been removed."}</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center px-6 py-3 bg-[#1a2b4c] text-white rounded-lg hover:bg-[#2a3b5c] transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const readTime = calculateReadTime(post.content);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-gray-600 hover:text-[#1a2b4c] transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Share Button */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 text-gray-600 hover:text-[#1a2b4c] hover:bg-gray-100 rounded-full transition-colors"
            >
              <Share2 size={20} />
            </button>
            
            {showShareMenu && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-40">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
                >
                  <Facebook size={18} className="text-blue-600" />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
                >
                  <Twitter size={18} className="text-blue-400" />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
                >
                  <Linkedin size={18} className="text-blue-700" />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
                >
                  <LinkIcon size={18} className="text-gray-600" />
                  <span>Copy Link</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <PostImage
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-[#1a2b4c] mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#1a2b4c] rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
              {post.author?.name?.charAt(0) || 'A'}
            </div>
            <span className="font-medium">{post.author?.name || 'Admin'}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'No date'}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{readTime} min read</span>
          </div>
          <div className="flex items-center">
            <Eye size={16} className="mr-1" />
            <span>{post.views || 0} views</span>
          </div>
        </div>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map(cat => (
              <Link
                key={cat}
                to={`/blog?category=${encodeURIComponent(cat)}`}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-[#1a2b4c] prose-a:text-blue-600">
          {formatContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#1a2b4c] mb-3 flex items-center">
              <TagIcon size={18} className="mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-[#1a2b4c] mb-6">Related Posts</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group block"
                >
                  {related.featuredImage && (
                    <div className="mb-3 rounded-lg overflow-hidden">
                      <img
                        src={related.featuredImage}
                        alt={related.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h4 className="font-semibold text-[#1a2b4c] group-hover:text-blue-600 transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {related.publishedAt ? new Date(related.publishedAt).toLocaleDateString() : ''}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-[#1a2b4c] text-white rounded-full shadow-lg hover:bg-[#2a3b5c] transition-colors z-40"
          aria-label="Back to top"
        >
          <ArrowLeft size={20} className="rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default BlogPostPage;