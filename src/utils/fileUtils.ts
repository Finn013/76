import { FileItem } from '../types';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const createFile = (name: string, content: string = '', parentId?: string): FileItem => {
  return {
    id: generateId(),
    name,
    content,
    type: 'file',
    parentId,
  };
};

export const createFolder = (name: string, parentId?: string): FileItem => {
  return {
    id: generateId(),
    name,
    content: '',
    type: 'folder',
    parentId,
    children: [],
  };
};

export const findFileById = (files: FileItem[], id: string): FileItem | null => {
  for (const file of files) {
    if (file.id === id) {
      return file;
    }
    if (file.children) {
      const found = findFileById(file.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const updateFileInTree = (
  files: FileItem[],
  id: string,
  updates: Partial<FileItem>
): FileItem[] => {
  return files.map(file => {
    if (file.id === id) {
      return { ...file, ...updates };
    }
    if (file.children) {
      return {
        ...file,
        children: updateFileInTree(file.children, id, updates),
      };
    }
    return file;
  });
};

export const removeFileFromTree = (files: FileItem[], id: string): FileItem[] => {
  return files.filter(file => {
    if (file.id === id) {
      return false;
    }
    if (file.children) {
      file.children = removeFileFromTree(file.children, id);
    }
    return true;
  });
};

export const addFileToTree = (
  files: FileItem[],
  newFile: FileItem,
  parentId?: string
): FileItem[] => {
  if (!parentId) {
    return [...files, newFile];
  }

  return files.map(file => {
    if (file.id === parentId && file.type === 'folder') {
      return {
        ...file,
        children: [...(file.children || []), newFile],
      };
    }
    if (file.children) {
      return {
        ...file,
        children: addFileToTree(file.children, newFile, parentId),
      };
    }
    return file;
  });
};