import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      backgroundColor: '#007bff',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Link to="/" style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🚗 RentACar
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}>Home</Link>
        
        <Link to="/cars" style={{ 
          color: 'white', 
          textDecoration: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}>Browse Cars</Link>
      </div>
    </nav>
  );
}

export default Navbar;