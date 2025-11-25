import { useLocation, Link } from 'react-router-dom';

function BookingConfirmation() {
  const location = useLocation();
  const { booking, confirmationNumber } = location.state || {};

  if (!booking) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Booking Not Found</h2>
        <p>We couldn't find your booking details.</p>
        <Link to="/cars">
          <button style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}>
            Browse Cars
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
      <h1 style={{ color: '#28a745', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
        Thank you for your booking!
      </p>
      
      <div style={{ 
        border: '2px solid #28a745', 
        padding: '2rem', 
        borderRadius: '12px',
        margin: '2rem 0',
        background: '#f8fff9',
        textAlign: 'left'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Confirmation Number: <strong style={{ color: '#007bff' }}>{confirmationNumber}</strong>
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <strong>Car:</strong> {booking.car?.name}
          </div>
          <div>
            <strong>Dates:</strong> {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
          </div>
          <div>
            <strong>Total Price:</strong> ${booking.totalPrice}
          </div>
          {booking.guestInfo && (
            <>
              <div>
                <strong>Guest Name:</strong> {booking.guestInfo.name}
              </div>
              <div>
                <strong>Email:</strong> {booking.guestInfo.email}
              </div>
              <div>
                <strong>Phone:</strong> {booking.guestInfo.phone}
              </div>
            </>
          )}
          <div>
            <strong>Status:</strong> 
            <span style={{ 
              color: 'green', 
              marginLeft: '0.5rem',
              fontWeight: 'bold'
            }}>
              Confirmed ✅
            </span>
          </div>
        </div>
      </div>

      <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.9rem' }}>
        📧 A confirmation has been sent to your email. 
        Please bring your ID and confirmation number when picking up the car.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/cars">
          <button style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Book Another Car
          </button>
        </Link>
        
        <Link to="/">
          <button style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BookingConfirmation;