import React, { useState, useEffect } from "react";
import "./Detalles.css";
import { useNavigate, useParams } from "react-router-dom";

const Detalles = () => {
  const { pokeid } = useParams();
  const [pokeDet, setpokeDet] = useState("");
  const [descripcionIng, setdescripcionIng] = useState("");

  useEffect(() => {
    const fetchPokeDet = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeid}`
      );
      const data = await response.json();
      setpokeDet(data);

      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      const enDescription = speciesData.flavor_text_entries[10].flavor_text;
      setdescripcionIng(enDescription);
    };

    fetchPokeDet();
  }, [pokeid]);

  const navigate = useNavigate();
  const flechaback = (
    <svg
      onClick={() => {
        navigate("/");
      }}
      style={{ cursor: "pointer" }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#ffffff"
      viewBox="0 0 24 24"
    >
      <path
        fill="#ffffff"
        d="m12.23 20.512.774-.774a.469.469 0 0 0 0-.663l-6.06-6.06h13.337c.26 0 .469-.21.469-.468v-1.094a.469.469 0 0 0-.469-.469H6.944l6.06-6.06a.469.469 0 0 0 0-.662l-.774-.774a.469.469 0 0 0-.662 0l-8.18 8.18a.469.469 0 0 0 0 .664l8.18 8.18c.183.183.48.183.662 0Z"
      />
    </svg>
  );

  if (!pokeDet) {
    return (
      <img
        className="imgcargadet"
        src="./src/assets/img/Loading.gif"
        alt="pokeball cargando"
      />
    );
  }

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

  const pokeTipo = pokeDet.types[0].type.name;
  const color = colors[pokeTipo] || "#ffffff";

  const navegarder = () => {
    const der = parseInt(pokeid) + 1;
    navigate(`/${der}`);
  };
  const navegariz = () => {
    const iz = parseInt(pokeid) - 1;
    if (parseInt(pokeid) === 1) {
      navigate(`/1`);
    } else {
      navigate(`/${iz}`);
    }
  };

  const flechaiz = (
    <svg
      style={{ opacity: parseInt(pokeid) === 1 ? "0%" : "100%" }}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      onClick={navegariz}
    >
      <path
        d="M26.9501 34.9L17.0501 25C16.8834 24.8333 16.7668 24.6667 16.7001 24.5C16.6334 24.3333 16.6001 24.15 16.6001 23.95C16.6001 23.75 16.6334 23.5667 16.7001 23.4C16.7668 23.2333 16.8834 23.0667 17.0501 22.9L27.0001 12.95C27.3001 12.65 27.6584 12.5 28.0751 12.5C28.4918 12.5 28.8501 12.65 29.1501 12.95C29.4501 13.25 29.5918 13.6167 29.5751 14.05C29.5584 14.4833 29.4001 14.85 29.1001 15.15L20.3001 23.95L29.1501 32.8C29.4501 33.1 29.6001 33.45 29.6001 33.85C29.6001 34.25 29.4501 34.6 29.1501 34.9C28.8501 35.2 28.4834 35.35 28.0501 35.35C27.6168 35.35 27.2501 35.2 26.9501 34.9Z"
        fill="#ffffff"
      />
    </svg>
  );
  const flechader = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      onClick={navegarder}
    >
      <path
        d="M17.6999 34.9C17.4332 34.5667 17.2916 34.2 17.2749 33.8C17.2582 33.4 17.3999 33.05 17.6999 32.75L26.4999 23.95L17.6499 15.1C17.3832 14.8333 17.2582 14.475 17.2749 14.025C17.2916 13.575 17.4332 13.2167 17.6999 12.95C18.0332 12.6167 18.3916 12.4583 18.7749 12.475C19.1582 12.4917 19.4999 12.65 19.7999 12.95L29.7499 22.9C29.9166 23.0667 30.0332 23.2333 30.0999 23.4C30.1666 23.5667 30.1999 23.75 30.1999 23.95C30.1999 24.15 30.1666 24.3333 30.0999 24.5C30.0332 24.6667 29.9166 24.8333 29.7499 25L19.8499 34.9C19.5499 35.2 19.1999 35.3417 18.7999 35.325C18.3999 35.3083 18.0332 35.1667 17.6999 34.9Z"
        fill="#ffffff"
      />
    </svg>
  );

  return (
    <div className="tarjetadet" style={{ backgroundColor: color }}>
      <header className="headdet">
        <div className="nombredet" onClick={() => navigate("/")}>
          {flechaback}{" "}
          {pokeDet.name.charAt(0).toUpperCase() + pokeDet.name.slice(1)}
        </div>
        <div className="numerodet">
          #{pokeDet.id.toString().padStart(3, "0")}
        </div>
      </header>
      <main className="maindet">
        <div className="bgpoke">
          <img
            style={{ width: "100%", height: "100%", opacity: "10%" }}
            src="src/Components/Detalles/pokeball-logo.svg"
            alt="pokeball"
          />
        </div>
        <div className="botonesdet">
          {flechaiz}
          {flechader}
        </div>
        <img
          className="imgdet"
          src={pokeDet.sprites.other.home.front_default}
          alt={pokeDet.name}
        />
        <section className="statsdet">
          <div className="tipodet">
            {pokeDet.types.map((type) => {
              const typeClass = type.type.name;
              const backgroundColor = colors[typeClass] || "#ffffff";

              return (
                <span
                  key={type.type.name}
                  className={typeClass}
                  style={{ backgroundColor: backgroundColor, color: "white" }}
                >
                  {type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)}
                </span>
              );
            })}
          </div>
          <h2
            className="texto"
            style={{ color: color, fontSize: "16px", paddingTop: "30px" }}
          >
            About
          </h2>
          <div className="infodet">
            <div className="pesodet">
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="src/assets/img/Weight.svg" alt="peso" />
                <span className="datosdet">
                  {(pokeDet.weight * 0.1).toFixed(2)} kg
                </span>
              </div>
            </div>
            <hr />
            <div className="alturadet">
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="src/assets/img/Height.svg" alt="" />
                <span className="datosdet">
                  {(pokeDet.height * 0.1).toFixed(2)} m
                </span>
              </div>
            </div>
            <hr />
            <div className="skillsdet">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                {pokeDet.abilities.map((ability) => (
                  <span className="datosdet" key={ability.slot}>
                    {ability.ability.name.charAt(0).toUpperCase() +
                      ability.ability.name.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="descripciondet">
            <span>Weight</span>
            <span>Height</span>
            <span>Moves</span>
          </div>
          <div>
            <span className="flavordet">{descripcionIng}</span>
          </div>
          <h2
            className="texto"
            style={{ color: color, fontSize: "16px", paddingTop: "30px" }}
          >
            Base Stats
          </h2>
          <div id="stats">
            <div class="estadisticas">
              <div class="statnom" style={{ color: color }}>
                HP
              </div>
              <div class="statnum">{pokeDet.stats[0].base_stat}</div>
              <div class="statbar">
                <div class="bartotal">
                  <div
                    class="barvariable"
                    style={{
                      width: `${pokeDet.stats[0].base_stat}%`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div class="estadisticas">
              <div class="statnom" style={{ color: color }}>
                ATK
              </div>
              <div class="statnum">{pokeDet.stats[1].base_stat}</div>
              <div class="statbar">
                <div class="bartotal">
                  <div
                    class="barvariable"
                    style={{
                      width: `${pokeDet.stats[1].base_stat}%`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div class="estadisticas">
              <div class="statnom" style={{ color: color }}>
                DEF
              </div>
              <div class="statnum">{pokeDet.stats[2].base_stat}</div>
              <div class="statbar">
                <div class="bartotal">
                  <div
                    class="barvariable"
                    style={{
                      width: `${pokeDet.stats[2].base_stat}%`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div class="estadisticas">
              <div class="statnom" style={{ color: color }}>
                SATK
              </div>
              <div class="statnum">{pokeDet.stats[3].base_stat}</div>
              <div class="statbar">
                <div class="bartotal">
                  <div
                    class="barvariable"
                    style={{
                      width: `${pokeDet.stats[3].base_stat}%`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div class="estadisticas">
              <div class="statnom" style={{ color: color }}>
                SDEF
              </div>
              <div class="statnum">{pokeDet.stats[4].base_stat}</div>
              <div class="statbar">
                <div class="bartotal">
                  <div
                    class="barvariable"
                    style={{
                      width: `${pokeDet.stats[4].base_stat}%`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div class="estadisticas">
              <div class="statnom" style={{ color: color }}>
                SPD
              </div>
              <div class="statnum">{pokeDet.stats[5].base_stat}</div>
              <div class="statbar">
                <div class="bartotal">
                  <div
                    class="barvariable"
                    style={{
                      width: `${pokeDet.stats[5].base_stat}%`,
                      backgroundColor: color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Detalles;
