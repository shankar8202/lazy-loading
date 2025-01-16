const SkeletonCard = () => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "8px", borderRadius: "4px" }}>
      <div style={{ width: "100%", height: "150px", backgroundColor: "#ccc" }}></div>
      <h3 style={{ backgroundColor: "#ccc", height: "20px", width: "80%", margin: "10px 0" }}></h3>
      <p style={{ backgroundColor: "#ccc", height: "15px", width: "50%" }}></p>
    </div>
  );
};

export default SkeletonCard;