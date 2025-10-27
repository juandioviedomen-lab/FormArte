import React, { useState } from 'react';
import { Page } from '../types';
import { BrainIcon, XIcon, CheckCircleIcon, AcademicCapIcon } from './Icons';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo: (page: Page) => void;
}

type GameStep = {
  title: string;
  scenario: string;
  options: string[];
  feedback: string;
  nextStep: number | null;
  action?: Page;
};

const gameSteps: GameStep[] = [
  {
    title: '¡Bienvenido al Tour Interactivo!',
    scenario: 'Imagina que tienes un examen importante mañana y te sientes abrumado por el estrés. ¿Qué haces?',
    options: ['Intento estudiar, pero no me concentro.', 'Busco ayuda para manejar la ansiedad.'],
    feedback: 'Es normal sentirse así. Reconocer que necesitas ayuda es el primer paso. Nuestra plataforma está aquí para eso.',
    nextStep: 1,
  },
  {
    title: 'Apoyo a tu Medida',
    scenario: '¡Exacto! Ofrecemos apoyo psicológico confidencial. Podrías hablar con un profesional que te dará herramientas para manejar el estrés.',
    options: ['Explorar apoyo psicológico', 'Ver otro escenario'],
    feedback: '¡Excelente elección! Cuidar tu salud mental es clave para el éxito académico.',
    nextStep: 2,
    action: 'booking',
  },
  {
    title: 'Reto Académico',
    scenario: 'Ahora, imagina que tienes que hacer una exposición sobre un tema que no entiendes muy bien. ¿Cuál es tu plan?',
    options: ['Me frustro y lo dejo para última hora.', 'Busco a alguien que me lo explique.'],
    feedback: '¡Pedir ayuda es de inteligentes! No tienes que enfrentarte a los retos académicos solo.',
    nextStep: 3,
  },
  {
    title: 'Conectando Conocimiento',
    scenario: 'Nuestra sección de Acompañamiento Académico te conecta con tutores y te da recursos para tus tareas y exposiciones.',
    options: ['Ver apoyo académico', 'Finalizar tour'],
    feedback: '¡Genial! Invertir en tu aprendizaje siempre es una buena idea.',
    nextStep: null,
    action: 'support',
  },
];

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, navigateTo }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;
  
  const step = gameSteps[currentStep];

  const handleOptionClick = (optionIndex: number) => {
    if (step.action && optionIndex === 0) {
      navigateTo(step.action);
      onClose();
      return;
    }
    
    if (step.nextStep !== null) {
      setCurrentStep(step.nextStep);
    } else {
      onClose();
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  }

  const getIcon = () => {
    if (currentStep < 2) return <BrainIcon className="h-10 w-10 text-sky-500" />;
    if (currentStep >= 2) return <AcademicCapIcon className="h-10 w-10 text-amber-500" />;
    return <CheckCircleIcon className="h-10 w-10 text-green-500" />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative transform scale-100 transition-transform duration-300">
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
          <XIcon className="h-6 w-6" />
        </button>
        
        <div className="text-center">
            <div className="mx-auto bg-slate-100 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                {getIcon()}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{step.title}</h2>
            <p className="text-slate-600 mb-6">{step.scenario}</p>
        </div>

        <div className="space-y-3">
          {step.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className="w-full text-left p-4 rounded-lg border-2 border-slate-200 hover:bg-sky-50 hover:border-sky-500 transition-colors duration-200"
            >
              {option}
            </button>
          ))}
        </div>

        {step.feedback && (
          <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-sm text-green-700">{step.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameModal;