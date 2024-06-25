import './App.css';
import React, {useEffect} from 'react';
import Pokedex from 'pokedex-promise-v2';


const P = new Pokedex();
const limit = 1025;


function App() {

  useEffect(() => {
    const fetchPokedex = async () => {
      const list = await P.getPokemonsList();
      console.log(list);
    }
  })

  return (
    <div className="App">
      <p></p>        
    </div>
  );
}

export default App;
