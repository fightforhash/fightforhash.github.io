import React, { useState } from 'react';

function SkillsandInterests() {
    const [activeCard, setActiveCard] = useState(null);

    const handleCardClick = (cardName) => {
      setActiveCard(cardName);
    };
  
    return (
      <section id="skills-interests">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
    
          <div className="skill-category frameworks">
            <h3>Frameworks & Tools</h3>
            <div className="skill-items">
              <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
              <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
              <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
              <img src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37" alt="Expo" />
            </div>
          </div>
    
          <div className="skill-category databases">
            <h3>Databases & Analytics</h3>
            <div className="skill-items">
              <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
              <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
              <img src="https://img.shields.io/badge/r-%23276DC3.svg?style=for-the-badge&logo=r&logoColor=white" alt="R" />
            </div>
          </div>
    
          <div className="skill-category languages">
            <h3>Programming Languages</h3>
            <div className="skill-items">
              <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" />
              <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" />
              <img src="https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++" />
              <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
              <img src="https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white" alt="C" />
              <img src="https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white" alt="C#" />
              <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
              <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
            </div>
          </div>
        </div> 

        <h2>Areas of Interest</h2>
        <div className="interest-cards">
          <div
            className={`interest-card ${activeCard === 'fullstack' ? 'active' : ''}`}
            onClick={() => handleCardClick('fullstack')}
          >
            <img src="../images/fullstack.jpg" alt="Full Stack Development"/>
            <h3>Full Stack+Mobile Development</h3>
            <p>Specializing in modern web and mobile development with React, Node.js, and Expo (React Native), creating responsive, scalable applications with clean, maintainable code.</p>
          </div>
          
          <div
            className={`interest-card ${activeCard === 'backend' ? 'active' : ''}`}
            onClick={() => handleCardClick('backend')}
          >
            <img src="../images/devops.jpg" alt="Cloud/DevOps"/>
            <h3>Cloud/DevOps</h3>
            <p>  Experienced in deploying cloud-native applications using AWS, Docker, and CI/CD pipelines. Skilled in managing DevOps workflows, monitoring systems, and automating infrastructure. </p>
          </div>
          
          <div
            className={`interest-card ${activeCard === 'databases' ? 'active' : ''}`}
            onClick={() => handleCardClick('databases')}
          >
            <img src="../images/db.jpg" alt="Database Foundations"/>
            <h3>Database Foundations</h3>
            <p>Hands-on experience with relational and non-relational databases. Eager to deepen understanding of data structures, indexing, and efficient query patterns in real-world systems.</p>
          </div>
        </div>
      </section>
    )
}
export default SkillsandInterests;