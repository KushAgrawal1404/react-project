import React from 'react';
import { useCartContext } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import '../Checkout.css';

/**
 * Checkout component displays the order summary, shipping address, and payment information.
 * It allows the user to place an order.
 */
const Checkout = () => {
    try {
        const { cart, loading, error, getTotalPrice } = useCartContext();
        const { isAuthenticated } = useAuth();

        // If user is not authenticated, show login prompt
        if (!isAuthenticated) {
            return (
                <div className="checkout-container">
                    <div className="checkout-card">
                        <h1>Please Login</h1>
                        <p>You need to be logged in to proceed to checkout.</p>
                    </div>
                </div>
            );
        }

        // Show loading state
        if (loading) {
            return (
                <div className="checkout-container">
                    <div className="checkout-card">
                        <h1>Loading...</h1>
                    </div>
                </div>
            );
        }

        // Show error state
        if (error) {
            return (
                <div className="checkout-container">
                    <div className="checkout-card">
                        <h1>Error</h1>
                        <p>{error}</p>
                    </div>
                </div>
            );
        }

        // Calculate the total price of items in the cart.
        const total = getTotalPrice();

        // Filter out items with null products
        const validItems = cart.items.filter(item => {
            if (!item.product) {
                return false;
            }
            return true;
        });

        // Dummy shipping address for display purposes.
        // In a real application, this would likely come from user input or a user profile.
        const shippingAddress = {
            name: 'Kushagra Agrawal',
            address: '123-H Sector 25',
            city: 'Noida',
            state: 'Uttar Pradesh',
            zip: '200334',
            country: 'India',
        };

        /**
         * Handles the "Place Order" button click.
         * In a real app, this would trigger an API call to the backend.
         */
        const handlePlaceOrder = () => {
            // Handle order placement logic, e.g., send to a server
            alert('Thank you for your order!');
            // Here you would typically redirect to a confirmation page or clear the cart.
        };

        return (
            <div className="checkout-container">
                <div className="checkout-card">
                    <h1>Checkout</h1>

                    {/* Section for displaying order details */}
                    <div className="order-details">
                        <h2>Order Details</h2>
                        {validItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <>
                                <ul>
                                    {/* Map through cart items and display them */}
                                    {validItems.map(item => (
                                        <li key={item.product._id} className="checkout-item">
                                            <div className="checkout-item-info">
                                                <img src={item.product.image} alt={item.product.name} />
                                                <span>{item.product.name} (x{item.quantity})</span>
                                            </div>
                                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                {/* Display the total order amount */}
                                <div className="order-total">
                                    <strong>Total: ${total.toFixed(2)}</strong>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Section for displaying shipping address */}
                    <div className="address-section">
                        <h2>Shipping Address</h2>
                        <div className="address-info">
                            <p><strong>{shippingAddress.name}</strong></p>
                            <p>{shippingAddress.address}</p>
                            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
                            <p>{shippingAddress.country}</p>
                        </div>
                    </div>

                    {/* Section for displaying payment information */}
                    <div className="payment-section">
                        <h2>Payment Information</h2>
                        {/* This is a placeholder for payment details */}
                        <p>Payment Mode: Cash</p>
                    </div>

                    {/* Button to place the order */}
                    <button
                        onClick={handlePlaceOrder}
                        className="submit-btn"
                        disabled={validItems.length === 0}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="checkout-container">
                <div className="checkout-card">
                    <h1>Error Loading Checkout</h1>
                    <p>Something went wrong while loading the checkout page.</p>
                    <p>Error: {error.message}</p>
                </div>
            </div>
        );
    }
};

export default Checkout;