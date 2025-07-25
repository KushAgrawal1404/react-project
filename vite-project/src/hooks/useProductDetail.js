import { useEffect, useState } from 'react';

/**
 * A custom hook for fetching the details of a single product.
 */
export default function useProductDetail(id) {
  // State to store the product data. Initialized to null.
  const [product, setProduct] = useState(null);
  // State to track the loading status of the API request.
  const [loading, setLoading] = useState(true);
  // State to store any potential errors from the fetch request.
  const [error, setError] = useState(null);

  // useEffect hook to perform the side effect of fetching data.
  // It runs whenever the 'id' dependency changes.
  useEffect(() => {
    // If there's no ID, don't attempt to fetch.
    if (!id) return;
    // Set loading to true before starting the fetch.
    setLoading(true);
    // Fetch data from the dummyJSON API using the provided product ID.
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        // If the response is not ok (e.g., 404 Not Found), throw an error.
        if (!res.ok) throw new Error('Failed to fetch');
        // Otherwise, parse the JSON response.
        return res.json();
      })
      // If the fetch is successful, update the product state with the received data.
      .then(data => setProduct(data))
      // If any error occurs during the fetch, update the error state.
      .catch(e => setError(e.message))
      // Finally, set loading to false, regardless of success or failure.
      .finally(() => setLoading(false));
  }, [id]); // The effect depends on the 'id' and will re-run if it changes.

  // Return the product data, loading status, and any error.
  return { product, loading, error };
} 