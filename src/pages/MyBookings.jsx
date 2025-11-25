import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '../utils/api';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            // ✅ REPLACED: Use authenticatedRequest for user bookings
            const data = await apiService.authenticatedRequest('/api/bookings/my-bookings');
            setBookings(data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            
            // Handle specific error cases
            if (err.message.includes('401') || err.message.includes('unauthorized')) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
                return;
            }
            
            setError(err.message || 'Failed to load bookings.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading your bookings...</div>;
    
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h1>My Bookings</h1>
            
            {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p>You haven't made any bookings yet.</p>
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
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {bookings.map(booking => (
                        <div key={booking._id} style={{ 
                            border: '1px solid #ddd', 
                            borderRadius: '8px', 
                            padding: '1.5rem',
                            display: 'flex',
                            gap: '1.5rem',
                            alignItems: 'center'
                        }}>
                            <img 
                                src={booking.car?.imageUrl || 'https://via.placeholder.com/150x100?text=No+Image'} 
                                alt={booking.car?.name || 'Car'} 
                                style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{booking.car?.name || 'Unknown Car'}</h3>
                                <p><strong>Dates:</strong> {formatDate(booking.startDate)} to {formatDate(booking.endDate)}</p>
                                <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                                <p><strong>Status:</strong> 
                                    <span style={{ 
                                        color: booking.status === 'confirmed' ? 'green' : 'orange',
                                        marginLeft: '0.5rem',
                                        textTransform: 'capitalize'
                                    }}>
                                        {booking.status || 'pending'}
                                    </span>
                                </p>
                                <p><strong>Booked on:</strong> {formatDate(booking.createdAt)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;