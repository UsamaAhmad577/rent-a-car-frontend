import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/bookings/my-bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="loading">Loading your bookings...</div>;

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet.</p>
          <button onClick={() => navigate('/')} className="browse-cars-btn">
            Browse Cars
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <img src={booking.car.imageUrl} alt={booking.car.name} />
              <div className="booking-info">
                <h3>{booking.car.name}</h3>
                <p><strong>Dates:</strong> {formatDate(booking.startDate)} to {formatDate(booking.endDate)}</p>
                <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                <p><strong>Status:</strong> <span className={`status ${booking.status}`}>{booking.status}</span></p>
                <p><strong>Booked on:</strong> {formatDate(booking.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;