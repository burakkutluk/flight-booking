import React from "react";
import { bookFlight } from "../services/flightService";
import { useNavigate } from "react-router";
import { MdFlight } from "react-icons/md";

const FlightCard = ({ flight, search }) => {
  const navigate = useNavigate();

  //Rezervasyon isteği
  const handleBooking = async () => {
    try {
      const userId = "user123";
  
      console.log("Original departureTime:", flight.departureTime);
  
      // Parse the departureTime
      const departureDateTime = new Date(flight.departureTime);
  
      //departureDateTime kontrol
      if (isNaN(departureDateTime)) {
        throw new Error("Invalid departure time format");
      }
  
      // Kalkış saatinin gelecekte olduğundan emin olun
      if (departureDateTime <= new Date()) {
        throw new Error("Departure time must be in the future");
      }
  
      console.log("Parsed departureDateTime:", departureDateTime);
  
      const bookingData = {
        userId,
        flightId: flight.flightId,
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        departureTime: departureDateTime.toISOString(),
        arrivalTime: flight.estimatedLandingTime,
        origin: flight.origin,
        price: flight.price,
      };
  
      console.log("Booking data to be sent:", bookingData);
      const response = await bookFlight(bookingData);
      console.log("Booking response:", response);
      alert("Flight booked successfully!");
      navigate("/my-flights");
    } catch (error) {
      console.error("Booking error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      alert("Failed to book flight. Please try again.");
    }
  };  

  const formatTime = (time24) => {
    // 24 saat formatındaki saati alıp 12 saat AM/PM formatına çevirir.
    const [hour, minute] = time24.split(":");
    const hour12 = hour % 12 || 12; // 0'ı 12'ye çevirir
    const amPm = hour >= 12 ? "PM" : "AM";
    return `${hour12}:${minute} ${amPm}`;
  };

  //Şehir isimleri ilk harf büyük yazma
  function capitalize(str) {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 mx-auto">
      <div className="flex justify-between items-center">
        {/* Uçuş Rotası */}
        <div>
          <h3 className="text-lg font-bold">
            {capitalize(search.from)} - {capitalize(search.to)}
          </h3>
        </div>
      </div>

      {/* Uçuş Detayları */}
      <div className="flex justify-between items-center mt-4">
        {/* Kalkış */}
        <div className="text-left">
          <p className="text-sm text-gray-500">
            <i className="fas fa-plane-departure"></i> Departure
          </p>
          <p className="text-lg font-bold">
            {formatTime(flight.departureTime)}
          </p>
          <p className="text-sm text-gray-600">Airport: {flight.airline}</p>
        </div>

        <div className=" text-gray-500">
          <span className="flex items-center ml-12">
            <MdFlight
              size={20}
              className="text-purple-600"
              style={{ transform: "rotate(90deg)" }}
            />
          </span>
          <p>1h 10m (Nonstop)</p>
        </div>

        {/* Varış */}
        <div className="text-right">
          <p className="text-sm text-gray-500">
            <i className="fas fa-plane-arrival"></i> Arrival
          </p>
          <p className="text-lg font-bold">
          {formatTime(flight.arrivalTime)}
          </p>
          <p className="text-sm text-gray-600">Airport: {flight.origin}</p>
        </div>
      </div>

      {/* Fiyat */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-purple-600 font-bold text-xl">
            Price: ${flight.price}
          </p>
        </div>

        {/* Rezervasyon Butonu */}
        <button
          onClick={handleBooking}
          className="bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
        >
          Book Flight
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
