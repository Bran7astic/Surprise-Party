import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StepCard from "../../components/StepCard";
import { supabase } from "../../client";

export default function Edit() {
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

  const id = useParams().id;
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [nature, setNature] = useState("");

  const handleSubmit = () => {
    const updateData = async() => {
        const { error } = await supabase
            .from('Pokemon')
            .update({nickname: nickname, nature: nature})
            .eq('id', id)

        if (error) {
            console.log(error)
        }
    }

    updateData()
    navigate(`/view/${id}`)
    
  }

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("Pokemon")
        .select()
        .eq("id", id);

      console.log(data);
      setPokemonData(data[0]);

      setNickname(data[0].nickname);
      setNature(data[0].nature);

      if (error) {
        console.log(error);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    console.log(nickname);
  }, [nickname]);

  return (
    <div>
      <h1>Edit {pokemonData.nickname}'s Attributes</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2em"
        }}
      >
        <StepCard>
          <h2>Update Nickname</h2>
          <input
            placeholder={pokemonData.nickname}
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
          <h2>4. Select Their Nature</h2>
          <select
            value={nature}
            onChange={(e) => setNature(e.target.value)}
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
    </div>
  );
}
