import React, { useState } from 'react';
import { BrainIcon, UserIcon, LockClosedIcon, KeyIcon, CheckCircleIcon, SpinnerIcon } from '../components/Icons';

interface ForgotPasswordPageProps {
  onPasswordReset: (email: string, newPassword: string) => boolean;
  onBackToLogin: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onPasswordReset, onBackToLogin }) => {
  const [step, setStep] = useState<'request' | 'reset' | 'success'>('request');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !email.endsWith('.edu.co')) {
      setError('Por favor, ingresa un correo institucional válido.');
      return;
    }
    
    setIsLoading(true);
    // Simulate async operation
    setTimeout(() => {
        setIsLoading(false);
        // In a real app, we'd send an email here.
        // We'll just move to the next step to simulate the user following a link.
        setStep('reset');
    }, 1000);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    setIsLoading(true);
    // Simulate async operation
    setTimeout(() => {
        const success = onPasswordReset(email, password);
        if (success) {
          setStep('success');
        } else {
          // This case handles if the user does not exist.
          setError('No se encontró una cuenta con ese correo electrónico.');
          setStep('request'); // Send user back to the start
        }
        setIsLoading(false);
    }, 1000);
  };
  
  const renderContent = () => {
    switch (step) {
      case 'request':
        return (
          <>
            <div className="text-center mb-6">
                <KeyIcon className="h-10 w-10 text-slate-500 mx-auto" />
                <h2 className="text-xl font-bold text-slate-800 mt-4">Restablecer Contraseña</h2>
                <p className="text-sm text-slate-500 mt-1">Ingresa tu correo para cambiar tu contraseña.</p>
            </div>
            <form onSubmit={handleRequestSubmit}>
              <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Correo Institucional
                  </label>
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} placeholder="nombre@edu.co"
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition" required />
                  </div>
              </div>
              {error && <p className="text-sm text-red-600 mt-4 text-center">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full mt-6 bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-400 disabled:cursor-wait">
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <SpinnerIcon className="h-5 w-5 mr-2 animate-spin" />
                        Enviando...
                    </span>
                ) : 'Siguiente'}
              </button>
            </form>
          </>
        );
      case 'reset':
        return (
          <>
            <div className="text-center mb-6">
                <LockClosedIcon className="h-10 w-10 text-slate-500 mx-auto" />
                <h2 className="text-xl font-bold text-slate-800 mt-4">Crea una Nueva Contraseña</h2>
                <p className="text-sm text-slate-500 mt-1">Estás actualizando la contraseña para <span className="font-bold">{email}</span>.</p>
            </div>
            <form onSubmit={handleResetSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                            Confirmar Contraseña
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition" required />
                        </div>
                    </div>
                </div>
              {error && <p className="text-sm text-red-600 mt-4 text-center">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full mt-6 bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-400 disabled:cursor-wait">
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <SpinnerIcon className="h-5 w-5 mr-2 animate-spin" />
                        Guardando...
                    </span>
                ) : 'Guardar Contraseña'}
              </button>
            </form>
          </>
        );
      case 'success':
        return (
            <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-800">¡Contraseña Actualizada!</h2>
                <p className="text-slate-600 mt-2">
                    Tu contraseña ha sido cambiada exitosamente.
                </p>
                <button onClick={onBackToLogin} className="w-full mt-6 bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors">
                    Volver a Iniciar Sesión
                </button>
            </div>
        );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="max-w-sm w-full">
        <div className="text-center mb-6">
            <BrainIcon className="h-12 w-12 text-sky-600 mx-auto" />
            <h1 className="text-2xl font-bold text-slate-800 mt-4">FormArte</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            {renderContent()}
        </div>
        {step !== 'success' && (
             <div className="mt-4 text-center">
                <button onClick={onBackToLogin} className="text-sm text-sky-600 hover:underline font-medium">
                    Volver a Iniciar Sesión
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;