import React from 'react';
import ProductList from './ProductList';

/**
 * Home component serves as the main landing page for the application.
 * It renders the `ProductList` component, which displays all available products.
 */
function Home({ onAddToCart }) {
  // Renders the product list and passes down the add-to-cart handler.
  return <ProductList onAddToCart={onAddToCart} />;
}

export default Home; 