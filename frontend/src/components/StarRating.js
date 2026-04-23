const StarRating = ({ rating }) => {
  return (
    <span style={{ color: '#f0a500', fontSize: 14 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span style={{ color: '#555', marginLeft: 4 }}>{rating}</span>
    </span>
  );
};
export default StarRating;