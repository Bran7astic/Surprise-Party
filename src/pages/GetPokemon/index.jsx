import { useEffect, useState } from "react";
import StepCard from "../../components/StepCard";
import "./GetPokemon.css"
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

export default function GetPokemon() {
  const pokemonNatures = [
    "Adamant",
    "Bashful",
    "Bold",
    "Brave",
    "Calm",
    "Careful",
    "Docile",
    "Gentle",
    "Hardy",
    "Hasty",
    "Impish",
    "Jolly",
    "Lax",
    "Lonely",
    "Mild",
    "Modest",
    "Naive",
    "Naughty",
    "Quiet",
    "Quirky",
    "Rash",
    "Relaxed",
    "Sassy",
    "Serious",
    "Timid",
  ];

  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [stats, setStats] = useState({
    HP: 0,
    Attack: 0,
    Defense: 0,
    SpAtk: 0,
    SpDef: 0,
    Speed: 0,
  });
  const [nature, setNature] = useState("")

  const [pokemonRolls, setPokemonRolls] = useState(3);
  const [statRolls, setStatRolls] = useState(3);

  const getRandomNum = (range) => {
    return Math.floor(Math.random() * range) + 1;
  };

  const handleGet = () => {
    const getRandomPokemon = async () => {
      try {
        const dexNum = getRandomNum(1025);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${dexNum}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error, Status: ${response.status}`);
        }

        const data = await response.json();
        const pokemonName = data?.name;
        const pokemonImg =
          data?.sprites.other["official-artwork"].front_default;
        setPokemonData(data);
        setName(capitalize(pokemonName));
        setImg(pokemonImg);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    };

    if (pokemonRolls > 0) {
      getRandomPokemon();
      setPokemonRolls((prev) => prev - 1);
    }
  };

  const handleStats = () => {
    const rolledStats = Object.keys(stats).reduce((acc, key) => {
      const randomStat = getRandomNum(31);
      acc[key] = randomStat;
      return acc;
    }, {});

    if (statRolls > 0) {
      setStats(rolledStats);
      setStatRolls((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const postPokemon = async () => {
      const { error } = await supabase.from("Pokemon").insert({
        species: name,
        image: img,
        nickname: nickname,
        stats: JSON.stringify(stats),
        nature: nature
      });

      if (error) {console.log(error)};

      navigate('/view');
    };

    postPokemon();
  };

  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="getPokemonContainer">
      <h1>Get a Surprise Pokemon</h1>

      <StepCard>
        <h2>1. Find a Pokemon</h2>

        <p>
          {" "}
          {/* Roll Message */}
          You have <b>{pokemonRolls}</b> {pokemonRolls === 1 ? "roll" : "rolls"}{" "}
          left!
        </p>

        <button
          onClick={handleGet}
          style={{
            backgroundColor: pokemonRolls < 1 ? "#b1bdd3ff " : "#97b6ea",
          }}
        >
          {pokemonRolls > 0 ? "Surprise Me" : "Out of Rolls!"}
        </button>

        {pokemonData && (
          <div>
            <img
              src={pokemonData.sprites.other["official-artwork"].front_default}
            />
            <h3>
              You found {"aeiou".includes(name.charAt(0)) ? "an" : "a"}{" "}
              {capitalize(name)}!
            </h3>
          </div>
        )}
      </StepCard>

      <StepCard>
        <h2>2. Nickname Your Pokemon</h2>
        <input
          placeholder={name}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{
            borderRadius: "20px",
            width: "50%",
            padding: "10px",
            textAlign: "center",
            color: "#5171aaff",
            border: "1px solid #97b6ea",
          }}
        ></input>
      </StepCard>

      <StepCard>
        <h2>3. Roll Your Stats</h2>
        <p>
          You have <b>{statRolls}</b> {statRolls === 1 ? "roll" : "rolls"} left!
        </p>
        <button
          onClick={handleStats}
          style={{
            backgroundColor: statRolls < 1 ? "#b1bdd3ff " : "#97b6ea",
          }}
        >
          Roll
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
          }}
        >
          {stats &&
            Object.keys(stats).length > 0 &&
            Object.keys(stats).map((item) => (
              <p>
                <b>{item}</b>: {stats[item]}
              </p>
            ))}
        </div>
      </StepCard>

      <StepCard>
        <h2>4. Select Their Nature</h2>
        <select value={nature} onChange={e => setNature(e.target.value)}
          style={{
            borderRadius: "20px",
            width: "50%",
            padding: "10px",
            textAlign: "center",
            color: "#5171aaff",
            border: "1px solid #97b6ea",
          }}
        >
          {pokemonNatures.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </StepCard>

      <button style={{width: "50%"}} onClick={handleSubmit}>Submit</button>
    </div>
  );
}
