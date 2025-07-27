import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Surprise Party!</h1>
      <h3>
        Build a team of random, surprise Pokemon with customizable attributes!
      </h3>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly", paddingInline: "20%"}}>
        <img
          style={{ height: "50px" }}
          src="https://static.pokemonpets.com/images/monsters-images-800-800/4228-Unown-Question.webp"
        />
        <h4>Navigate to {" "}
            <Link to="/get">
             Get Pokemon 
            </Link>
             {" "} to get started</h4>
      </div>
    </div>
  );
}
