import React, { useState, useEffect } from 'react';
import { getFlights } from '../services/flightService';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightList from '../components/FlightList.js';
import AdditionalServices from '../components/AdditionalServices';

const HomePage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({});

  // uçuşları arama
  const searchFlights = async (searchParams) => {
    setLoading(true);//yükleme anı
    setError(null); 
    setSearch(searchParams);
    try {
      const flightData = await getFlights(searchParams);//uçuş verilerini alamak için getFlights çağırılıyor
      setFlights(flightData); //uçuş verilerini güncelleme
      console.log('Fetched flight data:', flightData);
    } catch (err) {
      console.error('Error in searchFlights:', err);
      setError('Failed to fetch flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center ">
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 lg:ml-28">
        <div className="lg:col-span-2">
          <FlightSearchForm onSearch={searchFlights} />
          {loading && <p className="text-center mt-4">Loading flights...</p>}
          {error && <p className="text-center mt-4 text-red-600">{error}</p>}
          {!loading && !error && <FlightList flights={flights} search={search}/>}
        </div>
        <div className='w-full'>
          <AdditionalServices />
        </div>
      </div>
    </div>
  );
};

export default HomePage;