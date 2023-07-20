import React, { useState, useEffect } from "react";
import Pokemon from "./Components/Pokemon/Pokemon";
import ImagenCarga from "/src/assets/img/Loading.gif";
import PokeballLogo from "/src/assets/img/pokeball-logo.svg";
import flechamenos from "/src/assets/img/pokemon_minus.png";
import flechamas from "/src/assets/img/pokemon_plus.png";

import "./index.css";
import "./App.css";

const App = () => {
  const [ordenTipo, setOrdenTipo] = useState("number");
  const [botonTexto, setBotonTexto] = useState("#");
  const [buscarPoke, setbuscarPoke] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=21`
      );
      const data = await response.json();
      const pokemonList = data.results;
      const pokemonDataList = pokemonList.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return data;
      });
      Promise.all(pokemonDataList).then((data) => setPokemonData(data));
    };

    fetchData();
  }, [offset]);

  const colors = {
    rock: "#b69e31",
    ghost: "#70559b",
    steel: "#b7b9d0",
    water: "#6493eb",
    grass: "#74cb48",
    psychic: "#fb5584",
    ice: "#9ad6df",
    dark: "#75574c",
    fairy: "#e69eac",
    normal: "#aaa67f",
    fighting: "#c12239",
    flying: "#a891ec",
    poison: "#a43e9e",
    ground: "#dec16b",
    bug: "#a7b723",
    fire: "#f57d31",
    electric: "#f9cf30",
    dragon: "#7037ff",
  };

  const cargarMasPokemon = () => {
    setOffset((prevOffset) => prevOffset + 21);
  };

  const cargarPokemonAnteriores = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - 21));
  };

  const orden = () => {
    setOrdenTipo((prevSortType) =>
      prevSortType === "number" ? "name" : "number"
    );
    setBotonTexto((prevButtonText) => (prevButtonText === "#" ? "AZ" : "#"));
  };

  const buscar = (event) => {
    setbuscarPoke(event.target.value);
  };

  let flecha = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="16"
      fill="none"
      viewBox="0 0 10 16"
    >
      <path
        fill="#212121"
        d="m9.017 11.108-.252-.252a.429.429 0 0 0-.606 0l-2.98 2.997V.43A.429.429 0 0 0 4.75 0h-.357a.429.429 0 0 0-.429.429v13.424l-2.98-2.997a.429.429 0 0 0-.606 0l-.252.252a.429.429 0 0 0 0 .606l4.142 4.16a.429.429 0 0 0 .607 0l4.142-4.16a.429.429 0 0 0 0-.606Z"
      />
    </svg>
  );

  if (pokemonData.length === 0) {
    return (
      <img className="imgcarga" src={ImagenCarga} alt="pokeball cargando" />
    );
  }

  return (
    <body className="body">
      <header className="headergral">
        <section className="head">
          <div className="logo">
            <img className="pokelogo" src={PokeballLogo} alt="Pokeball logo" />
            <h1>Pokédex</h1>
          </div>
          <div
            className="botones"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={flechamenos}
              className="botonmenos"
              onClick={cargarPokemonAnteriores}
              style={{
                display: offset === 0 ? "none" : "block",
              }}
            />
            <img
              className="botonmas"
              src={flechamas}
              onClick={cargarMasPokemon}
            />
          </div>
          <button className="filtro" onClick={orden}>
            <span className="textover">{botonTexto}</span> {flecha}
          </button>
        </section>

        <input
          className="buscar"
          type="text"
          placeholder="Buscar"
          style={{ textAlign: "center", borderRadius: "5px" }}
          value={buscarPoke}
          onChange={buscar}
        />
      </header>
      <main>
        <Pokemon
          ordenTipo={ordenTipo}
          buscarPoke={buscarPoke}
          pokemonData={pokemonData}
          colors={colors}
        />
      </main>
    </body>
  );
};

export default App;
