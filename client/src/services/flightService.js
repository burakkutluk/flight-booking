import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const getFlights = async (searchParams) => {
  try {    
    // Api url
    const response = await axios.get(`${API_BASE_URL}/flights/search`, {
      params: searchParams
    });
    return response.data;    
  } 
  catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
};

// Rezervasyon post
export const bookFlight = async (bookingData) => {  
  try {
    console.log('Sending booking request:', bookingData);
    const response = await axios.post(`${API_BASE_URL}/bookings/`, bookingData);
    console.log('Booking response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error booking flight:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to book flight');
    }
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};