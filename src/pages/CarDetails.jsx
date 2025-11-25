import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import config from '../config'; // ✅ FIX: Assumes config is one directory up (common for pages)
import { apiService } from '../utils/api';
function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);

  // Mock car data - replace with API call later
  useEffect(() => {
    // 💡 Improvement: Replace mock data with an actual fetch call once API is ready
    const mockCars = [
      {
        _id: "68d696bcdc6d31b8f018069",
        name: "Suzuki Alto",
        price: 30,
        imageUrl: "https://images.unsplash.com/photo-1563720223181-1eb0c4b0bd70?w=400&h=250&fit=crop",
        description: "Economy car perfect for city driving"
      },
      {
        _id: "68d696bcdc6d31b8f018070", 
        name: "Toyota Corolla",
        price: 45,
        imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=250&fit=crop",
        description: "Reliable sedan with great fuel efficiency"
      }
    ];
    
    const foundCar = mockCars.find(c => c._id === id) || mockCars[0];
    setCar(foundCar);
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Calculate difference in milliseconds
      const timeDiff = end.getTime() - start.getTime(); 
      
      // Only proceed if end date is after start date
      if (timeDiff >= 0) {
        // Calculate days (1000ms * 60s * 60m * 24h)
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        // Add 1 day to include the end day in the total count (common for car rentals)
        const rentalDays = days + 1; 

        setTotalPrice(rentalDays > 0 ? rentalDays * car.price : 0);
      } else {
        // Handle invalid date range
        setTotalPrice(0); 
      }
    }
  }, [startDate, endDate, car]);

  const handleBookNow = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    // Basic date validation before booking
    if (new Date(endDate) < new Date(startDate)) {
        alert('End date cannot be before the start date.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to book a car');
      navigate('/login');
      return;
    }

    setBooking(true);
    try {
      // ✅ FIX: Use backticks (`) for the template literal URL
      const response = await fetch(`${config.API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          carId: car._id,
          startDate,
          endDate
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Booking confirmed!');
        navigate('/my-bookings');
      } else {
        // Use data.message or data.error from backend response for better feedback
        alert(`Booking failed: ${data.message || data.error || 'Please check your dates.'}`); 
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  if (!car) return <div style={{ padding: '2rem' }}>Loading car details...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/cars" style={{ color: '#007bff', textDecoration: 'none' }}>
        ← Back to Cars
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Car Info */}
        <div>
          <img 
            src={car.imageUrl} 
            alt={car.name} 
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <h1>{car.name}</h1>
          <p style={{ fontSize: '1.5rem', color: '#007bff', fontWeight: 'bold' }}>
            ${car.price}/day
          </p>
          <p>{car.description}</p>
        </div>

        {/* Booking Form */}
        <div>
          <h2>Book This Car</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Start Date:</label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>End Date:</label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              // Ensure end date cannot be before the selected start date
              min={startDate || new Date().toISOString().split('T')[0]} 
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          {totalPrice > 0 && (
            <div style={{ 
              background: '#f8f9fa', 
              padding: '1rem', 
              borderRadius: '4px',
              marginBottom: '1rem'
            }}>
              <h3>Price Summary</h3>
              <p>Total: <strong>${totalPrice}</strong></p>
            </div>
          )}

          <button 
            onClick={handleBookNow}
            disabled={booking || !startDate || !endDate || totalPrice <= 0} // 💡 Added totalPrice check
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              backgroundColor: booking ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: booking ? 'not-allowed' : 'pointer'
            }}
          >
            {booking ? 'Booking...' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;