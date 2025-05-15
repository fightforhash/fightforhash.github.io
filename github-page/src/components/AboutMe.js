import { useState } from 'react';

function AboutMe() {
  const [activeTab, setActiveTab] = useState('experience');

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <div>
            <div className="experience-item">
              <div className="experience-date">July 2024 - Present</div>
              <div className="experience-title">Assistant Manager</div>
              <div className="experience-company">H-Mart</div>
              <div className="experience-description">
                • Conducted meetings with item vendors and wrote scripts that automates reorder process with C++ to enhance turnover. <br></br>
                • Developed a coin calculation program in C++ to assist cashiers who struggled with change counting, improving checkout efficiency.
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-date">July 2020 - August 2020</div>
              <div className="experience-title">Information Technology Assistant</div>
              <div className="experience-company">ULCHI Law Firm</div>
              <div className="experience-description">
                • Assisted in the development of software for case management and document summarization with mySQL and Python <br></br>
                • Analyzed legal disputes to enhance software development and attorney workflows, leveraging Matplotlib for data visualization.
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
                • Focus on Data Analytics and UI Design
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
            Hi, I'm Thomas. I recently graduated from the University of Wisconsin-Madison with a double major in Computer Science Information Science.
          </p>
          <p>
            My passion lies in developing innovative solutions that combine technical excellence with user-centered design. Specialized in full-stack development with a focus on AWS-based deployment and database management, including schema design and query development for both SQL (MySQL) and NoSQL (MongoDB) systems.
          </p>
          <p>
            I'm passionate about building scalable web applications with a strong focus on cloud infrastructure, DevOps practices, and efficient database management. I aim to contribute to impactful projects while deepening my expertise across both frontend and backend systems, including modern deployment workflows and robust data architectures.
          </p>
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