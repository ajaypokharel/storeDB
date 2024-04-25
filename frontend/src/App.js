import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import React, {useState} from 'react';
import Register from './pages/Register';
import Session from './pages/Session';
import UserSession from './pages/UserSession';
import Navbar from './components/Navbar';
import { store } from './redux/store';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';


export default function App() {

  return (
    <Provider store={store}>
      <div>
          <BrowserRouter>
          <Navbar />
            <Routes> 
                <Route path="/" element={<LoginPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path='/upload' element={<Home />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/session" element={<Session />} /> 
                <Route path="/userSession" element={<UserSession />} /> 
                <Route path='/profile' element={<Profile /> }/>
                <Route path='/dashboard' element={<Dashboard /> }/>

            </Routes>
          </BrowserRouter>
      </div>
    </Provider>
  );
}

