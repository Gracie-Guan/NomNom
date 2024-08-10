import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRestaurant = useCallback(async (restaurantId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:6868/restaurants/${restaurantId}`);
      setRestaurant(response.data);
    } catch (error) {
      setError('Error fetching restaurant data');
      console.error('Error fetching restaurant:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurant, loading, error, fetchRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};