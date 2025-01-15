import { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "./cards"; // Assuming ProductCard is the correct import path

// URL for the mock API
// const API_URL = "https://jsonbin.io/quick-store/";
const API_URL = "https://mocki.io/v1/6e85833f-b8b7-4a29-baa7-7b35f4fa063a";
// const API_URL = "https://jsonplaceholder.typicode.com/todos";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [batchIndex, setBatchIndex] = useState(0);
  const observer = useRef();

  // Fetch products from the API in batches of 48
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();

      setProducts((prev) => [...prev, ...data]);
      setBatchIndex((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        const start = visibleProducts.length;
        const end = start + 8;

        if (start < products.length) {
          setVisibleProducts((prev) => [
            ...prev,
            ...products.slice(start, end),
          ]);
        } else if (products.length >= 48 * batchIndex) {
          fetchProducts();
        }
      }
    },
    [loading, products, visibleProducts, fetchProducts, batchIndex]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(handleObserver);
    const anchorElement = document.getElementById("scroll-anchor");

    if (anchorElement) {
      observer.current.observe(anchorElement);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [handleObserver]);

  return (
    <div>
      <h1>Product List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {visibleProducts.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {loading && <div>Loading...</div>}
      <div id="scroll-anchor" style={{ height: "1px" }}></div>
    </div>
  );
};

export default Product;
