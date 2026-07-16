import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const PostImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if it's a blob URL
  const isBlobUrl = src && src.startsWith('blob:');

  // If it's a blob URL or there's an error or no src, show placeholder
  if (isBlobUrl || error || !src) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <ImageIcon size={48} className="text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={() => setLoading(false)}
      onError={() => setError(true)}
      style={{ display: loading ? 'none' : 'block' }}
    />
  );
};

export default PostImage;