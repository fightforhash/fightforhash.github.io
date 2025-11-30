import { useState } from 'react';

function AboutMe() {
  const [activeTab, setActiveTab] = useState('experience');

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <div>
            <div className="experience-item">
              <div className="experience-date">July 2024 - Nov 2025</div>
              <div className="experience-title">Retail Operations & Technical Support</div>
              <div className="experience-company">H-Mart (Seattle, WA)</div>
              <div className="experience-description">
                • Collaborated with item vendors and built C++ automation scripts to streamline the product reorder workflow, reducing manual steps and improving inventory turnover efficiency. <br></br>
                • Created a C++ change-calculation tool that supported cashiers with accurate and faster checkout operations, contributing to smoother front-end service.
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-date">July 2020 - August 2020</div>
              <div className="experience-title">Information Technology Assistant</div>
              <div className="experience-company">ULCHI Law Firm (Seoul, South Korea)</div>
              <div className="experience-description">
                • Supported development of internal case-management tools using Python and MySQL, contributing to improved document handling and workflow efficiency. <br></br>
                • Assisted attorneys by analyzing legal disputes and generating data-driven summaries and visualizations with Matplotlib, improving clarity and decision-making during case preparation.
              </div>
            </div>
          </div>
        );
      case 'education':
        return (
          <div>
            <div className="education-item">
              <div className="education-date">2020 - 2024</div>
              <div className="education-title">Bachelor of Science in Computer Science</div>
              <div className="education-institution">University of Wisconsin-Madison</div>
              <div className="education-description">
                • GPA: 3.5/4.0
                • Relevant Coursework: Data Structures, Algorithms, Operating Systems
              </div>
            </div>

            <div className="education-item">
              <div className="education-date">2020 - 2024</div>
              <div className="education-title">Bachelor of Science in Information Science</div>
              <div className="education-institution">University of Wisconsin-Madison</div>
              <div className="education-description">
                • Focus on UI/UX Design, Data Analytics
              </div>
            </div>

            <div className="education-item">
              <div className="education-date">2015 - 2019</div>
              <div className="education-title">High School Diploma</div>
              <div className="education-institution">Kyungmoon High School</div>
              </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="about-me">
      <h2>About Me</h2>
      <div className="profile-section">
        <div className="profile-image-container">
          <img 
            src="/images/profile.jpg" 
            alt="Thomas's profile" 
            className="profile-image"
          />
        </div>
        <div className="profile-text">
          <p>
            Hi, I'm Thomas. I recently graduated from the University of Wisconsin–Madison with a double major in Computer Science and Information Science.
          </p>
          <p>
            I focus on building clean, responsive, and user-centered web interfaces with modern JavaScript frameworks. My core strength lies in front-end development—working with React, TypeScript, and component-driven design to create intuitive and high-performance experiences.
          </p>
          <p> 
            I also enjoy the full-stack pipeline, from designing APIs with Node.js/Express to integrating databases like MySQL and MongoDB. I’m currently deepening my skills in frontend architecture, performance optimization, and scalable deployment workflows.          
          </p>
          <p>
            Outside of development, I'm a guitarist drawn to blues and jazz fusion — they keep my creativity sharp and grounded as I create.          </p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'experience' ? 'active' : ''}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
        <button
          className={activeTab === 'education' ? 'active' : ''}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>
    </section>
  );
}

export default AboutMe;