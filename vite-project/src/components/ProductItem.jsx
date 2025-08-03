import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

/**
 * ProductItem component displays a single product's information
 * and provides an "Add to Cart" button.
 */
function ProductItem({ product, onAddToCart }) {
  const { addToCart } = useCartContext();
  const { isAuthenticated } = useAuth();

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
    <div className="product-item">
      {/* Link to the detailed product page */}
      <Link to={`/product/${product._id}`} className="product-title-link">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p>${product.price}</p>
      {/* Button to add the product to the cart */}
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}

export default ProductItem; 