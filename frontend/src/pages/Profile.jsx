import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../redux/authenticationSlice';
import axios from 'axios';
import ProfileEditForm from './ProfileEditForm'; // Import ProfileEditForm
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const userId = useSelector(state => state.authentication.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user data from the backend when component mounts
    axios.get(`http://127.0.0.1:5000/profile/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Fetch uploaded files when component mounts
    axios.get(`http://127.0.0.1:5000/uploaded/${userId}`)
      .then(response => {
        setUploadedFiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching Uploaded Files: ', error);
      });
  }, [userId]);

  const handleDeleteFile = (fileId) => {
    axios.delete(`http://127.0.0.1:5000/users/${userId}/uploaded/${fileId}`)
      .then(response => {
        setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
      })
      .catch(error => {
        console.error('Error deleting file:', error);
      });
  };

  const handleDeleteProfile = () => {
    axios.delete(`http://127.0.0.1:5000/profile/${userId}`)
      .then(response => {
        dispatch(resetState());
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting profile:', error);
      });
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEditProfile = (updatedUserData) => {
    axios.put(`http://127.0.0.1:5000/profile/${userId}`, {
      username: updatedUserData.username, 
      password: updatedUserData.password,
      fullName: updatedUserData.fullName
    }, {
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
      navigate('/profile')
    })
    .catch(error => {
        console.error('Error updating profile:', error);
    });
    console.log('Updated user data:', updatedUserData);
  };

  return (
    <div className="profile-container">
      {user && (
        <div className="profile-header">
          <h2>{user.username}'s Profile</h2>
          <p>Email: {user.email}</p>
          <div className="profile-buttons">
            <button className="edit-profile-button" onClick={handleToggleEditMode}>Edit Profile</button>
            <button className="delete-profile-button" onClick={handleDeleteProfile}>Delete Profile</button>
          </div>
        </div>
      )}

      {editMode ? ( // Render ProfileEditForm when edit mode is true
        <ProfileEditForm user={user} onSubmit={handleEditProfile} />
      ) : (
        <div className="uploaded-files">
          <h3>Uploaded Files</h3>
          <ul>
            {uploadedFiles.map(file => (
              <li key={file.id}>
                <p>{file.filename}</p>
                <button className="delete-file-button" onClick={() => handleDeleteFile(file.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
