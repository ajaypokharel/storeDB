import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import React from 'react';
import Register from './pages/Register';




export default function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes> 
                  <Route path="/" element={<Home />} /> {/* Default route */}
                  <Route path="/signup" element={<Signup />} /> 
                  <Route path="/register" element={<Register />} /> 
              </Routes>
          </BrowserRouter>
      </div>
  );
}

