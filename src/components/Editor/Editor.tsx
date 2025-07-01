import React, { useMemo, useCallback } from 'react';
import { EditorToolbar } from './EditorToolbar';
import { EditorTextarea } from './EditorTextarea';
import { EditorStatusBar } from './EditorStatusBar';
import { useEditorState } from '../../hooks/useEditorState';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { EditorConfig, KeyboardShortcut } from '../../types';

interface EditorProps {
  initialContent?: string;
  config?: Partial<EditorConfig>;
  onSave?: (content: string) => void;
  onContentChange?: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
  initialContent = '',
  config = {},
  onSave,
  onContentChange,
}) => {
  const { editorState, textareaRef, updateContent, setCursorPosition } = useEditorState(initialContent);
  
  const editorConfig: EditorConfig = {
    theme: 'light',
    fontSize: 14,
    tabSize: 2,
    wordWrap: true,
    showLineNumbers: true,
    ...config,
  };

  const shortcuts: KeyboardShortcut[] = [
    { key: 's', ctrlKey: true, action: 'save' },
    { key: 'z', ctrlKey: true, action: 'undo' },
    { key: 'y', ctrlKey: true, action: 'redo' },
    { key: 'f', ctrlKey: true, action: 'search' },
  ];

  const handleShortcut = useCallback((action: string) => {
    switch (action) {
      case 'save':
        if (editorState.isModified && onSave) {
          onSave(editorState.content);
        }
        break;
      case 'undo':
        // TODO: Implement undo functionality
        console.log('Undo');
        break;
      case 'redo':
        // TODO: Implement redo functionality
        console.log('Redo');
        break;
      case 'search':
        // TODO: Implement search functionality
        console.log('Search');
        break;
    }
  }, [editorState, onSave]);

  useKeyboardShortcuts({
    shortcuts,
    onShortcut: handleShortcut,
  });

  const handleContentChange = useCallback((newContent: string) => {
    updateContent(newContent);
    onContentChange?.(newContent);
  }, [updateContent, onContentChange]);

  const statusBarData = useMemo(() => {
    const lines = editorState.content.split('\n');
    const totalLines = lines.length;
    
    let currentLine = 1;
    let currentColumn = 1;
    let position = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1; // +1 for newline
      if (position + lineLength > editorState.cursorPosition) {
        currentLine = i + 1;
        currentColumn = editorState.cursorPosition - position + 1;
        break;
      }
      position += lineLength;
    }

    const wordCount = editorState.content
      .split(/\s+/)
      .filter(word => word.length > 0).length;

    return {
      totalLines,
      currentLine,
      currentColumn,
      wordCount,
    };
  }, [editorState.content, editorState.cursorPosition]);

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <EditorToolbar
        onSave={() => onSave?.(editorState.content)}
        onUndo={() => handleShortcut('undo')}
        onRedo={() => handleShortcut('redo')}
        onSearch={() => handleShortcut('search')}
        onSettings={() => console.log('Settings')}
        canUndo={false} // TODO: Implement undo/redo state
        canRedo={false}
        isModified={editorState.isModified}
      />
      
      <EditorTextarea
        content={editorState.content}
        onChange={handleContentChange}
        onCursorChange={setCursorPosition}
        textareaRef={textareaRef}
        showLineNumbers={editorConfig.showLineNumbers}
        fontSize={editorConfig.fontSize}
        tabSize={editorConfig.tabSize}
        wordWrap={editorConfig.wordWrap}
      />
      
      <EditorStatusBar
        cursorPosition={editorState.cursorPosition}
        totalLines={statusBarData.totalLines}
        currentLine={statusBarData.currentLine}
        currentColumn={statusBarData.currentColumn}
        isModified={editorState.isModified}
        wordCount={statusBarData.wordCount}
      />
    </div>
  );
};