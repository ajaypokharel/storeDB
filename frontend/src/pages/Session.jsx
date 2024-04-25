import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { createSession } from '../api-helper';
import './session.css';

const Session = () => {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [result, setResult] = useState([]);
  const userId = useSelector(state => state.authentication.userId);

  const dummyData = [{
    "Wrong": "Please",
    "Query": "Choose",
    "Check": "Correct",
    "Again": "File"
  }]

  useEffect(() => {
    // Fetch files uploaded by the user
    axios.get(`http://127.0.0.1:5000/uploaded/${userId}`) 
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

    axios.post('http://127.0.0.1:5000/query', { query, file_id: selectedFile }, {
      headers: { "Content-Type": "application/json" },
    }) 
      .then(response => {
        if (Array.isArray(response.data)) {
            // If response is an array of objects
            setResult(response.data);
            // push to session
            const sessionData = {
              user_id: userId,
              query: query,
              file_used: selectedFile,
              result: response.data
            }
            createSession(sessionData)
            .then(session => {
              console.log('Session created:', session);
            })
            .catch(error => {
              console.error('Error creating session:', error);
            });
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
  <div className="session-container">
    <h2 className="session-heading">Session</h2>
    <div className="session-input">
      <label htmlFor="queryInput" className="session-label">Query:</label>
      <input type="text" id="queryInput" value={query} onChange={handleQueryChange} className="session-textbox" />
    </div>
    <div className="session-input">
      <label htmlFor="fileSelect" className="session-label">Select File:</label>
      <select id="fileSelect" value={selectedFile} onChange={handleFileChange} className="session-dropdown">
        <option value="">Select a file</option>
        {files.map(file => (
          <option key={file.id} value={file.id}>{file.filename}</option>
        ))}
      </select>
    </div>
    <div>
      <button onClick={handleQuerySubmit} className="session-button">
        Submit Query
      </button>
    </div>
    <div className="session-result">
      <h3 className="result-heading">Result:</h3>
      <table className="result-table">
        <thead>
          <tr>
            {result.length > 0 && Object.keys(result[0]).map((key, index) => (
              <th key={index} className="result-header">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, index) => (
                <td key={index} className="result-cell">{value}</td>
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
