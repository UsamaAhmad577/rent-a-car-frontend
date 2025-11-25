import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../utils/api'; // ✅ ADD THIS IMPORT

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [cars, setCars] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [newCar, setNewCar] = useState({ name: '', price: '', imageUrl: '' });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  // Load cars when the tab is switched to 'cars'
  useEffect(() => {
    if (activeTab === 'cars' && cars.length === 0 && !isLoading) {
      loadCars(); 
    }
  }, [activeTab]);

  const checkAdminAccess = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    console.log('Admin check - User:', user);
    
    if (!token || !user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    
    if (!user.isAdmin) {
      alert('Admin access required');
      navigate('/');
      return;
    }
    
    await loadStats();
    setIsLoading(false);
  };

  const loadStats = async () => {
    try {
      // ✅ REPLACED: Use authenticatedRequest for admin endpoints
      const data = await apiService.authenticatedRequest('/api/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
      alert('Failed to load stats: ' + error.message);
    }
  };

  const loadCars = async () => {
    try {
      // ✅ REPLACED: Use authenticatedRequest for admin endpoints
      const data = await apiService.authenticatedRequest('/api/admin/cars');
      setCars(data);
    } catch (error) {
      console.error('Error loading cars:', error);
      alert('Failed to load cars: ' + error.message);
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    
    try {
      // ✅ REPLACED: Use authenticatedRequest for POST requests
      const data = await apiService.authenticatedRequest('/api/admin/cars', {
        method: 'POST',
        body: JSON.stringify({
          name: newCar.name,
          price: parseInt(newCar.price, 10),
          imageUrl: newCar.imageUrl
        })
      });

      alert('Car added successfully!');
      setNewCar({ name: '', price: '', imageUrl: '' });
      loadCars(); // Refresh the car list
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Error adding car: ' + error.message);
    }
  };

  if (isLoading) return <div style={{ padding: '2rem' }}>Loading admin dashboard...</div>;
  
  if (!stats) return <div style={{ padding: '2rem' }}>Failed to load dashboard data.</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      
      {/* Navigation Tabs */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => setActiveTab('stats')}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: activeTab === 'stats' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'stats' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Statistics
        </button>
        <button 
          onClick={() => setActiveTab('cars')}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: activeTab === 'cars' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'cars' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Manage Cars
        </button>
        <button 
          onClick={() => setActiveTab('bookings')}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: activeTab === 'bookings' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'bookings' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          View Bookings
        </button>
      </div>

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div>
          <h2>Statistics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '600px' }}>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <h3>Total Users</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.totalUsers}</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <h3>Total Cars</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.totalCars}</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <h3>Total Bookings</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{stats.totalBookings}</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <h3>Total Revenue</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>${stats.totalRevenue}</p>
            </div>
          </div>
        </div>
      )}

      {/* Manage Cars Tab */}
      {activeTab === 'cars' && (
        <div>
          <h2>Manage Cars</h2>
          
          {/* Add Car Form */}
          <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
            <h3>Add New Car</h3>
            <form onSubmit={handleAddCar}>
              <input
                type="text"
                placeholder="Car Name"
                value={newCar.name}
                onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                required
              />
              <input
                type="number"
                placeholder="Price per day"
                value={newCar.price}
                onChange={(e) => setNewCar({...newCar, price: e.target.value})}
                style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                required
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={newCar.imageUrl}
                onChange={(e) => setNewCar({...newCar, imageUrl: e.target.value})}
                style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
              />
              <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Add Car
              </button>
            </form>
          </div>

          {/* Cars List */}
          <div>
            <h3>Current Cars ({cars.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {cars.map(car => (
                <div key={car._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                  <img 
                    src={car.imageUrl} 
                    alt={car.name}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }}
                  />
                  <h4 style={{ margin: '0.5rem 0' }}>{car.name}</h4>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>${car.price} / day</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div>
          <h2>All Bookings</h2>
          <p>Booking management coming soon...</p>
          <p>Total Bookings: {stats.totalBookings}</p>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;