import React from 'react';
import car from '../assets/car.png';
import hotels from '../assets/hotels.png';
import travel from '../assets/travel.png';
//Sağ taraftaki resimletr
const AdditionalServices = () => {
  const services = [
    { img: car },
    { img: hotels },
    { img: travel },
  ];

  return (
    <div className="w-7/12 ">
      <div>
        {services.map((service, index) => (
          <div key={index} className="flex justify-end">
            <div className="rounded-lg pb-4 flex  justify-end">
              <img
                src={service.img}
                alt={`Service ${index}`}
                className="w-full h-max object-cover rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalServices;
