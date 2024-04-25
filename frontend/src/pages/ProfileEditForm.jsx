import React, { useState } from 'react';

const ProfileEditForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    password: '',
    fullName: user.fullName
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <div>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProfileEditForm;
