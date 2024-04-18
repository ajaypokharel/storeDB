import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Session = () => {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [result, setResult] = useState([]);

  const dummyData = [{
    "Wrong": "Please",
    "Query": "Choose",
    "Check": "Correct",
    "Again": "File"
  }]

  useEffect(() => {
    // Fetch files uploaded by the user
    axios.get('http://127.0.0.1:5000/uploaded/2') 
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleQuerySubmit = () => {
    // Perform the query with the selected file
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    axios.post('http://127.0.0.1:5000/query', { query, file_id: selectedFile }) 
      .then(response => {
        if (Array.isArray(response.data)) {
            // If response is an array of objects
            setResult(response.data);
          } else {
            // If response is an error object
            setResult(dummyData);
            console.error('Error querying:', response.data.error);
          }
        })
        .catch(error => {
          console.error('Error querying:', error);
        });
  };

  return (
    <div>
      <Navbar /> 
      <div className="container mx-auto mt-4 p-4">
        <h2 className="text-2xl font-bold mb-4">Session</h2>
        <div className="mb-4">
          <label htmlFor="queryInput" className="block">Query:</label>
          <input type="text" id="queryInput" value={query} onChange={handleQueryChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="fileSelect" className="block">Select File:</label>
          <select id="fileSelect" value={selectedFile} onChange={handleFileChange} className="border border-gray-300 rounded px-3 py-2 w-full">
            <option value="">Select a file</option>
            {files.map(file => (
              <option key={file.id} value={file.id}>{file.filename}</option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={handleQuerySubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Submit Query
          </button>
        </div>
        <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Result:</h3>
        <table className="border border-collapse border-gray-300">
            <thead>
            <tr>
                {result.length > 0 && Object.keys(result[0]).map((key, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {result.map((item, index) => (
                <tr key={index}>
                {Object.values(item).map((value, index) => (
                    <td key={index} className="border border-gray-300 px-4 py-2">{value}</td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>

      </div>
    </div>
  );
};

export default Session;
