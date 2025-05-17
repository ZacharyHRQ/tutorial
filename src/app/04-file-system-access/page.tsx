'use client';

import { useState } from 'react';

declare global {
  interface Window {
    showOpenFilePicker(): Promise<FileSystemFileHandle[]>;
    showSaveFilePicker(): Promise<FileSystemFileHandle>;
  }
  interface FileSystemFileHandle {
    getFile(): Promise<File>;
    createWritable(): Promise<FileSystemWritableFileStream>;
  }
  interface FileSystemWritableFileStream extends WritableStream {
    write(data: string): Promise<void>;
    close(): Promise<void>;
  }
}

export default function FileSystemAccessPage() {
  const [fileContent, setFileContent] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);

  const openFile = async () => {
    try {
      const handle = await window.showOpenFilePicker();
      const file = await handle[0].getFile();
      const text = await file.text();
      setFileHandle(handle[0]);
      setFileContent(text);
      setStatusMessage('File opened');
    } catch (error) {
      setStatusMessage(`Error: ${error}`);
    }
  };

  const saveFile = async () => {
    if (!fileHandle) return;
    try {
      const writable = await fileHandle.createWritable();
      await writable.write(fileContent);
      await writable.close();
      setStatusMessage('File saved');
    } catch (error) {
      setStatusMessage(`Error: ${error}`);
    }
  };

  const saveAsNewFile = async () => {
    try {
      const handle = await window.showSaveFilePicker();
      const writable = await handle.createWritable();
      await writable.write(fileContent);
      await writable.close();
      setStatusMessage('File saved as new');
    } catch (error) {
      setStatusMessage(`Error: ${error}`);
    }
  };

  return (
    <div>
      <h1>File System Access API Demo</h1>
      <button onClick={openFile}>Open File</button>
      <button onClick={saveFile} disabled={!fileHandle}>Save File</button>
      <button onClick={saveAsNewFile}>Save As New File</button>
      <textarea
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <p>Status: {statusMessage}</p>
    </div>
  );
}
