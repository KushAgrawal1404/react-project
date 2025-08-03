import React from 'react';
import { useParams } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import { useCartContext } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import '../ProductDetail.css';

/**
 * ProductDetail component displays detailed information about a specific product.
 * It shows the product image, title, description, price, and an "Add to Cart" button.
 */
function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const { product, loading, error } = useProductDetail(id);
  const { addToCart } = useCartContext();
  const { isAuthenticated } = useAuth();

  // Show loading state while fetching product data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error state if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show message if product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  /**
   * Handles the "Add to Cart" button click.
   * Adds the item to the cart using the backend API.
   */
  const handleAdd = async () => {
    if (!isAuthenticated) {
      if (onAddToCart) {
        onAddToCart('Please login to add items to cart');
      }
      return;
    }

    const success = await addToCart(product._id, 1);
    if (success && onAddToCart) {
      onAddToCart(`Added "${product.name}" to cart!`);
    }
  };

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail; 