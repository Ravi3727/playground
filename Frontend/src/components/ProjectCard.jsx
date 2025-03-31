import React from "react";
import "../styles/ProjectCard.css";
import cardimage from "../assets/ProjectPageIcons/cardimage.svg"

const ProjectCard = ({ title, description, date }) => {
  return (
    <div className="project-card">
      <img
        src={cardimage}
        alt="Project"
        className="project-card-img"
      />
      <div className="project-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="project-card-date">{date}</p>
      </div>
    </div>
  );
};

export default ProjectCard;