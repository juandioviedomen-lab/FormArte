import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(service.price);

  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-100 flex flex-col items-center text-center cursor-pointer"
    >
      <div className="bg-sky-100 text-sky-600 rounded-full p-4 mb-4">
        {service.icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
      <p className="text-slate-600 text-sm flex-grow mb-4">{service.description}</p>
      <div className="mt-auto pt-4 border-t border-slate-200 w-full">
        <span className="text-lg font-bold text-sky-600">{formattedPrice}</span>
      </div>
    </div>
  );
};

export default ServiceCard;