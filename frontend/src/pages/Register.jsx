import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess]= useState(false)
  const navigate = useNavigate();

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    if (success){
      navigate('/')
    }
  }, [success])

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const full_name = fullName
    axios.post('http://127.0.0.1:5000/signup', {full_name, email, password, username})
    .then(response => {
      // Handle success
      console.log('Successs', response.data)
      setSuccess(true)

    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log("Form submitted with:", { fullName, email, password, username });
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-200 rounded-lg p-8">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Register</h1>
          <p className="text-gray-600">Please fill out the form below to register</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-semibold">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={handleFullNameChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
            Register
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default RegisterPage;
