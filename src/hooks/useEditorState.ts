import { useState, useCallback, useRef } from 'react';
import { EditorState } from '../types';

export const useEditorState = (initialContent: string = '') => {
  const [editorState, setEditorState] = useState<EditorState>({
    content: initialContent,
    cursorPosition: 0,
    isModified: false,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateContent = useCallback((newContent: string, preserveCursor: boolean = true) => {
    const currentPosition = textareaRef.current?.selectionStart || 0;
    
    setEditorState(prev => ({
      ...prev,
      content: newContent,
      cursorPosition: preserveCursor ? currentPosition : 0,
      isModified: newContent !== initialContent,
    }));

    // Restore cursor position after state update
    if (preserveCursor && textareaRef.current) {
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(currentPosition, currentPosition);
        }
      });
    }
  }, [initialContent]);

  const setCursorPosition = useCallback((position: number) => {
    setEditorState(prev => ({
      ...prev,
      cursorPosition: position,
    }));

    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(position, position);
    }
  }, []);

  return {
    editorState,
    textareaRef,
    updateContent,
    setCursorPosition,
  };
};