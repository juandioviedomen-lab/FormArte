import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { Service } from '../types';
import { AcademicCapIcon, DocumentTextIcon, PresentationChartBarIcon, BeakerIcon, UsersIcon } from '../components/Icons';

const supportServices: Service[] = [
  {
    title: 'Creación de Carteleras',
    description: 'Te ayudamos a diseñar carteleras creativas y efectivas para tus proyectos escolares.',
    icon: <PresentationChartBarIcon className="h-8 w-8" />,
    price: 10000,
  },
  {
    title: 'Preparación de Exposiciones',
    description: 'Asesoría para estructurar tus presentaciones, mejorar tus habilidades de oratoria y crear apoyos visuales impactantes.',
    icon: <AcademicCapIcon className="h-8 w-8" />,
    price: 5000,
  },
  {
    title: 'Asistencia con Tareas',
    description: 'Apoyo en la resolución de dudas y en la organización de tus tareas para cumplir con todas tus entregas.',
    icon: <DocumentTextIcon className="h-8 w-8" />,
    price: 3500,
  },
  {
    title: 'Elaboración de Maquetas',
    description: 'Guía y soporte en la construcción de maquetas y modelos para proyectos de ciencias, arte y más.',
    icon: <BeakerIcon className="h-8 w-8" />,
    price: 15000,
  },
];

const tutoringService: Service = {
    title: 'Tutoría entre Compañeros',
    description: 'Conecta con estudiantes avanzados para recibir ayuda en materias específicas. Refuerza conocimientos y desarrolla nuevas habilidades.',
    icon: <UsersIcon className="h-8 w-8" />,
    price: 7500
};

interface SupportPageProps {
    onSelectService: (service: Service) => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onSelectService }) => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Acompañamiento Académico</h1>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Descubre los servicios y tutorías que tenemos para potenciar tu éxito académico. Haz clic en un servicio para agendar tu sesión.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center md:text-left">Nuestros Servicios de Apoyo</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportServices.map(service => (
            <ServiceCard key={service.title} service={service} onClick={() => onSelectService(service)} />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
                <div className="bg-sky-100 text-sky-600 rounded-full p-6">
                    <UsersIcon className="h-20 w-20" />
                </div>
            </div>
            <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Tutorías entre Compañeros</h2>
                <p className="text-slate-600 mb-6">
                  {tutoringService.description}
                </p>
                <button 
                  onClick={() => onSelectService(tutoringService)}
                  className="bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Buscar un Tutor
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;