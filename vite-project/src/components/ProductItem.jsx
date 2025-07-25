import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

/**
 * ProductItem component displays a single product's information
 * and provides an "Add to Cart" button.
 */
function ProductItem({ product, onAddToCart }) {
  // Get the dispatch function to send actions to the Redux store.
  const dispatch = useDispatch();

  /**
   * Handles the "Add to Cart" button click.
   * Dispatches the `addItem` action to the Redux store and
   * calls the `onAddToCart` callback if it exists.
   */
  const handleAdd = () => {
    // Dispatch the action to add the item to the cart.
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    }));

    // If an onAddToCart callback is provided, call it with a message.
    if (onAddToCart) {
      onAddToCart(`Added "${product.title}" to cart!`);
    }
  };

  return (
    <div className="product-item">
      {/* Link to the detailed product page */}
      <Link to={`/product/${product.id}`} className="product-title-link">
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>${product.price}</p>
      {/* Button to add the product to the cart */}
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}

// Define the expected prop types for the ProductItem component for type-checking.
ProductItem.propTypes = {
  /**
   * The product object with its details.
   */
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * An optional callback function that is called when the "Add to Cart" button is clicked.
   */
  onAddToCart: PropTypes.func,
};

export default ProductItem; 