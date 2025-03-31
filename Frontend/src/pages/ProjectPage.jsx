import React from "react";
import Navbar from "../components/NavBar";
import ProjectCard from "../components/ProjectCard";
import "../styles/ProjectsPage.css";
import greenSvg from "../assets/ProjectPageIcons/Green.svg";
import redSvg from "../assets/ProjectPageIcons/Red.svg";
import yellowSvg from "../assets/ProjectPageIcons/Yellow.svg";
import stripeSvg from "../assets/ProjectPageIcons/Stripe.svg"; // Import stripe.svg

const ProjectsPage = () => {
  const categories = ["UX/UI", "DSA/CP", "Open Source", "App Dev", "Cyber Security"];
  const projects = [
    { title: "Mastering Firebase", description: "Discover how Firebase...", date: "24, May, 2005" },
    { title: "Mastering Firebase", description: "Discover how Firebase...", date: "24, May, 2005" },
    { title: "Mastering Firebase", description: "Discover how Firebase...", date: "24, May, 2005" },
    { title: "Mastering Firebase", description: "Discover how Firebase...", date: "24, May, 2005" },
    { title: "Mastering Firebase", description: "Discover how Firebase...", date: "24, May, 2005" },
    { title: "Mastering Firebase", description: "Discover how Firebase...", date: "24, May, 2005" },
  ];

  return (
    <div className="projects-page">
      <Navbar />
      {/* Green SVG */}
      <div className="green-svg-container">
        <img src={greenSvg} alt="Green Decoration" className="green-svg" />
      </div>
      {/* Red SVG */}
      <div className="red-svg-container">
        <img src={redSvg} alt="Red Decoration" className="red-svg" />
      </div>
      {/* Yellow SVG */}
      <div className="yellow-svg-container">
        <img src={yellowSvg} alt="Yellow Decoration" className="yellow-svg" />
      </div>
      <div className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <div className="stripe-svg-container">
          <img src={stripeSvg} alt="Stripe Decoration" className="stripe-svg" />
        </div>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
      <div className="projects-categories">
        {categories.map((category, index) => (
          <button key={index} className="category-button">
            {category}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            date={project.date}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;