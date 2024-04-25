import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './user.css'; 

const UserSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector(state => state.authentication.userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  // Function to handle opening the modal and storing the selected session's result
  const handleOpenModal = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/sessions/${userId}`);
        setSessions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  return (
    <>
    <div className="user-session-container">
      <h2 className="user-session-heading">Here are your past Session Workflows</h2>
      {loading ? (
        <p>Loading...</p>
      ) : sessions.length === 0 ? (
        <p>No sessions found for this user.</p>
      ) : (
        <table className="user-session-table">
          <thead>
            <tr>
              <th>Session ID</th>
              <th>User ID</th>
              <th>Query</th>
              <th>File Used</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
          {sessions.map(session => (
            <tr key={session._id}>
              <td>{session._id}</td>
              <td>{session.user_id}</td>
              <td>{session.query}</td>
              <td>{session.file_used}</td>
              <td>
                <button onClick={() => handleOpenModal(session.result)}>View Result</button>
              </td>
            </tr>
          ))}
          </tbody>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setIsModalOpen(false)}>×</span>
                <h2>Session Result</h2>
                <pre>{JSON.stringify(selectedResult, null, 2)}</pre>
              </div>
            </div>
          )}
        </table>
        
      )}
    </div>
    </>

  );
};

export default UserSession;
