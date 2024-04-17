import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with:", { firstName, lastName, email, phoneNumber });
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-200 rounded-lg p-8">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-semibold">Register</h1>
          <p className="text-gray-600">Please fill out the form below to register</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-semibold">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-semibold">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
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
