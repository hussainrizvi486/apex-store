import React, { useState } from 'react';
import { TextEditor } from '../components/ui';

const TextEditorDemo: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string>('');

  return (
    <div className="editor-demo-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Text Editor Demo</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>Features</h2>
        <ul>
          <li>Text formatting (Bold, Italic, Underline)</li>
          <li>Headings (H1-H4)</li>
          <li>Lists (Ordered and Unordered)</li>
          <li>Real-time content preview</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Editor</h3>
        <TextEditor
          initialValue="<p>Start editing here...</p><p>Try using the toolbar to:</p><ul><li><strong>Bold text</strong></li><li><u>Underline text</u></li><li>Create lists</li></ul>"
          onChange={setEditorContent}
          height="250px"
        />
      </div>

      <div>
        <h3>HTML Output</h3>
        <div
          style={{
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            maxHeight: '200px',
            overflow: 'auto'
          }}
        >
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {editorContent || '<p>Your editor content will appear here...</p>'}
          </pre>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Preview</h3>
        <div
          style={{
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minHeight: '100px'
          }}
          dangerouslySetInnerHTML={{ __html: editorContent || '<p>Your formatted content will appear here...</p>' }}
        />
      </div>
    </div>
  );
};

export default TextEditorDemo;