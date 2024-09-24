import React, { useState } from "react";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";

const FlightSearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("roundTrip");

  // Arama
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ from, to, departDate, returnDate, tripType });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-5 "
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-zinc-600">Book Your Flight</h1>
        <div className="flex rounded-full">
          {/* Tek yön ve gidiş dönüş butoları */}
          <button
            type="button"
            onClick={() => setTripType("roundTrip")}
            className={`px-4 py-2 rounded-r rounded-full ${
              tripType === "roundTrip"
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-purple-700"
            }`}
          >
            Round trip
          </button>
          <button
            type="button"
            onClick={() => setTripType("oneWay")}
            className={`px-4 py-2 rounded-l rounded-full ${
              tripType === "oneWay"
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-purple-700"
            }`}
          >
            One way
          </button>
        </div>
      </div>
      {/* Kullanıcı Girdileri */}
      <div className="grid grid-cols-4 gap-1 mb-4">
        <div className="relative w-full">
          <MdFlightTakeoff className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-700" />
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full h-10 px-10 py-2 border border-gray-300 rounded-r rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="relative w-full">
          <MdFlightLand className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-700" />
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full h-10 px-10 py-2 border border-gray-300 rounded-l rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <input
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          className="w-full h-10 px-3 py-2 border border-gray-300 rounded-r rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        {tripType === "roundTrip" && (
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-l rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        )}
      </div>
      <button
        type="submit"
        className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition duration-300"
      >
        Show flights
      </button>
    </form>
  );
};

export default FlightSearchForm;
