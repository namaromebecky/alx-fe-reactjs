import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: '#2c3e50', 
      padding: '1rem 2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link 
          to="/" 
          style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '1.5rem', 
            fontWeight: 'bold' 
          }}
        >
          MyCompany
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
          <Link to="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
