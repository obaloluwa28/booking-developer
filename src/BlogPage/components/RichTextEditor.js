// components/RichTextEditor.jsx
import React, { useState, useRef } from 'react';
import {
  Bold, Italic, Underline, List,
  Link as LinkIcon,
  Image, Code, Quote, Eye, Type, Hash
} from 'lucide-react';

const RichTextEditor = ({ value, onChange }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef(null);

  // Function to convert plain text to HTML for preview
  const convertToHtml = (text) => {
    if (!text) return '';
    
    let html = text;
    
    // Convert numbered lists (1. Item, 2. Item, etc.)
    html = html.replace(/^(\d+)\.\s+(.+)$/gm, '<li>$2</li>');
    
    // Wrap consecutive list items in <ol> tags
    const lines = html.split('\n');
    let inList = false;
    let result = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if line is a list item
      if (line.startsWith('<li>')) {
        if (!inList) {
          result.push('<ol>');
          inList = true;
        }
        result.push(line);
      } else {
        if (inList) {
          result.push('</ol>');
          inList = false;
        }
        
        // Handle regular paragraphs
        if (line.trim() === '') {
          result.push('<br/>');
        } else if (!line.startsWith('<')) {
          result.push(`<p>${line}</p>`);
        } else {
          result.push(line);
        }
      }
    }
    
    if (inList) {
      result.push('</ol>');
    }
    
    return result.join('\n');
  };

  const wrapSelection = (before, after) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = 
      value.substring(0, start) + 
      before + selectedText + after + 
      value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        end + before.length
      );
    }, 0);
  };

  const insertAtCursor = (text) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = 
      value.substring(0, start) + 
      text + 
      value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const handleLink = () => {
    if (showLinkInput && linkUrl) {
      wrapSelection(`<a href="${linkUrl}" target="_blank">`, '</a>');
      setShowLinkInput(false);
      setLinkUrl('');
    } else {
      setShowLinkInput(true);
    }
  };

  const handleImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      insertAtCursor(`<img src="${url}" alt="image" class="max-w-full h-auto my-4" />`);
    }
  };

  const insertNumberedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    if (selectedText) {
      // Convert selected lines to numbered list
      const lines = selectedText.split('\n');
      const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
      const newText = value.substring(0, start) + numberedLines + value.substring(end);
      onChange(newText);
    } else {
      // Insert a new numbered list item at cursor
      insertAtCursor('1. ');
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          onClick={() => wrapSelection('<strong>', '</strong>')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
          type="button"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => wrapSelection('<em>', '</em>')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
          type="button"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => wrapSelection('<u>', '</u>')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Underline"
          type="button"
        >
          <Underline size={18} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        
        <button
          onClick={() => wrapSelection('<p>', '</p>')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Paragraph"
          type="button"
        >
          <Type size={18} />
        </button>
        
        <button
          onClick={insertNumberedList}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
          type="button"
        >
          <Hash size={18} />
        </button>
        
        <button
          onClick={() => wrapSelection('<ul>\n  <li>', '</li>\n</ul>')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
          type="button"
        >
          <List size={18} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        
        <button
          onClick={() => wrapSelection('<blockquote>', '</blockquote>')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Quote"
          type="button"
        >
          <Quote size={18} />
        </button>
        <button
          onClick={() => wrapSelection('<pre><code>', '</code></pre>')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Code Block"
          type="button"
        >
          <Code size={18} />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        
        <button
          onClick={handleLink}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Insert Link"
          type="button"
        >
          <LinkIcon size={18} />
        </button>
        <button
          onClick={handleImage}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Insert Image"
          type="button"
        >
          <Image size={18} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`p-2 rounded transition-colors ${
            showPreview ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'
          }`}
          title="Toggle Preview"
          type="button"
        >
          <Eye size={18} />
        </button>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="bg-gray-50 p-2 border-b border-gray-300 flex gap-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL..."
            className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLink}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            type="button"
          >
            Add
          </button>
          <button
            onClick={() => setShowLinkInput(false)}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            type="button"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Editor/Preview Split */}
      {showPreview ? (
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          {/* Editor */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={20}
            className="w-full p-4 focus:outline-none font-mono resize-y"
            style={{ 
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.6',
              minHeight: '500px'
            }}
            placeholder="Write your content here... 

Example:
1. First news item
2. Second news item
3. Third news item

Use the numbered list button for automatic numbering!"
          />
          
          {/* Preview */}
          <div className="p-4 prose max-w-none overflow-y-auto bg-gray-50" style={{ minHeight: '500px' }}>
            <div dangerouslySetInnerHTML={{ __html: convertToHtml(value) }} />
          </div>
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={20}
          className="w-full p-4 focus:outline-none font-mono resize-y"
          style={{ 
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            minHeight: '500px'
          }}
          placeholder="Write your content here... 

Example:
1. First news item
2. Second news item
3. Third news item

Use the numbered list button for automatic numbering!"
        />
      )}

      {/* Helper text */}
      <div className="bg-gray-50 border-t border-gray-300 p-2 text-xs text-gray-500">
        <p>💡 Tips:</p>
        <ul className="list-disc ml-4 mt-1">
          <li>Type "1. " to start a numbered list</li>
          <li>Press Enter twice for new paragraph</li>
          <li>Use the numbered list button to format selected text</li>
          <li>Toggle preview to see how it will look</li>
        </ul>
      </div>
    </div>
  );
};

export default RichTextEditor;