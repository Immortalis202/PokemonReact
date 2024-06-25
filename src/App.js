// App.js

import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the import path as necessary
import MainBody from './MainBody'; // Adjust the import path as necessary
import MediaControlCard from './CurrentMusic.tsx'; // Adjust the import path as necessary

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/main" element={<MainBody />} />
        <Route path="/music" element={<MediaControlCard />} />
      </Routes>
    </div>
  );
};

export default App;
