import React, { useState } from 'react';
import { Plus, FileText, FolderPlus } from 'lucide-react';

interface FileActionsProps {
  onCreateFile: (name: string) => void;
  onCreateFolder: (name: string) => void;
}

export const FileActions: React.FC<FileActionsProps> = ({
  onCreateFile,
  onCreateFolder,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [creatingType, setCreatingType] = useState<'file' | 'folder' | null>(null);
  const [newName, setNewName] = useState('');

  const handleCreate = () => {
    if (newName.trim()) {
      if (creatingType === 'file') {
        onCreateFile(newName.trim());
      } else if (creatingType === 'folder') {
        onCreateFolder(newName.trim());
      }
    }
    setNewName('');
    setCreatingType(null);
    setShowMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate();
    } else if (e.key === 'Escape') {
      setNewName('');
      setCreatingType(null);
      setShowMenu(false);
    }
  };

  if (creatingType) {
    return (
      <div className="p-2 border-b border-gray-200">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleCreate}
          onKeyDown={handleKeyDown}
          placeholder={`New ${creatingType} name`}
          className="w-full px-2 py-1 text-sm border border-blue-300 rounded"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className="relative p-2 border-b border-gray-200">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
      >
        <Plus size={14} />
        New
      </button>

      {showMenu && (
        <div className="absolute top-full left-2 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
          <button
            onClick={() => {
              setCreatingType('file');
              setShowMenu(false);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FileText size={14} />
            New File
          </button>
          <button
            onClick={() => {
              setCreatingType('folder');
              setShowMenu(false);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FolderPlus size={14} />
            New Folder
          </button>
        </div>
      )}
    </div>
  );
};