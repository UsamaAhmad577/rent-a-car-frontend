import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - we'll replace with API call later
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
      },
      {
        _id: "68d696bcdc6d31b8f018071",
        name: "Honda Civic",
        price: 50,
        imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop",
        description: "Sporty and comfortable compact car"
      }
    ];
    
    setCars(mockCars);
    setLoading(false);
  }, []);

  if (loading) return <div className="loading">Loading cars...</div>;

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Rent the Perfect Car</h1>
        <p>Choose from our wide selection of vehicles for your next journey</p>
      </div>

      <div className="cars-grid">
        <h2>Available Cars</h2>
        <div className="cars-list">
          {cars.map(car => (
            <div key={car._id} className="car-card">
              <img src={car.imageUrl} alt={car.name} />
              <div className="car-info">
                <h3>{car.name}</h3>
                <p className="price">${car.price}/day</p>
                <p className="description">{car.description}</p>
                <Link to={`/car/${car._id}`} className="view-details-btn">
                  View Details & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;