import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "./cards";
import SkeletonCard from "./skeleton";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [renderedProducts, setRenderedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const batchSize = 48;
  const renderBatchSize = 8;

  const observerRef = useRef(null);

  const API_URL = "https://mocki.io/v1/6e85833f-b8b7-4a29-baa7-7b35f4fa063a";

  const fetchProducts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, {
        params: { limit: batchSize, page },
      });
      console.log(response);
      const newProducts = response.data || [];
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setRenderedProducts((prev) => [
          ...prev,
          ...newProducts.slice(0, renderBatchSize),
        ]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreProducts = () => {
    if (renderedProducts.length < products.length) {
      const nextBatch = products.slice(
        renderedProducts.length,
        renderedProducts.length + renderBatchSize
      );
      setRenderedProducts((prev) => [...prev, ...nextBatch]);
    } else if (!isLoading && hasMore) {
      fetchProducts();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [products, renderedProducts, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product Listing</h1>

      {error && <p className="error">{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {isLoading && Array.from({ length: renderBatchSize }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
        {renderedProducts.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more products to load.</p>}

      <div ref={observerRef} style={{ height: "1px" }}></div>
    </div>
  );
};

export default ProductListing;