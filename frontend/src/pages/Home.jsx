import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const userId = useSelector(state => state.authentication.userId);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileInfo(file ? { name: file.name, size: file.size } : null);
  };

  const handleUpload = () => {
    // Handle file upload logic here
    if (!selectedFile) {
      console.error('No file selected for upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('user_id', userId)

    axios.post('http://127.0.0.1:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      // Handle success
      alert("File Uploaded")
      setSelectedFile(null)
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    setFileInfo(file ? { name: file.name, size: file.size } : null);
  };


  useEffect(() => {
    
  }, [selectedFile])

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-gray-200 rounded-lg p-8">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-semibold">Upload Files</h1>
            <p className="text-gray-600">Select a file to upload</p>
          </div>
          <div
            className="border-dashed border-4 border-gray-400 rounded-lg p-8 mb-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input type="file" id="fileInput" onChange={handleFileChange} className="hidden" />
            <label htmlFor="fileInput" className="cursor-pointer" draggable="true">
              <svg
                className="mx-auto w-12 h-12 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
              <p className="mt-2 text-sm text-gray-600">Drag and drop files here or click to browse</p>
            </label>
          </div>
          {fileInfo && (
            <div className="text-gray-600">
              <p>Selected file: {fileInfo.name}</p>
              <p>File size: {fileInfo.size} bytes</p>
            </div>
          )}
          <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadPage;
