import React from 'react';
import { Save, Undo, Redo, Search, Settings } from 'lucide-react';

interface EditorToolbarProps {
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSearch: () => void;
  onSettings: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isModified: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  onUndo,
  onRedo,
  onSearch,
  onSettings,
  canUndo,
  canRedo,
  isModified,
}) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50">
      <button
        onClick={onSave}
        disabled={!isModified}
        className={`flex items-center gap-1 px-3 py-1 rounded text-sm transition-colors ${
          isModified
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        title="Save (Ctrl+S)"
      >
        <Save size={16} />
        Save
      </button>

      <div className="w-px h-6 bg-gray-300" />

      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`p-1 rounded transition-colors ${
          canUndo
            ? 'text-gray-700 hover:bg-gray-200'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title="Undo (Ctrl+Z)"
      >
        <Undo size={16} />
      </button>

      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`p-1 rounded transition-colors ${
          canRedo
            ? 'text-gray-700 hover:bg-gray-200'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title="Redo (Ctrl+Y)"
      >
        <Redo size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300" />

      <button
        onClick={onSearch}
        className="p-1 rounded text-gray-700 hover:bg-gray-200 transition-colors"
        title="Search (Ctrl+F)"
      >
        <Search size={16} />
      </button>

      <button
        onClick={onSettings}
        className="p-1 rounded text-gray-700 hover:bg-gray-200 transition-colors"
        title="Settings"
      >
        <Settings size={16} />
      </button>
    </div>
  );
};