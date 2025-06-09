import React, { useState, useRef, useEffect } from 'react';
import './style.css';

interface TextEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialValue = '',
  onChange,
  placeholder = 'Start typing...',
  className = '',
  height = '300px',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(initialValue);
  
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setHtml(content);
      onChange?.(content);
    }
  };

  const formatText = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleContentChange();
    editorRef.current?.focus();
  };

  return (
    <div className={`text-editor-container ${className}`}>
      <div className="text-editor-toolbar">
        <div className="toolbar-section">
          <button type="button" onClick={() => formatText('bold')} title="Bold">
            <strong>B</strong>
          </button>
          <button type="button" onClick={() => formatText('underline')} title="Underline">
            <u>U</u>
          </button>
          <button type="button" onClick={() => formatText('italic')} title="Italic">
            <em>I</em>
          </button>
        </div>

        <div className="toolbar-section">
          <select
            onChange={(e) => {
              if (e.target.value) {
                formatText('formatBlock', e.target.value);
              }
              e.target.value = '';
            }}
            defaultValue=""
          >
            <option value="" disabled>Heading</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="p">Paragraph</option>
          </select>
        </div>

        <div className="toolbar-section">
          <button type="button" onClick={() => formatText('insertUnorderedList')} title="Bullet List">
            • List
          </button>
          <button type="button" onClick={() => formatText('insertOrderedList')} title="Numbered List">
            1. List
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        className="text-editor-content"
        contentEditable
        onInput={handleContentChange}
        placeholder={placeholder}
        style={{ minHeight: height }}
      />
    </div>
  );
};

export default TextEditor;