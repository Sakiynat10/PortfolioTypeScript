import PortfolioType from "../../../types/portfolios";

const Skill: React.FC<PortfolioType> = ({name}) => {
  return (
    <div className="skill-card">
      <h1>{name}</h1>
    </div>
  );
};

export default Skill;
