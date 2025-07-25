import { useEffect, useState } from 'react';

/**
 * A custom hook for fetching a list of all products.
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
    // Fetch data from the dummyJSON API.
    fetch('https://dummyjson.com/products')
      .then(res => {
        // If the response is not ok (e.g., 404 Not Found), throw an error.
        if (!res.ok) throw new Error('Failed to fetch');
        // Otherwise, parse the JSON response.
        return res.json();
      })
      // If the fetch is successful, update the products state with the received data.
      // We default to an empty array if data.products is not available.
      .then(data => setProducts(data.products || []))
      // If any error occurs during the fetch, update the error state.
      .catch(e => setError(e.message))
      // Finally, set loading to false, regardless of success or failure.
      .finally(() => setLoading(false));
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts.

  // Return the products, loading status, and any error.
  return { products, loading, error };
} 