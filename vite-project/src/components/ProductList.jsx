import React, { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductItem from './ProductItem';

/**
 * ProductList component fetches, displays, and filters a list of products.
 * It includes a search bar to filter products by title.
 */
function ProductList({ onAddToCart }) {
  // Fetch products, loading state, and error state from the custom useProducts hook.
  const { products, loading, error } = useProducts();
  // State for the search input value.
  const [search, setSearch] = useState('');

  // Filter the products based on the search input.
  // The search is case-insensitive.
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Display a loading message while products are being fetched.
  if (loading) return <div>Loading products...</div>;
  // Display an error message if the fetch fails.
  if (error) return <div>Error loading products: {error}</div>;

  return (
    <div className="product-list-container">
      {/* Search input to filter products */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="product-list">
        {/* Map over the filtered products and render a ProductItem for each one */}
        {filtered.map(product => (
          <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList; 