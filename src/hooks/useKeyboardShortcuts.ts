import { useEffect, useCallback } from 'react';
import { KeyboardShortcut } from '../types';

interface UseKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
  onShortcut: (action: string) => void;
  enabled?: boolean;
}

export const useKeyboardShortcuts = ({ 
  shortcuts, 
  onShortcut, 
  enabled = true 
}: UseKeyboardShortcutsProps) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    const matchedShortcut = shortcuts.find(shortcut => {
      return (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        !!event.ctrlKey === !!shortcut.ctrlKey &&
        !!event.shiftKey === !!shortcut.shiftKey &&
        !!event.altKey === !!shortcut.altKey
      );
    });

    if (matchedShortcut) {
      event.preventDefault();
      onShortcut(matchedShortcut.action);
    }
  }, [shortcuts, onShortcut, enabled]);

  useEffect(() => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, enabled]);
};