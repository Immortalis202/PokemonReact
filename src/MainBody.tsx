import * as React from "react";
import logoPokemon from './Assets/logoPokemon.svg';
import './mainBody.css';
import GameCard from './GameCard.tsx'
import MediaControlCard from "./CurrentMusic.tsx"; // Adjust the import path as necessary

function MainBody() {
    return (
      <div className="container"> 
        <main>
          <img src={logoPokemon} alt="Logo Pokemon" className="logo"/>
          <p>
            Welcome to PokeGames!
          </p>
        </main>
        <GameCard/>
        <MediaControlCard/>
      </div>
    );
};

export default MainBody;
