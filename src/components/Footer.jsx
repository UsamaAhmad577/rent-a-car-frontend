function Footer() {
  const phoneNumber = "+971 50 798 9100"; // Replace with your actual number
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
  const instagramUrl = "https://instagram.com/yourusername"; // Replace with your Instagram

  return (
    <footer style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '2rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {/* Company Info */}
        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>
            🚗 RentACar
          </h3>
          <p style={{
            margin: '0',
            color: '#ccc',
            lineHeight: '1.6'
          }}>
            Your trusted partner for premium car rentals.
            Quality vehicles at affordable prices.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: '#fff' }}>
            Contact Us
          </h4>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{
              margin: '0.5rem 0',
              color: '#ccc',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📞 <strong>Phone:</strong> {phoneNumber}
            </p>
            <p style={{
              margin: '0.5rem 0',
              color: '#ccc',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ✉️ <strong>Email:</strong> Jawhrat-alshrq@hotmail.com
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: '#fff' }}>
            Connect With Us
          </h4>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* WhatsApp Icon */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                backgroundColor: '#25D366',
                borderRadius: '50%',
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.5rem',
                transition: 'transform 0.3s ease, background-color 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.backgroundColor = '#128C7E';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = '#25D366';
              }}
            >
              <a
                href="#"
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.transition = 'transform 0.3s';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.backgroundColor = '#25D366';
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  style={{ width: '30px', height: '30px', borderRadius: '8px' }}
                />
              </a>

            </a>

            {/* Instagram Icon */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                backgroundColor: '#E4405F',
                borderRadius: '50%',
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.5rem',
                transition: 'transform 0.3s ease, background-color 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.backgroundColor = '#C13584';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = '#E4405F';
              }}
            >
              <a
                href="#"
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.transition = 'transform 0.3s';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.backgroundColor = '#E4405F';
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  style={{ width: '30px', height: '30px', borderRadius: '8px' }}
                />
              </a>

            </a>

            {/* Phone Call Icon */}
            <a
              href={`tel:${phoneNumber}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                backgroundColor: '#007bff',
                borderRadius: '50%',
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.5rem',
                transition: 'transform 0.3s ease, background-color 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.backgroundColor = '#0056b3';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = '#007bff';
              }}
            >
              📞
            </a>
          </div>

          <p style={{
            margin: '1rem 0 0 0',
            color: '#ccc',
            fontSize: '0.9rem'
          }}>
            Click to chat or call us directly!
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid #555',
        marginTop: '2rem',
        paddingTop: '1rem',
        textAlign: 'center',
        color: '#ccc'
      }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} RentACar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;