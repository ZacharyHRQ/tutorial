# File System Access API

The File System Access API allows web applications to interact with the user's local file system in a secure way. This API provides a more powerful and user-friendly way to read and write files compared to the traditional `<input type="file">` element.

## Important Notes

- **Security**: The API requires explicit user permission for each file or directory access
- **HTTPS Required**: Works only over HTTPS (localhost is an exception for development)
- **Browser Support**: Currently supported in Chrome, Edge, and other Chromium-based browsers
- **Session Persistence**: File handles persist only for the current session
- **User Control**: Users can revoke permissions at any time through browser settings

## Core Concepts

### File Handles

File handles are objects that represent files in the file system. They provide methods to:
- Read file contents
- Write to files
- Get file metadata
- Create writable streams

### File System Access Methods

1. **Opening Files**
   ```typescript
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
   ```

2. **Reading Files**
   ```typescript
   const file = await handle.getFile();
   const text = await file.text();
   ```

3. **Saving Files**
   ```typescript
   const writable = await handle.createWritable();
   await writable.write(content);
   await writable.close();
   ```

4. **Saving As New File**
   ```typescript
   const handle = await window.showSaveFilePicker({
     types: [
       {
         description: 'Text Files',
         accept: {
           'text/plain': ['.txt'],
         },
       },
     ],
   });
   ```

## Best Practices

1. **Error Handling**
   - Always handle user cancellation (AbortError)
   - Provide clear error messages
   - Implement fallback mechanisms for unsupported browsers

2. **User Experience**
   - Show loading states during file operations
   - Provide clear feedback on operation status
   - Allow users to cancel operations

3. **Security**
   - Request minimum required permissions
   - Handle permission changes gracefully
   - Validate file types and content

## Browser Compatibility

- Chrome 86+
- Edge 86+
- Opera 72+
- Other Chromium-based browsers

## Resources

- [MDN Web Docs: File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)
- [File System Access API Specification](https://wicg.github.io/file-system-access/)
- [Can I Use: File System Access API](https://caniuse.com/?search=File%20System%20Access%20API) 