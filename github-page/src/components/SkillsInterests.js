import React, { useState } from 'react';

function SkillsandInterests() {
    const [activeCard, setActiveCard] = useState(null);

    const handleCardClick = (cardName) => {
      setActiveCard(cardName);
    };
  
    return (
        <section id="skills-interests">
        <h2>Skills</h2>
        <div className="skill-pair">
          <div className="skill-category">
            <h3>Frontend</h3>
            <div>
              <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
              <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
              <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
            </div>
          </div>
      
          <div className="skill-category">
            <h3>Backend</h3>
            <div>
              <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
              <img src="https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
              <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
              <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" style={{ marginRight: '10px', marginTop: '10px', height: '50px', width: '150px' }} />
            </div>
          </div>
        </div>
      
        <div className="skill-pair">
          <div className="skill-category">
            <h3>Database</h3>
            <div>
              <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
              <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
            </div>
          </div>
      
          <div className="skill-category">
            <h3>Data Analytics</h3>
            <div>
              <img src="https://img.shields.io/badge/Microsoft_Excel-217346?style=for-the-badge&logo=microsoft-excel&logoColor=white" alt="Excel" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
              <img src="https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black" alt="Matplotlib" style={{ marginRight: '10px', height: '50px', width: '150px' }} />
            </div>
          </div>
        </div>
      
      

    <h2>Areas of Interest</h2>
      <div className="interest-cards">
        <div
          className={`interest-card ${activeCard === 'fullstack' ? 'active' : ''}`}
          onClick={() => handleCardClick('fullstack')}
        >
        <img src = "https://files.builder.misssite.com/96/e4/96e4580f-8381-4673-8aa7-dcace1e766fd.jpg" alt = "Full Stack Web Devleopment"/>
          <h3>Full Stack Web Development</h3>
          <p>Building and maintaining web applications from front-end to back-end, including working with modern frameworks like React, Flask, and Express to deliver responsive and efficient user experiences.</p>
        </div>
        
        <div
          className={`interest-card ${activeCard === 'databases' ? 'active' : ''}`}
          onClick={() => handleCardClick('databases')}
        >
        <img src = "https://www.aceinfoway.com/blog/wp-content/uploads/2020/03/Best-Database-to-work-with-in-2020.jpg" alt = "Databases"/>
          <h3>Databases</h3>
          <p>Experience with relational and non-relational databases like MySQL and MongoDB, focusing on data modeling, querying, and optimizing storage solutions for fast and secure access to data.</p>
        </div>
        
        <div
          className={`interest-card ${activeCard === 'datanalytics' ? 'active' : ''}`}
          onClick={() => handleCardClick('datanalytics')}
        >
        <img src = "https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2018/12/Data-Analytics-What-is-Data-Analytics-Edureka-1.png" alt = "Databases"/>
          <h3>Data Analytics</h3>
          <p>Utilizing tools like Python and libraries such as Pandas, NumPy, and matplotlib to analyze data, create predictive models, and uncover valuable insights to drive data-informed decision-making.</p>
        </div>
      </div>
        </section>


    )
}
export default SkillsandInterests;