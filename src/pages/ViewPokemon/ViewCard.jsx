import { useNavigate } from "react-router-dom";
import "./ViewCard.css"

export default function ViewCard({data}){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/view/${data.id}`)
    }

    return(
        <div className="viewCard" onClick={handleClick}>
            <img src={data.image} className="viewImg"/>
            <h4>{data.nickname}<br/>({data.species})</h4>
        </div>
    );
}