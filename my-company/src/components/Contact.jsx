import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #27ae60', paddingBottom: '10px' }}>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '4px', fontSize: '16px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '4px', fontSize: '16px' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ padding: '12px', border: '1px solid #bdc3c7', borderRadius: '4px', fontSize: '16px', resize: 'vertical' }}
        />
        <button 
          type="submit"
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#27ae60', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            fontSize: '16px', 
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
