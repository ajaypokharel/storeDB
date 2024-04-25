import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../redux/authenticationSlice';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess]= useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Handle login logic here
    axios.post('http://127.0.0.1:5000/login', {username, password}, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(response => {
      // Handle success
      console.log('Successs', response)
      setSuccess(true)
      dispatch(login({userId: response.data.user_id}))
    })
    .catch(error => {
      console.error('Error Logging In:', error);
    });
  
  };

  useEffect(() => {
    if (success){
      navigate('/upload')
    }
  }, [success])

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-200 rounded-lg p-8">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Login</h1>
     
        </div>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link></p>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
