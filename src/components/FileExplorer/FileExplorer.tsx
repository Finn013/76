import React, { useState, useCallback } from 'react';
import { FileItem } from '../../types';
import { FileTree } from './FileTree';
import { FileActions } from './FileActions';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onFileCreate: (name: string, type: 'file' | 'folder', parentId?: string) => void;
  onFileDelete: (id: string) => void;
  onFileRename: (id: string, newName: string) => void;
  selectedFileId?: string;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
  selectedFileId,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200">
      <div className="p-3 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700">Explorer</h2>
      </div>
      
      <FileActions
        onCreateFile={(name) => onFileCreate(name, 'file')}
        onCreateFolder={(name) => onFileCreate(name, 'folder')}
      />
      
      <div className="flex-1 overflow-auto">
        <FileTree
          files={files}
          onFileSelect={onFileSelect}
          onFileDelete={onFileDelete}
          onFileRename={onFileRename}
          onToggleFolder={toggleFolder}
          expandedFolders={expandedFolders}
          selectedFileId={selectedFileId}
        />
      </div>
    </div>
  );
};