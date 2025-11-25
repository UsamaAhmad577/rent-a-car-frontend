import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    fetchCar();
  }, [id]);

  useEffect(() => {
    calculatePrice();
  }, [startDate, endDate, car]);

  const fetchCar = async () => {
    try {
      // For now, we'll use mock data since we don't have cars API
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
    } catch (error) {
      console.error('Error fetching car:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        setTotalPrice(days * car.price);
      } else {
        setTotalPrice(0);
      }
    }
  };

  const handleBookNow = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
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
      const response = await fetch('http://localhost:3001/api/bookings', {
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
        alert(`Booking failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="loading">Loading car details...</div>;
  if (!car) return <div className="error">Car not found</div>;

  return (
    <div className="car-details">
      <div className="car-info">
        <img src={car.imageUrl} alt={car.name} className="car-image" />
        <div className="car-details-text">
          <h1>{car.name}</h1>
          <p className="price">${car.price}/day</p>
          <p className="description">{car.description}</p>
        </div>
      </div>

      <div className="booking-form">
        <h2>Book This Car</h2>
        
        <div className="date-selection">
          <div className="date-input">
            <label>Start Date:</label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="date-input">
            <label>End Date:</label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {totalPrice > 0 && (
          <div className="price-summary">
            <h3>Price Summary</h3>
            <p>Total: <strong>${totalPrice}</strong></p>
          </div>
        )}

        <button 
          onClick={handleBookNow}
          disabled={booking || !startDate || !endDate}
          className="book-btn"
        >
          {booking ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default CarDetails;