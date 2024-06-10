import UserType from "../../../types/user";
import { BASE } from "../../cosnt";
import "./client.scss";
import { Link, useNavigate } from 'react-router-dom';

const ClientCard: React.FC<UserType> = ({ photo, firstName, lastName, username, info , _id }) => {
  const navigate = useNavigate();
  console.log(navigate);
  return (
      <div className="client-card">
        <div className="client-img">
            <img src={`${BASE}upload/${photo}`} alt={photo} />
        </div>
        <div className="client-infos">
          <h2 style={{ color: "white" }}>{firstName}</h2>
          <h1>{lastName}</h1>
          <h3>{username ? username : "unknown"}</h3>
          <p>{info ? info: "lorem100"}</p>
          <Link to={`${_id}`} className="portfolio-btn">See portfolio</Link>
        </div>
      </div>
  );
};

export default ClientCard;
