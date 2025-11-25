import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../utils/api';

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await apiService.get('/api/cars');
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = (price, startDate, endDate) => {
    if (!startDate || !endDate) return price;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days * price;
  };

  const handleBookNow = (car) => {
    if (!selectedDates.startDate || !selectedDates.endDate) {
      alert('Please select start and end dates');
      return;
    }

    const start = new Date(selectedDates.startDate);
    const end = new Date(selectedDates.endDate);
    
    if (start >= end) {
      alert('End date must be after start date');
      return;
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.price;

    // Navigate directly to booking page
    navigate('/booking', {
      state: {
        car: car,
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
        totalPrice: totalPrice
      }
    });
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        fontSize: '1.1rem',
        color: '#666'
      }}>
        Loading available cars...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          Available Cars
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Choose from our premium fleet and book your perfect car for any occasion
        </p>
      </div>

      {/* Date Selection */}
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Select Rental Dates</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Start Date
            </label>
            <input
              type="date"
              value={selectedDates.startDate}
              onChange={(e) => setSelectedDates({...selectedDates, startDate: e.target.value})}
              style={{ 
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              End Date
            </label>
            <input
              type="date"
              value={selectedDates.endDate}
              onChange={(e) => setSelectedDates({...selectedDates, endDate: e.target.value})}
              style={{ 
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          {selectedDates.startDate && selectedDates.endDate && (
            <div style={{ 
              padding: '0.75rem 1rem',
              backgroundColor: '#e7f3ff',
              borderRadius: '4px',
              border: '1px solid #007bff'
            }}>
              <strong>Selected:</strong> {new Date(selectedDates.startDate).toLocaleDateString()} - {new Date(selectedDates.endDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {/* Cars Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {cars.map(car => {
          const totalPrice = calculatePrice(car.price, selectedDates.startDate, selectedDates.endDate);
          const days = selectedDates.startDate && selectedDates.endDate 
            ? Math.ceil((new Date(selectedDates.endDate) - new Date(selectedDates.startDate)) / (1000 * 60 * 60 * 24))
            : 1;

          return (
            <div key={car._id} style={{ 
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <img 
                src={car.imageUrl} 
                alt={car.name}
                style={{ 
                  width: '100%', 
                  height: '200px', 
                  objectFit: 'cover' 
                }}
              />
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: '0', color: '#333' }}>{car.name}</h3>
                  <div style={{ 
                    padding: '0.25rem 0.75rem',
                    backgroundColor: car.isAvailable ? '#28a745' : '#dc3545',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {car.isAvailable ? 'Available' : 'Booked'}
                  </div>
                </div>
                
                <p style={{ 
                  color: '#666', 
                  margin: '0 0 1rem 0',
                  lineHeight: '1.5'
                }}>
                  {car.description || 'Comfortable and reliable vehicle for your journey'}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>
                      ${car.price}<span style={{ fontSize: '0.9rem', color: '#666' }}>/day</span>
                    </div>
                    {selectedDates.startDate && selectedDates.endDate && (
                      <div style={{ fontSize: '0.9rem', color: '#28a745', fontWeight: '500' }}>
                        Total: ${totalPrice} for {days} day{days > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleBookNow(car)}
                  disabled={!car.isAvailable || !selectedDates.startDate || !selectedDates.endDate}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: car.isAvailable && selectedDates.startDate && selectedDates.endDate ? '#007bff' : '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: car.isAvailable && selectedDates.startDate && selectedDates.endDate ? 'pointer' : 'not-allowed',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  {!car.isAvailable ? 'Currently Booked' : 
                   !selectedDates.startDate || !selectedDates.endDate ? 'Select Dates to Book' : 
                   'Book Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {cars.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          color: '#666'
        }}>
          <h3>No cars available at the moment</h3>
          <p>Please check back later for new additions to our fleet.</p>
        </div>
      )}
    </div>
  );
}

export default Cars;