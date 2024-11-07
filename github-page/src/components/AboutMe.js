import { useState } from 'react';

function AboutMe() {
  const [activeTab, setActiveTab] = useState('experience'); 

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <div>
            <p><strong>July 2024 - Current</strong><br />Assistant Manager at H-Mart</p>
            <p><strong>July 2020 - Aug 2020</strong><br />Information Technology Assistant at ULCHI Law Firm</p>
          </div>
        );
      case 'education':
        return (
          <div>
            <p><strong>Bachelor of Science in Computer Science</strong><br />University of Wisconsin-Madison, 2024</p>
            <p><strong>Bachelor of Science in Information Science</strong><br />University of Wisconsin-Madison, 2024</p>
            <p><strong>High School Diploma</strong><br />Kyungmoon High School, 2019</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="about-me">
      <h2>About Me</h2>
      <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK-xY779H_NVSgOU9lYp3jNFBQTgAmEAd6hZWqAMpH-NKpbak6PomM-7qwJxnT23J2Uo8&usqp=CAU" alt = "worm"/>
        <p>
            Hi, I'm Thomas. I recently graduated from university and am currently working in retail. <br></br>
            My goal is to break into the tech industry, where I can apply my passion for technology and my ability to learn quickly.<br></br>
            I'm eager to leverage my skills, explore new opportunities, and make meaningful contributions in tech.
        </p>

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