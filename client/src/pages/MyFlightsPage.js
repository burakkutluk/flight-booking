import React, { useState, useEffect } from 'react';
import { getUserBookings } from '../services/flightService';
import { ArrowRight } from 'lucide-react';

const MyFlightsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //rezervasyon verilerini getirme
    const fetchBookings = async () => {
      try {
        const userId = "user123";
        const userBookings = await getUserBookings(userId);//rezervasyon verilerini çağırma
        setBookings(userBookings);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading your flights...</p>;
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (departureTime, arrivalTime) => {
    const duration = new Date(arrivalTime) - new Date(departureTime);
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Flights</h1>
      {bookings.length === 0 ? (
        <p>You have no booked flights.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-zinc-600 text-2xl">
                    {formatTime(booking.departureTime)} — {formatTime(booking.arrivalTime)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">${booking.price}</span>
                  <p className="text-sm text-gray-500">Main</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Airlane</p>
                  <p className="font-semibold">{booking.airline}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{booking.origin}</span>
                  <ArrowRight size={20} />
                  <span>{booking.destination}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Flight Number: {booking.flightNumber}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium">Comfort+</button>
                <button className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium">First</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFlightsPage;