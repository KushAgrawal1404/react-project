import React from 'react';
import { useSelector } from 'react-redux';
import '../Checkout.css';

/**
 * Checkout component displays the order summary, shipping address, and payment information.
 * It allows the user to place an order.
 */
const Checkout = () => {
    // Get cart items from the Redux store.
    const cartItems = useSelector(state => state.cart.items);

    // Calculate the total price of items in the cart.
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        console.log('Order placed!');
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
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <ul>
                                {/* Map through cart items and display them */}
                                {cartItems.map(item => (
                                    <li key={item.id} className="checkout-item">
                                        <div className="checkout-item-info">
                                            <img src={item.thumbnail} alt={item.title} />
                                            <span>{item.title} (x{item.quantity})</span>
                                        </div>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
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
                    disabled={cartItems.length === 0}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;