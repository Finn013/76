import React from 'react';

interface EditorStatusBarProps {
  cursorPosition: number;
  totalLines: number;
  currentLine: number;
  currentColumn: number;
  isModified: boolean;
  wordCount: number;
}

export const EditorStatusBar: React.FC<EditorStatusBarProps> = ({
  cursorPosition,
  totalLines,
  currentLine,
  currentColumn,
  isModified,
  wordCount,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-1 bg-gray-100 border-t border-gray-200 text-xs text-gray-600">
      <div className="flex items-center gap-4">
        <span>Line {currentLine}, Column {currentColumn}</span>
        <span>{totalLines} lines</span>
        <span>{wordCount} words</span>
      </div>
      
      <div className="flex items-center gap-4">
        {isModified && (
          <span className="text-orange-600 font-medium">Modified</span>
        )}
        <span>Position: {cursorPosition}</span>
      </div>
    </div>
  );
};