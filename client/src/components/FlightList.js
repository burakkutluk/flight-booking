import React from "react";
import FlightCard from "./FlightCard";

//Uçuş verilerinin gözüktüğü yer
const FlightList = ({ flights, search}) => {  
  return (
    <div className="mt-8">
      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} search={search}/>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
