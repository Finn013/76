import React from 'react';
import { FileItem } from '../../types';
import { FileTreeItem } from './FileTreeItem';

interface FileTreeProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onFileDelete: (id: string) => void;
  onFileRename: (id: string, newName: string) => void;
  onToggleFolder: (folderId: string) => void;
  expandedFolders: Set<string>;
  selectedFileId?: string;
  level?: number;
}

export const FileTree: React.FC<FileTreeProps> = ({
  files,
  onFileSelect,
  onFileDelete,
  onFileRename,
  onToggleFolder,
  expandedFolders,
  selectedFileId,
  level = 0,
}) => {
  return (
    <div>
      {files.map(file => (
        <FileTreeItem
          key={file.id}
          file={file}
          onSelect={onFileSelect}
          onDelete={onFileDelete}
          onRename={onFileRename}
          onToggleFolder={onToggleFolder}
          isExpanded={expandedFolders.has(file.id)}
          isSelected={selectedFileId === file.id}
          level={level}
        >
          {file.children && file.children.length > 0 && expandedFolders.has(file.id) && (
            <FileTree
              files={file.children}
              onFileSelect={onFileSelect}
              onFileDelete={onFileDelete}
              onFileRename={onFileRename}
              onToggleFolder={onToggleFolder}
              expandedFolders={expandedFolders}
              selectedFileId={selectedFileId}
              level={level + 1}
            />
          )}
        </FileTreeItem>
      ))}
    </div>
  );
};