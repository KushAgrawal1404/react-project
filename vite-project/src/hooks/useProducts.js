import { useEffect, useState } from 'react';
import { productsAPI } from '../services/api';

/**
 * A custom hook for fetching a list of all products from our backend.
 */
export default function useProducts() {
  // State to store the list of products.
  const [products, setProducts] = useState([]);
  // State to track the loading status of the API request.
  const [loading, setLoading] = useState(true);
  // State to store any potential errors from the fetch request.
  const [error, setError] = useState(null);

  // useEffect hook to perform the side effect of fetching data when the component mounts.
  useEffect(() => {
    // Set loading to true before starting the fetch.
    setLoading(true);
    setError(null);
    
    // Fetch data from our backend API.
    productsAPI.getAll()
      .then(data => {
        // Update the products state with the received data.
        setProducts(data.data || []);
      })
      // If any error occurs during the fetch, update the error state.
      .catch(e => {
        console.error('Error fetching products:', e);
        setError(e.message);
      })
      // Finally, set loading to false, regardless of success or failure.
      .finally(() => setLoading(false));
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts.

  // Return the products, loading status, and any error.
  return { products, loading, error };
} 