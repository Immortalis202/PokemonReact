<<<<<<< HEAD
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
=======
import "./App.css";
import React, { useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import PokemonList from "./PokemonList";



function App() {
	

	return (
		<div className="App">
      <PokemonList/>
		</div>
	);
}
>>>>>>> 6ccc26b433dd7cc42e7545c486bd69e706ff9a71

export default App;


