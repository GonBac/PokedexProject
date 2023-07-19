import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pokemon.css";

const Pokemon = ({ ordenTipo, buscarPoke, pokemonData, colors }) => {
  const [pokeDataOrdenada, setpokeDataOrdenada] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let dataOrdenada = [...pokemonData];
    if (ordenTipo === "number") {
      dataOrdenada.sort((a, b) => a.id - b.id);
    } else if (ordenTipo === "name") {
      dataOrdenada.sort((a, b) => a.name.localeCompare(b.name));
    }
    setpokeDataOrdenada(dataOrdenada);
  }, [pokemonData, ordenTipo]);

  const pokeDataFiltrada = pokeDataOrdenada.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(buscarPoke.toLowerCase())
  );

  return (
    <div className="pokedex">
      {pokeDataFiltrada.map((pokemon) => {
        const color = colors[pokemon.types[0].type.name];

        return (
          <div
            key={pokemon.id}
            className="pokecard"
            style={{ border: `1px solid ${color}` }}
            onClick={() => {
              navigate(`/${pokemon.id}`);
            }}
          >
            <div className="pokenum" style={{ color: color }}>
              #{pokemon.id.toString().padStart(3, "0")}
            </div>
            <div className="pokenom">
              <img
                className="pokeimg"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <div
                className="nombre"
                style={{
                  backgroundColor: color,
                }}
              >
                <span>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pokemon;
