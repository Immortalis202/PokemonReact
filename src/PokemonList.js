import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Pokedex from "pokedex-promise-v2";
import "./App.css"

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

const P = new Pokedex();

const PokemonVersionSprite = () => {
	const [pokemonData, setPokemonData] = useState(null);
	const [selectedVersion, setSelectedVersion] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [allPokemon, setAllPokemon] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [selected, setSelected] = useState(null);
	const [guessHistory, setGuessHistory] = useState([]);

	const getFrontSprite = (versionSprites) => {
		return (
			versionSprites.front_default_transparent ||
			versionSprites.front_default ||
			versionSprites.front_default_female
		);
	};

	const handleNewGuess = () => {
		if (selected) {
			setGuessHistory((prevHistory) => [...prevHistory, selected]);
			setSelected(null);
			setInputValue("");
		}
	};

	const getAvailableVersions = (versions) => {
		return Object.keys(versions).flatMap((genKey) =>
			Object.keys(versions[genKey])
				.filter((versionKey) =>
					getFrontSprite(versions[genKey][versionKey])
				)
				.map((versionKey) => `${genKey}.${versionKey}`)
		);
	};
	const fetchPokemonList = () => {
		fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
			.then((response) => response.json())
			.then((data) => {
				setAllPokemon(
					data.results.map((pokemon) => ({
						name: pokemon.name,
						url: pokemon.url,
					}))
				);
			})
			.catch((error) =>
				console.error("Error fetching Pokemon list:", error)
			);
	};

	const fetchRandomPokemon = () => {
		const randomId = Math.floor(Math.random() * 898) + 1;
		setIsLoading(true);
		fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				const availableVersions = getAvailableVersions(
					data.sprites.versions
				);
				if (availableVersions.length > 0) {
					setPokemonData(data);
					setSelectedVersion(
						availableVersions[availableVersions.length - 1]
					); // Select the latest version
					setIsLoading(false);
				} else {
					// If no sprites, fetch another random Pokémon
					fetchRandomPokemon();
				}
			})
			.catch((error) => {
				setError(error.message);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchPokemonList();
		fetchRandomPokemon();
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!pokemonData) return null;

	const { sprites, name } = pokemonData;
	const versions = sprites.versions;
	const allVersions = getAvailableVersions(versions);

	const handleVersionChange = (event) => {
		setSelectedVersion(event.target.value);
	};

	const renderSelectedVersionSprite = () => {
		if (!selectedVersion) return null;

		const [genKey, versionKey] = selectedVersion.split(".");
		const versionSprites = versions[genKey][versionKey];
		const spriteUrl = getFrontSprite(versionSprites);

		if (spriteUrl) {
			return (
				<div>
					<div className="cont"></div>
					<img
						src={spriteUrl}
						alt={`${name} front sprite`}
						className="image"
					/>
				</div>
			);
		}
		return <p>No front sprite available for this version.</p>;
	};

	const PokemonTable = ({ value }) => {
		const [pokemonData, setPokemonData] = useState(null);
		const [guessedPokemon, setGuessedPokemon] = useState(null);

		useEffect(() => {
			const fetchData = async () => {
				const inp = await P.getPokemonByName(value);
				const toCheck = await P.getPokemonByName(name);

				const type1Check =
					inp.types[0].type.name === toCheck.types[0].type.name;
				const type2Check =
					inp.types[1]?.type.name === toCheck.types[1]?.type.name;
				const index =
					inp.id === toCheck.id ? 0 : inp.id > toCheck.id ? 1 : 2;
				const weight =
					inp.weight === toCheck.weight
						? 0
						: inp.weight > toCheck.weight
						? 1
						: 2;
				const height =
					inp.height === toCheck.height
						? 0
						: inp.height > toCheck.height
						? 1
						: 2;

				setPokemonData({
					sprite: inp.sprites.front_default,
					type1Check,
					type2Check,
					index,
					weight,
					height,
				});
				setGuessedPokemon({
					sprite: inp.sprites.front_default,
					name: inp.name,
					type1: inp.types[0]?.type?.name || "NULL",
					type2: inp.types[1]?.type?.name || "NULL",
					id: inp.id,
					weight: inp.weight,
					height: inp.height,
				});
			};

			fetchData();
		}, [value]);
		if (!pokemonData) {
			return <div>Loading...</div>;
		}

		return (
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Sprite</TableCell>
							<TableCell>Type 1 Check</TableCell>
							<TableCell>Type 2 Check</TableCell>
							<TableCell>Index</TableCell>
							<TableCell>Weight</TableCell>
							<TableCell>Height</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>
								<img src={pokemonData.sprite} alt="sprite" />
							</TableCell>
							<TableCell
								sx={{
									backgroundColor: pokemonData.type1Check
										? "green"
										: "red",
								}}
							>
								{guessedPokemon.type1}
							</TableCell>
							<TableCell
								sx={{
									backgroundColor: pokemonData.type2Check
										? "green"
										: "red",
								}}
							>
								{guessedPokemon.type2}
							</TableCell>
							<TableCell
								sx={{
									backgroundColor:
										pokemonData.index === 0
											? "green"
											: pokemonData.index === 1
											? "yellow"
											: "orange",
								}}
							>
								{guessedPokemon.id}
							</TableCell>
							<TableCell
								sx={{
									backgroundColor:
										pokemonData.weight === 0
											? "green"
											: pokemonData.weight === 1
											? "yellow"
											: "orange",
								}}
							>
								{guessedPokemon.weight}
							</TableCell>
							<TableCell
								sx={{
									backgroundColor:
										pokemonData.height === 0
											? "green"
											: pokemonData.height === 1
											? "yellow"
											: "orange",
								}}
							>
								{guessedPokemon.height}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		);
	};

	return (
		<div>
			<div className="lato">
				<span style={{backgroundColor:"yellow"}}>Yellow = Lower</span> <br />
				<span style={{backgroundColor:"orange"}}>Orange = Higher</span> <br />
				<span style={{backgroundColor:"green"}}>Green = Correct</span> <br />
				<span style={{backgroundColor:"red"}}>Red = Wrong</span> <br />
			</div>
			{renderSelectedVersionSprite()}
			<Autocomplete
				onChange={(event, value) =>
					setSelected(value ? value.name : null)
				}
				options={allPokemon}
				getOptionLabel={(option) => option.name}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Select a Pokemon"
						color="secondary"
					/>
				)}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				style={{
					marginBottom: 20,
					marginLeft: "auto",
					marginRight: "auto",
					width: "50rem",
				}}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={handleNewGuess}
				disabled={!selected}
			>
				Add Guess
			</Button>
			<div>
				{guessHistory.map((pokemonName, index) => (
					<PokemonTable key={index} value={pokemonName} />
				))}
			</div>
		</div>
	);
};

export default PokemonVersionSprite;
