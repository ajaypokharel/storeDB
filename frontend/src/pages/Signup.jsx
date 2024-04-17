import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
// import Register from './Register';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with email:", email, "and password:", password);
  };

  const handleRegister = () => {
    // Handle registration redirection logic here
    console.log("Redirecting to registration page");
  };

  return (
    <>

    <Navbar />
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-200 rounded-lg p-8">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Login</h1>
     
        </div>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold">Password:</label>
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
