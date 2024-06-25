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

export default App;


