import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    fetch("https://formspree.io/f/mdkogder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you! Your message has been sent.");
          setFormData({ name: '', email: '', subject: '', message: '' }); // Clear the form
        } else {
          alert("Oops! There was a problem submitting your form.");
        }
      })
      .catch((error) => {
        alert("Oops! There was a problem submitting your form.");
        console.error("Error:", error);
      });
  };

  return (
    <section id="contact-me">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your Name"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your Email"
        />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Your Message"
        ></textarea>

        <button type="submit">Send Message</button>
      </form>

      {/* LinkedIn Badge */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="https://www.linkedin.com/in/thomas-h-75150019b/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"
            alt="LinkedIn Profile"
            style={{ marginTop: '15px', height: '80px', width: '400px' }}
          />
        </a>
      </div>
    </section>
  );
}

export default Contact;