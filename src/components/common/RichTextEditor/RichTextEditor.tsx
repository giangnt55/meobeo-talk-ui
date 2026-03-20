import React, { useState, useRef, useEffect } from 'react';
import './RichTextEditor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

type FormatType = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code';
type ListType = 'ul' | 'ol';
type HeadingType = 'h1' | 'h2' | 'h3' | 'normal';

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  minHeight = '20rem',
  onImageUpload,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [currentFormats, setCurrentFormats] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      onChange(newContent);
      updateFormatState();
    }
  };

  const updateFormatState = () => {
    const formats = new Set<string>();
    
    if (document.queryCommandState('bold')) formats.add('bold');
    if (document.queryCommandState('italic')) formats.add('italic');
    if (document.queryCommandState('underline')) formats.add('underline');
    if (document.queryCommandState('strikeThrough')) formats.add('strikethrough');
    if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
    if (document.queryCommandState('insertOrderedList')) formats.add('ol');

    setCurrentFormats(formats);
  };

  const applyFormat = (format: FormatType) => {
    const commands: Record<FormatType, string> = {
      bold: 'bold',
      italic: 'italic',
      underline: 'underline',
      strikethrough: 'strikeThrough',
      code: 'formatBlock',
    };

    if (format === 'code') {
      document.execCommand('formatBlock', false, 'pre');
    } else {
      document.execCommand(commands[format], false);
    }
    
    editorRef.current?.focus();
    updateFormatState();
  };

  const applyList = (listType: ListType) => {
    const commands = {
      ul: 'insertUnorderedList',
      ol: 'insertOrderedList',
    };
    
    document.execCommand(commands[listType], false);
    editorRef.current?.focus();
    updateFormatState();
  };

  const applyHeading = (heading: HeadingType) => {
    if (heading === 'normal') {
      document.execCommand('formatBlock', false, 'p');
    } else {
      document.execCommand('formatBlock', false, heading);
    }
    editorRef.current?.focus();
    updateFormatState();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      document.execCommand('createLink', false, url);
      editorRef.current?.focus();
    }
  };

  const insertEmoji = () => {
    const emojis = ['😊', '❤️', '👍', '🎉', '🌟', '✨', '🔥', '💯', '🚀', '💡'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    document.execCommand('insertText', false, emoji);
    editorRef.current?.focus();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (onImageUpload) {
      try {
        const imageUrl = await onImageUpload(file);
        insertImage(imageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    } else {
      // Fallback: use local URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          insertImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    
    // Reset input
    e.target.value = '';
  };

  const insertImage = (url: string) => {
    const img = `<img src="${url}" alt="Uploaded image" style="max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0;" />`;
    document.execCommand('insertHTML', false, img);
    editorRef.current?.focus();
  };

  const clearFormatting = () => {
    document.execCommand('removeFormat', false);
    editorRef.current?.focus();
  };

  const undo = () => {
    document.execCommand('undo', false);
    editorRef.current?.focus();
  };

  const redo = () => {
    document.execCommand('redo', false);
    editorRef.current?.focus();
  };

  return (
    <div className={`rich-editor-container ${isFocused ? 'focused' : ''}`}>
      <div className="rich-editor-toolbar">
        {/* Undo/Redo */}
        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-button"
            onClick={undo}
            title="Undo (Ctrl+Z)"
          >
            <span className="material-icons">undo</span>
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={redo}
            title="Redo (Ctrl+Y)"
          >
            <span className="material-icons">redo</span>
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Text Formatting */}
        <div className="toolbar-group">
          <button
            type="button"
            className={`toolbar-button ${currentFormats.has('bold') ? 'active' : ''}`}
            onClick={() => applyFormat('bold')}
            title="Bold (Ctrl+B)"
          >
            <span className="material-icons">format_bold</span>
          </button>
          <button
            type="button"
            className={`toolbar-button ${currentFormats.has('italic') ? 'active' : ''}`}
            onClick={() => applyFormat('italic')}
            title="Italic (Ctrl+I)"
          >
            <span className="material-icons">format_italic</span>
          </button>
          <button
            type="button"
            className={`toolbar-button ${currentFormats.has('underline') ? 'active' : ''}`}
            onClick={() => applyFormat('underline')}
            title="Underline (Ctrl+U)"
          >
            <span className="material-icons">format_underlined</span>
          </button>
          <button
            type="button"
            className={`toolbar-button ${currentFormats.has('strikethrough') ? 'active' : ''}`}
            onClick={() => applyFormat('strikethrough')}
            title="Strikethrough"
          >
            <span className="material-icons">format_strikethrough</span>
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Headings */}
        <div className="toolbar-group">
          <select
            className="toolbar-select"
            onChange={(e) => applyHeading(e.target.value as HeadingType)}
            defaultValue="normal"
            title="Text style"
          >
            <option value="normal">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>
        </div>

        <div className="toolbar-divider" />

        {/* Lists */}
        <div className="toolbar-group">
          <button
            type="button"
            className={`toolbar-button ${currentFormats.has('ul') ? 'active' : ''}`}
            onClick={() => applyList('ul')}
            title="Bullet list"
          >
            <span className="material-icons">format_list_bulleted</span>
          </button>
          <button
            type="button"
            className={`toolbar-button ${currentFormats.has('ol') ? 'active' : ''}`}
            onClick={() => applyList('ol')}
            title="Numbered list"
          >
            <span className="material-icons">format_list_numbered</span>
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Insert */}
        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-button"
            onClick={insertLink}
            title="Insert link"
          >
            <span className="material-icons">link</span>
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={() => fileInputRef.current?.click()}
            title="Insert image"
          >
            <span className="material-icons">image</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            className="toolbar-button"
            onClick={insertEmoji}
            title="Insert emoji"
          >
            <span className="material-icons">sentiment_satisfied</span>
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={() => applyFormat('code')}
            title="Code block"
          >
            <span className="material-icons">code</span>
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Clear */}
        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-button"
            onClick={clearFormatting}
            title="Clear formatting"
          >
            <span className="material-icons">format_clear</span>
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        className="rich-editor-content"
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseUp={updateFormatState}
        onKeyUp={updateFormatState}
        data-placeholder={placeholder}
        style={{ minHeight }}
        suppressContentEditableWarning
      />
    </div>
  );
};