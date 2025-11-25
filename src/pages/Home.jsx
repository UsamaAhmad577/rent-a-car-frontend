import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [carPosition, setCarPosition] = useState(-100);

  useEffect(() => {
    // Animate car driving in from left
    const timer = setTimeout(() => {
      setCarPosition(50); // Final position at 50% from left
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Animated Car */}
      <div style={{
        position: 'absolute',
        left: `${carPosition}%`,
        top: '60%',
        transform: 'translate(-50%, -50%)',
        transition: 'left 2s ease-in-out',
        zIndex: 2
      }}>
        <div style={{
          fontSize: '80px',
          animation: 'bounce 2s infinite'
        }}>
          🚗
        </div>
      </div>

      {/* Road Line */}
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '0',
        width: '100%',
        height: '4px',
        background: 'linear-gradient(90deg, transparent 0%, yellow 50%, transparent 100%)',
        animation: 'roadMove 3s linear infinite'
      }}></div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        paddingTop: '120px',
        color: 'white'
      }}>
        
        {/* Main Heading */}
        <h1 style={{
          fontSize: '5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '3px 3px 10px rgba(0,0,0,0.5)',
          background: 'linear-gradient(45deg, #fff, #f0f0f0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          JAWHRAT AL SHARQ
        </h1>

        {/* Subheading */}
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '300',
          marginBottom: '2rem',
          opacity: '0.9',
          letterSpacing: '3px'
        }}>
          RENT A CAR
        </h2>

        {/* Tagline */}
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '3rem',
          opacity: '0.8',
          maxWidth: '600px',
          margin: '0 auto 3rem auto',
          lineHeight: '1.6'
        }}>
          Luxury Cars • Premium Service • Unforgettable Journeys
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <Link to="/cars">
            <button style={{
              padding: '15px 30px',
              fontSize: '1.2rem',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 15px rgba(255,107,107,0.4)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(255,107,107,0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 5px 15px rgba(255,107,107,0.4)';
            }}>
              Browse Cars
            </button>
          </Link>

          <Link to="/register">
            <button style={{
              padding: '15px 30px',
              fontSize: '1.2rem',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#667eea';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'white';
            }}>
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        left: '0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '4rem',
        color: 'white',
        zIndex: 3
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
          <div>Premium Fleet</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
          <div>Best Prices</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
          <div>Secure Booking</div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes roadMove {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          h1, h2, p {
            animation: fadeInUp 1s ease-out;
          }

          h2 {
            animation-delay: 0.3s;
            animation-fill-mode: both;
          }

          p {
            animation-delay: 0.6s;
            animation-fill-mode: both;
          }
        `}
      </style>
    </div>
  );
}

export default Home;