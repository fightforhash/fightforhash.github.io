import React from 'react';

function Projects() {
  const featured = [
      {
      title: "Local RAG Pipeline on RTX 5080 (Coming Soon)",
      description:
        "End-to-end RAG application featuring local multimodal inference (LLaVA), document ingestion pipeline, GPU memory optimization, and React/Node.js frontend.",
      image: "/images/ComingSoon.jpg",
      tech: ["React", "Node.js", "GPU", "LLaVA", "Docker", "RAG", "FAISS"],
      github: "#",
      live: "#"
    },
    {
      title: "LostLink",
      description: "A mobile-first platform that helps organizations manage and match lost & found items using AI-powered metadata tagging and secure user authentication.",
      image: "/images/InProgress.jpg",
      tech: ["React", "Node.js", "MongoDB", "AI/ML", "Expo", "Mobile", "Docker", "AWS"],
      github: "https://github.com/fightforhash/lostlink",
      live : "#"
    }
  ];

  const others = [
    {
      title: "Coin Calculator",
      description: "Built to help cashiers struggling with uneven coin distribution when giving change. Uses DFS backtracking and standard deviation to find the most balanced combination of coins automatically.",
      image: "/images/StarCoin.jpg",
      tech: ["Python", "DFS", "Statistics", "Algorithm"],
      github: "https://github.com/fightforhash/CoinCalculator",
      live : "#"
    },
    {
      title: "Custom FUSE Filesystem",
      description: "Implemented a full UNIX-style filesystem in user space using FUSE and C. Features include inode & block bitmap management, directory hierarchy, file create/read/write/delete, POSIX metadata support, and proper error codes.",
      image: "/images/filesystem.jpeg",
      tech: ["C", "FUSE", "POSIX API", "mmap", "Makefile"],
      github: "https://github.com/fightforhash/FUSEfilesystem",
      live : "#"
    },
    {
      title: "AI-Powered Othello Game in Python",
      description: "AI-Powered Othello Game featuring Alpha-Beta Pruning algorithm for optimized gameplay. Built with Python, Tkinter GUI, and MySQL for storing user stats. Designed database schema and implemented tables for game data management. Includes multiple difficulty levels, user authentication, move hints, and game statistics tracking.",
      image: "/images/othello.jpeg",
      tech: ["Algorithm", "Python", "Tkinter", "MySQL"],
      github: "https://github.com/fightforhash/PythonOthello",
      live : "#"
    },
    {
      title: "Virtual Reality Art Museum Simulator",
      description: "Developed a Unity Asset Simulator using C# and Unity, enabling users to teleport within a virtual environment. The project supports VR headsets and simulates real-time asset interaction for immersive testing and visualization.",
      image: "/images/simulator.jpg",
      tech: ["Unity", "C#", "Asset Simulation", "VR"],
      github: "https://github.com/fightforhash/VRArtMuseumSimulator",
      live : "#"
    }
  ]

  return (
    <section id="projects">
      <h1>Personal and Team Projects</h1>

{/* Featured Projects */}
  <div className="featured-container">
    {featured.map((project, index) => (
      <a
        key={index}
        href={project.github === "#" ? undefined : project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="featured-card"
      >
        <img
          src={project.image}
          alt={project.title}
          className="featured-image"
        />
        <div className="featured-content">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tech">
            {project.tech.map((t, idx) => (
              <span key={idx} className="tech-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    ))}
  </div>

      {/* Other Projects */}
      <h2 className="others-title">Other Projects</h2>
      <div className="projects-grid">
        {others.map((project, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() =>
              window.open(project.github, "_blank", "noopener,noreferrer")
            }
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;