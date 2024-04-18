import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import React from 'react';
import Register from './pages/Register';
import Session from './pages/Session';




export default function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes> 
                  <Route path="/" element={<Home />} /> {/* Default route */}
                  <Route path="/login" element={<LoginPage />} /> 
                  <Route path="/register" element={<Register />} /> 
                  <Route path="/session" element={<Session />} /> 

              </Routes>
          </BrowserRouter>
      </div>
  );
}

