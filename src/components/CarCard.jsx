function CarCard({ name, price, imageUrl }) { // <-- Accept imageUrl prop
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Add image display */}
      <img 
        src={imageUrl} 
        alt={name}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '10px'
        }}
      />
      <h3>{name}</h3>
      <p>${price} / day</p>
      <button style={{
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Rent Now
      </button>
    </div>
  );
}

export default CarCard;