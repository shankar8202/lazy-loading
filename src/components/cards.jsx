const ProductCard = ({ product }) => {
  return (
    <div
      style={{  border: "1px solid #ddd", padding: "8px", borderRadius: "4px" }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
