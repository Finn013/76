import React, { useState, useCallback } from 'react';
import { File, Folder, FolderOpen, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { FileItem } from '../../types';

interface FileTreeItemProps {
  file: FileItem;
  onSelect: (file: FileItem) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onToggleFolder: (folderId: string) => void;
  isExpanded: boolean;
  isSelected: boolean;
  level: number;
  children?: React.ReactNode;
}

export const FileTreeItem: React.FC<FileTreeItemProps> = ({
  file,
  onSelect,
  onDelete,
  onRename,
  onToggleFolder,
  isExpanded,
  isSelected,
  level,
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(file.name);
  const [showActions, setShowActions] = useState(false);

  const handleClick = useCallback(() => {
    if (file.type === 'folder') {
      onToggleFolder(file.id);
    } else {
      onSelect(file);
    }
  }, [file, onSelect, onToggleFolder]);

  const handleRename = useCallback(() => {
    if (editName.trim() && editName !== file.name) {
      onRename(file.id, editName.trim());
    }
    setIsEditing(false);
  }, [editName, file.id, file.name, onRename]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setEditName(file.name);
      setIsEditing(false);
    }
  }, [handleRename, file.name]);

  const Icon = file.type === 'folder' 
    ? (isExpanded ? FolderOpen : Folder)
    : File;

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 ${
          isSelected ? 'bg-blue-100 text-blue-800' : 'text-gray-700'
        }`}
        style={{ paddingLeft: `${8 + level * 16}px` }}
        onClick={handleClick}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <Icon size={16} className="flex-shrink-0" />
        
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleKeyDown}
            className="flex-1 px-1 py-0 text-sm border border-blue-300 rounded"
            autoFocus
          />
        ) : (
          <span className="flex-1 truncate">{file.name}</span>
        )}

        {showActions && !isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-1 hover:bg-gray-200 rounded"
              title="Rename"
            >
              <Edit2 size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(file.id);
              }}
              className="p-1 hover:bg-gray-200 rounded text-red-600"
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>
      
      {children}
    </div>
  );
};