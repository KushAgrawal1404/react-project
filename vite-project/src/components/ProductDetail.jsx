import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useProductDetail from '../hooks/useProductDetail';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import '../ProductDetail.css';

/**
 * ProductDetail component displays the details of a single product.
 * It fetches the product data based on the ID from the URL and allows
 * the user to add the product to the cart.
 */
function ProductDetail({ onAddToCart }) {
  // Get the product ID from the URL parameters.
  const { id } = useParams();
  // Fetch product details using a custom hook.
  const { product, loading, error } = useProductDetail(id);
  // Get the dispatch function to send actions to the Redux store.
  const dispatch = useDispatch();

  // Display a loading message while the product data is being fetched.
  if (loading) return <div>Loading product...</div>;
  // Display a styled error message if fetching fails.
  if (error) {
    return (
      <div className="product-not-found-container">
        <div className="product-not-found-content">
          <h1 className="product-not-found-title">Oops!</h1>
          <h2 className="product-not-found-subtitle">An Error Occurred</h2>
          <p className="product-not-found-message">
            We had trouble loading the product. Please try again later.
          </p>
          <p className="product-not-found-suggestion product-error-details">
            Error details: {error.toString()}
          </p>
          <Link to="/" className="product-not-found-link">
            &larr; Back to All Products
          </Link>
        </div>
      </div>
    );
  }

  // Display a styled message if the product is not found.
  if (!product) {
    return (
      <div className="product-not-found-container">
        <div className="product-not-found-content">
          <h1 className="product-not-found-title">Oops!</h1>
          <h2 className="product-not-found-subtitle">Product Not Found</h2>
          <p className="product-not-found-message">
            Sorry, we couldn't find a product with the ID{' '}
            <code className="product-not-found-id">{id}</code>.
          </p>
          <p className="product-not-found-suggestion">
            Maybe try searching for a different product?
          </p>
          <Link to="/" className="product-not-found-link">
            &larr; Back to All Products
          </Link>
        </div>
      </div>
    );
  }

  /**
   * Handles adding the current product to the shopping cart.
   * It dispatches the `addItem` action with the product's details.
   */
  const handleAdd = () => {
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    }));

    // If an onAddToCart callback is provided, call it to show a notification.
    if (onAddToCart) {
      onAddToCart(`Added "${product.title}" to cart!`);
    }
  };

  return (
    <div className="product-detail">
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="product-price">${product.price}</p>
      {/* Button to add the product to the cart */}
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}


export default ProductDetail; 