function Navbar({setActiveSection}) {
    return (
      <nav>
      <button onClick={() => setActiveSection('about-me')}>About Me</button>
      <button onClick={() => setActiveSection('skills-interests')}>Skills and Interests</button>
      <button onClick={() => setActiveSection('projects')}>Projects</button>
      <button onClick={() => setActiveSection('contact')}>Contact</button>
    </nav>
    );
  }

export default Navbar;