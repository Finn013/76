export interface EditorState {
  content: string;
  cursorPosition: number;
  isModified: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  content: string;
  type: 'file' | 'folder';
  parentId?: string;
  isOpen?: boolean;
  children?: FileItem[];
}

export interface EditorConfig {
  theme: 'light' | 'dark';
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  showLineNumbers: boolean;
}

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: string;
}