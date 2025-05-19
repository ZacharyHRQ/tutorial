'use client';

import { useState } from 'react';

interface FileHandle {
  getFile(): Promise<File>;
  createWritable(): Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: string): Promise<void>;
  close(): Promise<void>;
}

declare global {
  interface Window {
    showOpenFilePicker(options?: {
      multiple?: boolean;
      types?: Array<{
        description: string;
        accept: Record<string, string[]>;
      }>;
    }): Promise<FileHandle[]>;
    showSaveFilePicker(options?: {
      types?: Array<{
        description: string;
        accept: Record<string, string[]>;
      }>;
    }): Promise<FileHandle>;
  }
}

export default function FileSystemAccessPage() {
  const [fileContent, setFileContent] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [fileHandle, setFileHandle] = useState<FileHandle | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openFile = async () => {
    try {
      setIsLoading(true);
      setStatusMessage('Opening file...');

      // Request file handle
      const [handle] = await window.showOpenFilePicker({
        multiple: false,
        types: [
          {
            description: 'Text Files',
            accept: {
              'text/plain': ['.txt'],
              'text/markdown': ['.md'],
            },
          },
        ],
      });

      // Get the file
      const file = await handle.getFile();
      const text = await file.text();

      setFileHandle(handle);
      setFileContent(text);
      setStatusMessage(`File opened: ${file.name}`);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setStatusMessage('File selection cancelled');
      } else {
        setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Failed to open file'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveFile = async () => {
    if (!fileHandle) return;

    try {
      setIsLoading(true);
      setStatusMessage('Saving file...');

      const writable = await fileHandle.createWritable();
      await writable.write(fileContent);
      await writable.close();

      setStatusMessage('File saved successfully');
    } catch (error) {
      setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Failed to save file'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAsNewFile = async () => {
    try {
      setIsLoading(true);
      setStatusMessage('Saving as new file...');

      const handle = await window.showSaveFilePicker({
        types: [
          {
            description: 'Text Files',
            accept: {
              'text/plain': ['.txt'],
              'text/markdown': ['.md'],
            },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(fileContent);
      await writable.close();

      setFileHandle(handle);
      setStatusMessage('File saved successfully');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setStatusMessage('Save cancelled');
      } else {
        setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Failed to save file'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">File System Access API Demo</h2>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-900 mb-2">Important Notes</h3>
        <ul className="list-disc list-inside text-yellow-700 space-y-2">
          <li>This API requires user permission</li>
          <li>Works only over HTTPS (localhost is an exception)</li>
          <li>Check browser compatibility (Chrome, Edge)</li>
          <li>File handles persist only for the current session</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Operations */}
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <h3 className="text-lg font-medium">File Operations</h3>
          
          <div className="space-y-2">
            <button
              onClick={openFile}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Open File
            </button>

            <button
              onClick={saveFile}
              disabled={isLoading || !fileHandle}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Save File
            </button>

            <button
              onClick={saveAsNewFile}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Save As New File
            </button>
          </div>

          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-medium">Status:</p>
            <p className="text-sm text-gray-600">{statusMessage}</p>
          </div>
        </div>

        {/* File Content */}
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <h3 className="text-lg font-medium">File Content</h3>
          
          <textarea
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            className="w-full h-64 p-2 border rounded font-mono text-sm"
            placeholder="File content will appear here..."
          />
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          About File System Access API
        </h3>
        <ul className="list-disc list-inside text-blue-700 space-y-2">
          <li>Allows web apps to read and write files</li>
          <li>Provides access to the file system with user permission</li>
          <li>Supports both reading and writing files</li>
          <li>Can save back to the original file</li>
        </ul>
      </div>
    </div>
  );
}
