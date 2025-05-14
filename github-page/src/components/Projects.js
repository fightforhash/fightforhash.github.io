import React from 'react';

function Projects() {
  const projects = [
    {
      title: "LostLink",
      description: "A mobile-first platform that helps organizations manage and match lost & found items using AI-powered metadata tagging and secure user authentication.",
      image: "/images/lostlink.jpg",
      tech: ["React", "Node.js", "MongoDB", "AI/ML", "Expo", "Mobile"],
      github: "#",
      live: "#"
    },
    {
      title: "Art Museum Simulator",
      description: "Personal portfolio website built with React and modern CSS, featuring responsive design and smooth animations.",
      image: "/images/portfolio.jpg",
      tech: ["React", "CSS3", "JavaScript"],
      github: "https://github.com/fightforhash/fightforhash.github.io",
      live: "#"
    },
    {
      title: "Custom FUSE Filesystem",
      description: "Implemented a full UNIX-style filesystem in user space using FUSE and C. Features include inode & block bitmap management, directory hierarchy, file create/read/write/delete, POSIX metadata support, and proper error codes.",
      image: "/images/filesystem.jpeg",
      tech: ["C", "FUSE", "POSIX API", "mmap", "Makefile"],
      github: "https://github.com/yourusername/wfs",
      
    },
    {
      title: "Coin Calculator",
      description: "Built to help cashiers struggling with uneven coin distribution when giving change. Uses DFS backtracking and standard deviation to find the most balanced combination of coins automatically.",
      image: "/images/coin_calculator.jpg",
      tech: ["Python", "DFS", "Statistics", "Algorithm"],
      github: "https://github.com/fightforhash/fightforhash.github.io",
    },
    {
      title: "Othello Game in Python",
      description: "Personal portfolio website built with React and modern CSS, featuring responsive design and smooth animations.",
      image: "/images/portfolio.jpg",
      tech: ["React", "CSS3", "JavaScript"],
      github: "https://github.com/fightforhash/fightforhash.github.io",
    }


  ];

  return (
    <section id="projects">
      <h1>Personal and Team Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x200?text=Project+Image';
              }}
            />
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fab fa-github"></i> GitHub
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;