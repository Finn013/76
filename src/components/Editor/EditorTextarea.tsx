import React, { useCallback, useEffect } from 'react';

interface EditorTextareaProps {
  content: string;
  onChange: (content: string) => void;
  onCursorChange: (position: number) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  showLineNumbers?: boolean;
  fontSize?: number;
  tabSize?: number;
  wordWrap?: boolean;
}

export const EditorTextarea: React.FC<EditorTextareaProps> = ({
  content,
  onChange,
  onCursorChange,
  textareaRef,
  showLineNumbers = true,
  fontSize = 14,
  tabSize = 2,
  wordWrap = true,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleSelectionChange = useCallback(() => {
    if (textareaRef.current) {
      onCursorChange(textareaRef.current.selectionStart);
    }
  }, [onCursorChange, textareaRef]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = ' '.repeat(tabSize);
      
      const newValue = content.substring(0, start) + spaces + content.substring(end);
      onChange(newValue);
      
      // Set cursor position after tab insertion
      setTimeout(() => {
        textarea.setSelectionRange(start + tabSize, start + tabSize);
      }, 0);
    }
  }, [content, onChange, tabSize]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('selectionchange', handleSelectionChange);
      return () => textarea.removeEventListener('selectionchange', handleSelectionChange);
    }
  }, [handleSelectionChange, textareaRef]);

  const lineNumbers = showLineNumbers ? content.split('\n').map((_, index) => index + 1) : [];

  return (
    <div className="flex flex-1 overflow-hidden">
      {showLineNumbers && (
        <div 
          className="bg-gray-50 border-r border-gray-200 px-2 py-2 text-gray-500 text-right select-none"
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.5' }}
        >
          {lineNumbers.map(num => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>
      )}
      
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSelect={handleSelectionChange}
        className="flex-1 p-2 border-none outline-none resize-none font-mono bg-white"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: '1.5',
          tabSize,
          whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
          wordWrap: wordWrap ? 'break-word' : 'normal',
        }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};