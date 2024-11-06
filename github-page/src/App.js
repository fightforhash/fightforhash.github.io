import { useState } from 'react';
import AboutMe from './components/AboutMe';
import SkillsInterests from './components/SkillsInterests';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  const [activeSection, setActiveSection] = useState('about-me');

  const renderSection = () => {

    switch (activeSection){
      case 'about-me':
        return <AboutMe />;
      case 'skills-interests':
        return <SkillsInterests />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <AboutMe />;

    }
  }

  return (
    <div>
      <Navbar setActiveSection = {setActiveSection} />
      {renderSection()}
    </div>
  );

}

export default App;
