
"use client";

import { useCart } from '@/context/CartContext';

const ProductClient = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div>

      <img
        src={product.imageUrl}
        alt={product.name}
        loading="eager"
        style={{ width: "100%", borderRadius: "12px" }}
      />

      <h1>{product.name}</h1>

      <button
        onClick={() => addToCart(product)}
        style={{
          padding: "10px 20px",
          background: "#000",
          color: "#fff",
          borderRadius: "8px",
          marginTop: "10px"
        }}
      >
        Add to Cart
      </button>

    </div>
  );
};

export default ProductClient;
