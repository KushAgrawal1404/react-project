import React, { createContext, useContext, useState, useEffect } from 'react';
// Assuming authAPI is a service that handles HTTP requests to your backend.
import { authAPI } from '../services/api';

// Create a React Context for authentication.
const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // This error ensures that the hook is used within a component tree wrapped by AuthProvider.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthProvider = ({ children }) => {
  // State to hold the current user object. Null if not logged in.
  const [user, setUser] = useState(null);
  // State to track the initial loading process (e.g., checking for an existing session).
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On initial application load, check for user data in the auth service (likely localStorage).
    // This persists the user's session across page refreshes.
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    // Set loading to false once the initial check is complete.
    setLoading(false);
  }, []);


  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { user, token } = response.data;
      
      // Persist token and user data in localStorage for session management.
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update the user state to reflect the logged-in user.
      setUser(user);
      return { success: true };
    } catch (error) {

      return { success: false, error: error.message };
    }
  };


  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      const { user, token } = response.data;
      
      // Persist token and user data to automatically log the user in after registration.
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      return { success: true };
    } catch (error) {
      // Return a failure status with the error message.
      return { success: false, error: error.message };
    }
  };

  /**
   * Logs out the current user by clearing session data and resetting state.
   */
  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  // The value object provided to consuming components.
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user, // A boolean flag for easy authentication checks.
  };

  return (
    // Wrap children components with the Provider, making the `value` object available to them.
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 