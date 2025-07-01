import React, { useState, useCallback } from 'react';
import { Editor } from './components/Editor/Editor';
import { FileExplorer } from './components/FileExplorer/FileExplorer';
import { FileItem } from './types';
import { 
  createFile, 
  createFolder, 
  findFileById, 
  updateFileInTree, 
  removeFileFromTree, 
  addFileToTree 
} from './utils/fileUtils';

const initialFiles: FileItem[] = [
  createFile('welcome.txt', 'Welcome to the Code Editor!\n\nThis is a sample file to get you started.'),
  createFile('example.js', 'console.log("Hello, World!");'),
];

function App() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(initialFiles[0]);

  const handleFileSelect = useCallback((file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  }, []);

  const handleFileCreate = useCallback((name: string, type: 'file' | 'folder', parentId?: string) => {
    const newFile = type === 'file' ? createFile(name) : createFolder(name);
    setFiles(prev => addFileToTree(prev, newFile, parentId));
    
    if (type === 'file') {
      setSelectedFile(newFile);
    }
  }, []);

  const handleFileDelete = useCallback((id: string) => {
    setFiles(prev => removeFileFromTree(prev, id));
    
    if (selectedFile?.id === id) {
      setSelectedFile(null);
    }
  }, [selectedFile]);

  const handleFileRename = useCallback((id: string, newName: string) => {
    setFiles(prev => updateFileInTree(prev, id, { name: newName }));
    
    if (selectedFile?.id === id) {
      setSelectedFile(prev => prev ? { ...prev, name: newName } : null);
    }
  }, [selectedFile]);

  const handleContentChange = useCallback((content: string) => {
    if (selectedFile) {
      const updatedFile = { ...selectedFile, content };
      setSelectedFile(updatedFile);
      setFiles(prev => updateFileInTree(prev, selectedFile.id, { content }));
    }
  }, [selectedFile]);

  const handleSave = useCallback((content: string) => {
    if (selectedFile) {
      setFiles(prev => updateFileInTree(prev, selectedFile.id, { content }));
      console.log(`Saved ${selectedFile.name}`);
    }
  }, [selectedFile]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <FileExplorer
          files={files}
          onFileSelect={handleFileSelect}
          onFileCreate={handleFileCreate}
          onFileDelete={handleFileDelete}
          onFileRename={handleFileRename}
          selectedFileId={selectedFile?.id}
        />
      </div>
      
      <div className="flex-1 p-4">
        {selectedFile ? (
          <Editor
            key={selectedFile.id}
            initialContent={selectedFile.content}
            onSave={handleSave}
            onContentChange={handleContentChange}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">No file selected</h2>
              <p>Select a file from the explorer to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;