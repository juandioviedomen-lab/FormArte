import React, { useState } from 'react';
import { Page } from '../types';
import GameModal from '../components/GameModal';
import { GameControllerIcon } from '../components/Icons';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <>
      <div className="space-y-12">
        <section className="relative text-center bg-sky-600 text-white rounded-3xl p-8 md:p-16 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-16 -right-5 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Tu Bienestar es Nuestra Prioridad
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-sky-100">
              Ofrecemos un espacio confidencial y de apoyo para ayudarte a navegar los desafíos de la vida estudiantil. Agenda una sesión o explora nuestros recursos de apoyo académico.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => navigateTo('booking')}
                className="w-full sm:w-auto bg-white text-sky-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-sky-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Agendar una Sesión
              </button>
              <button
                onClick={() => navigateTo('support')}
                className="w-full sm:w-auto bg-sky-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-sky-400 transform hover:scale-105 transition-all duration-300"
              >
                Ver Apoyo Académico
              </button>
            </div>
          </div>
        </section>

        <section 
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => setIsGameOpen(true)}
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-shrink-0 bg-amber-100 text-amber-600 rounded-full p-5">
                    <GameControllerIcon className="h-12 w-12" />
                </div>
                <div className="text-center md:text-left flex-grow">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">¿Eres nuevo aquí?</h2>
                    <p className="text-slate-600">
                        Realiza nuestro tour interactivo para descubrir cómo podemos ayudarte a tener éxito y sentirte mejor. ¡Es rápido y divertido!
                    </p>
                </div>
                <button className="bg-amber-500 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-600 transition-colors duration-300 transform hover:scale-105 whitespace-nowrap">
                    Comenzar Tour
                </button>
            </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Apoyo Psicológico</h3>
            <p className="text-slate-600">
              Sesiones individuales con profesionales para ayudarte a manejar el estrés, la ansiedad y otros desafíos personales.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Acompañamiento Académico</h3>
            <p className="text-slate-600">
              Recursos y tutorías para fortalecer tus habilidades de estudio y mejorar tu rendimiento académico.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Totalmente Confidencial</h3>
            <p className="text-slate-600">
              Tu privacidad es fundamental. Todas las conversaciones y sesiones son estrictamente confidenciales.
            </p>
          </div>
        </section>
      </div>
      <GameModal 
        isOpen={isGameOpen} 
        onClose={() => setIsGameOpen(false)} 
        navigateTo={navigateTo} 
      />
    </>
  );
};

export default HomePage;