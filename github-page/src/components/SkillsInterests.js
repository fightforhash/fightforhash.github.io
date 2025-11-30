import React, { useState } from 'react';

function SkillsandInterests() {
    const [activeCard, setActiveCard] = useState(null);

    const handleCardClick = (cardName) => {
      setActiveCard(cardName);
    };
  
    return (
      <section id="skills-interests">
   <div className="skills-publications-grid">

    {/* LEFT CARD: Technical Skills */}
    <div className="skills-card">
      <h2>Technical Skills</h2>

      <div className="skill-category">
        <h3>Frontend</h3>
        <div className="skill-items">
          <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
          <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
          <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" />
          <img src="https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
          <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
          <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
        </div>
      </div>

      <div className="skill-category">
        <h3>Backend / APIs</h3>
        <div className="skill-items">
          <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
          <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express" />
        </div>
      </div>

      <div className="skill-category">
        <h3>Database</h3>
        <div className="skill-items">
          <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
          <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
        </div>
      </div>

      <div className="skill-category">
        <h3>Tools & Workflow</h3>
        <div className="skill-items">
          <img src="https://img.shields.io/badge/git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
          <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
          <img src="https://img.shields.io/badge/docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
          <img src="https://img.shields.io/badge/aws-%23FF9900.svg?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" />
          <img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" />
        </div>
      </div>
    </div>

    {/* 오른쪽 : Publications */}
    <div className="publication-column">
      <h2>Publications</h2>

      <a
          href="https://drive.google.com/file/d/1iKFNqydrp9rGK_ij2msxzH-YGcrMvgOm/view"
          target="_blank"
          rel="noreferrer"
          className="publication-clickable"
        >

      <div className = "publication-card">
        <img

          src="/images/Presentation.jpeg"  
          alt="LostLink poster presentation at UKC 2025"
          className="publication-image"
        />
        <h3 className = "publication-title">An Architectural Analysis of an AI-Infused Full-Stack Web Application Powered by RAG </h3>

        <p className="publication-meta">
          KSEA UKC 2025 (US–Korea Conference on Science, Technology & Entrepreneurship) — Aug 2025
        </p>

        <p className="publication-desc">
          Presented a poster introducing a full-stack web application project, covering the system’s architecture, React/TypeScript frontend, Node.js backend API design, and the deployment workflow using AWS EC2 and S3 in a production-like environment.
        </p>
        </div>
      </a>
    </div>
  </div>

      
      <div className="flex justify-between items-center">
        <h2> Articles </h2>
      </div>
      <div className = "articledescription">
        <p className = "mt-2"> A selection of engineering writeups and notes from my recent work in full-stack development, AI systems, and scalable architecture.</p> 
        <a href="https://fightforhash.hashnode.dev" className="btn-primary"> View All Posts </a>
      </div>
        <div className="interest-cards">
          
          <div
            className={`interest-card ${activeCard === 'ragpipeline' ? 'active' : ''}`}
            onClick={() => handleCardClick('ragpipeline')}
          >
            <img src="../images/RAGPIPELINE.png" alt="RAGPIPE"/>
            <h3>Building a Local RAG Pipeline on RTX 5080</h3>
            <p>Experiments with LLaVA, FAISS, Node.js, and React Native — covering architecture choices, GPU memory considerations, and real-world performance tradeoffs.</p>
          </div>
          
          <div
            className={`interest-card ${activeCard === 'reactpattern' ? 'active' : ''}`}
            onClick={() => handleCardClick('reactpattern')}
          >
            <img src="../images/REACTPATTERN.png" alt="REACTPATTERNS"/>
            <h3>React Design Patterns I wish I knew earlier</h3>
            <p>Lessons learned from building complex interfaces: state management pitfalls, memoization strategies, rendering performance, and practical hook usage in production-level apps.</p>
          </div>
          
          <div
            className={`interest-card ${activeCard === 'aws' ? 'active' : ''}`}
            onClick={() => handleCardClick('aws')}
          >
            <img src="../images/AWS.png" alt="aws Foundations"/>
            <h3>Deploying Cloud-Native Services on AWS</h3>
            <p>A practical breakdown of Dockerization, CI/CD pipelines, multi-environment provisioning, and scalable backend architecture for full-stack applications.</p>
          </div>
          <div className="flex justify-center mt-6">
          </div>

        </div>
      </section>
    )
}
export default SkillsandInterests;