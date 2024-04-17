import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [query, setQuery] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Handle file upload logic here
    console.log("Uploading file:", selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleAsk = () => {
    // Handle query logic here
    console.log("Query:", query);
    // You can perform any actions here based on the query
  };

  return (
    <>
      <Navbar />
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
            <input type="file" onChange={handleFileChange} className="hidden" />
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
          <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Upload
          </button>
        </div>
        <div className="bg-gray-200 rounded-lg p-8 mt-4 w-full max-w-lg">
  <div className="flex items-center">
    <input
      type="text"
      value={query}
      onChange={handleQueryChange}
      placeholder="Type your query here"
      className="border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500 w-full"
    />
    <button onClick={handleAsk} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded ml-2">
      Ask
    </button>
  </div>
</div>
      </div>
    </>
  );
}

export default UploadPage;
