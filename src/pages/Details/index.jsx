import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../client";

export default function Details() {
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState({});
  const [stats, setStats] = useState({});
  const [average, setAverage] = useState(0);

  const id = useParams().id;

  const handleDelete = () => {
    const deletePokemon = async () => {
      const response = await supabase.from("Pokemon").delete().eq("id", id);

      console.log(response);
    };

    deletePokemon();
    navigate("/view");
  };

  const getAverageStats = () => {
    const sum = Object.keys(stats).reduce((acc, next) => {
      return acc + stats[next];
    }, 0);

    const averageStats = (sum / 6).toFixed(2);
    setAverage(averageStats);
  };

  const getSuccessMessage = () => {
    if (average < 11) {
      return `${pokemonData.nickname} isn't the strongest fighter.`;
    } else if (average < 21) {
      return `${pokemonData.nickname} won't be too bad in battles!`;
    } else {
      return `${pokemonData.nickname} will be a battling prodigy!`;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("Pokemon")
        .select()
        .eq("id", id);

      console.log(data);
      setPokemonData(data[0]);

      if (error) {
        console.log(error);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    if (pokemonData.stats) {
      const statData = JSON.parse(pokemonData.stats);
      console.log(statData);
      setStats(statData);
    }

    getAverageStats();
  }, [pokemonData]);

  return (
    <div>
      {pokemonData && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>
            {pokemonData.nickname} ({pokemonData.species})
          </h1>
          <img src={pokemonData.image} />
          <h3>Nature: {pokemonData.nature}</h3>
          <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2em",
            }}
            >
            {Object.keys(stats).length > 0 &&
              Object.keys(stats).map((item) => (
                  <p>
                  <b>{item}</b>: {stats[item]}
                </p>
              ))}
          </div>
          <h4>
            {pokemonData.nickname}'s stat average is {average} <br />
            {getSuccessMessage()}
          </h4>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1em"}}>
            <button onClick={() => navigate(`/view/${id}/edit`)}>Edit</button>
            <button onClick={handleDelete} style={{ backgroundColor: "#ff9999" }}>
                Delete
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
