import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../utils/api';

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get booking details from navigation state
  const { car, startDate, endDate, totalPrice } = location.state || {};
  
  const [bookingType, setBookingType] = useState('guest'); // 'guest' or 'login'
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if no car data
  useEffect(() => {
    if (!car) {
      navigate('/cars');
    }
  }, [car, navigate]);

  // Handle guest booking
  const handleGuestBooking = async () => {
    if (!guestInfo.name || !guestInfo.email || !guestInfo.phone) {
      setError('Please fill all guest information');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestInfo.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.post('/api/bookings/guest', {
        carId: car._id,
        startDate,
        endDate,
        totalPrice,
        guestInfo
      });

      // Redirect to confirmation page
      navigate('/booking-confirmation', { 
        state: { 
          booking: response.booking,
          confirmationNumber: response.booking.confirmationNumber 
        }
      });
    } catch (err) {
      console.error('Guest booking error:', err);
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle user booking (logged-in user)
  const handleUserBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login with booking details
      navigate('/login', { 
        state: { 
          car, 
          startDate, 
          endDate, 
          totalPrice,
          redirectTo: '/booking'
        } 
      });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.authenticatedRequest('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          carId: car._id,
          startDate,
          endDate
        })
      });

      // Redirect to confirmation page
      navigate('/booking-confirmation', { 
        state: { 
          booking: response.booking,
          confirmationNumber: `UB${response.booking._id}`
        }
      });
    } catch (err) {
      console.error('User booking error:', err);
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate rental days
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  if (!car) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No Car Selected</h2>
        <p>Please select a car to book first.</p>
        <button 
          onClick={() => navigate('/cars')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Browse Cars
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Complete Your Booking</h1>
      
      {/* Booking Summary */}
      <div style={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: '12px', 
        padding: '1.5rem',
        marginBottom: '2rem',
        backgroundColor: '#f8f9fa'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Booking Summary</h3>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <img 
            src={car.imageUrl} 
            alt={car.name}
            style={{ 
              width: '120px', 
              height: '80px', 
              objectFit: 'cover', 
              borderRadius: '8px' 
            }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>{car.name}</h4>
            <p style={{ margin: '0.25rem 0', color: '#666' }}>{car.description}</p>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
              <div>
                <strong>Dates:</strong><br />
                {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Duration:</strong><br />
                {calculateDays()} days
              </div>
              <div>
                <strong>Total:</strong><br />
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007bff' }}>
                  ${totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Type Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>How would you like to book?</h3>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setBookingType('guest')}
            style={{
              padding: '1.5rem',
              backgroundColor: bookingType === 'guest' ? '#007bff' : '#f8f9fa',
              color: bookingType === 'guest' ? 'white' : '#333',
              border: `2px solid ${bookingType === 'guest' ? '#007bff' : '#ddd'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              flex: 1,
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            🚗 Book as Guest
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
              Quick booking without account
            </div>
          </button>
          
          <button
            onClick={() => setBookingType('login')}
            style={{
              padding: '1.5rem',
              backgroundColor: bookingType === 'login' ? '#28a745' : '#f8f9fa',
              color: bookingType === 'login' ? 'white' : '#333',
              border: `2px solid ${bookingType === 'login' ? '#28a745' : '#ddd'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              flex: 1,
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            🔐 Login & Book
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
              Manage all bookings in one place
            </div>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        {/* Guest Booking Form */}
        {bookingType === 'guest' && (
          <div style={{ 
            border: '2px solid #007bff', 
            padding: '2rem', 
            borderRadius: '12px',
            backgroundColor: '#f0f8ff'
          }}>
            <h4 style={{ margin: '0 0 1.5rem 0', color: '#007bff' }}>
              Guest Information
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={guestInfo.name}
                  onChange={(e) => setGuestInfo({...guestInfo, name: e.target.value})}
                  style={{ 
                    width: '100%',
                    padding: '0.75rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                  style={{ 
                    width: '100%',
                    padding: '0.75rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={guestInfo.phone}
                  onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                  style={{ 
                    width: '100%',
                    padding: '0.75rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleGuestBooking}
              disabled={loading}
              style={{
                marginTop: '1.5rem',
                padding: '1rem 2rem',
                backgroundColor: loading ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}
            >
              {loading ? 'Processing Booking...' : 'Complete Booking as Guest'}
            </button>
            
            <p style={{ 
              fontSize: '0.9rem', 
              color: '#666', 
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              💡 You'll receive a confirmation email with booking details and confirmation number
            </p>
          </div>
        )}

        {/* User Booking Option */}
        {bookingType === 'login' && (
          <div style={{ 
            border: '2px solid #28a745', 
            padding: '2rem', 
            borderRadius: '12px',
            backgroundColor: '#f0fff4',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#28a745' }}>
              Login to Complete Booking
            </h4>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>
              Existing users can login to manage all bookings in one place, 
              view booking history, and get special member benefits.
            </p>
            
            <button
              onClick={handleUserBooking}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}
            >
              Login & Complete Booking
            </button>

            <p style={{ 
              fontSize: '0.9rem', 
              color: '#666', 
              marginTop: '1rem'
            }}>
              Don't have an account?{' '}
              <Link 
                to="/register" 
                style={{ color: '#007bff', textDecoration: 'none' }}
              >
                Sign up here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;