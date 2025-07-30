import { useEffect, useState } from "react";
import { supabase } from "../../client";
import ViewCard from "./ViewCard";

export default function ViewPokemon() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      const { data, error } = await supabase
        .from("Pokemon")
        .select()
        .order('created_at', {ascending: false})

      console.log(data);
      setPokemon(data);

      if (error) {
        console.log(error);
      }
    };
    getPokemon();
  }, []);

  return (
    <div>
      <h1>View Pokemon</h1>
      <div className="viewContainer">
        {pokemon && pokemon.map((item) => <ViewCard data={item} />)}
      </div>
    </div>
  );
}
