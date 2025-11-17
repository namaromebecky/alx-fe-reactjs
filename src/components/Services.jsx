function Services() {
  const services = [
    "Technology Consulting",
    "Market Analysis", 
    "Product Development",
    "Digital Marketing",
    "IT Support"
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #e74c3c', paddingBottom: '10px' }}>Our Services</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {services.map((service, index) => (
          <li key={index} style={{
            padding: '15px',
            margin: '10px 0',
            backgroundColor: '#f8f9fa',
            borderLeft: '4px solid #e74c3c',
            borderRadius: '4px'
          }}>
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
