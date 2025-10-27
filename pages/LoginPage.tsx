import React, { useState } from 'react';
import { BrainIcon, UserIcon, LockClosedIcon, SpinnerIcon } from '../components/Icons';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (email: string, password?: string) => boolean;
  onRegister: (newUser: User) => boolean;
  onForgotPassword: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onRegister, onForgotPassword }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim() || (isRegistering && !name.trim())) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!email.endsWith('.edu.co')) { 
      setError('Por favor, usa un correo institucional válido (ej: @edu.co).');
      return;
    }
    
    setIsLoading(true);

    // Simulate async operation for better UX
    setTimeout(() => {
        if (isRegistering) {
          const success = onRegister({ name, email, password });
          if (!success) {
            setError('Este correo electrónico ya está registrado.');
            setIsLoading(false);
          }
          // On success, the component will unmount, so no need to setLoading(false)
        } else {
          const success = onLogin(email, password);
          if (!success) {
            setError('El correo electrónico o la contraseña son incorrectos.');
            setIsLoading(false);
          }
           // On success, the component will unmount
        }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="text-center mb-6">
            <BrainIcon className="h-12 w-12 text-sky-600 mx-auto" />
            <h1 className="text-2xl font-bold text-slate-800 mt-4">FormArte</h1>
        </div>
        
        <div className="flex border-b border-slate-200 mb-6">
            <button 
              onClick={() => { setIsRegistering(false); setError(''); }}
              className={`w-1/2 py-3 text-sm font-medium transition-colors ${
                !isRegistering ? 'border-b-2 border-sky-600 text-sky-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={() => { setIsRegistering(true); setError(''); }}
              className={`w-1/2 py-3 text-sm font-medium transition-colors ${
                isRegistering ? 'border-b-2 border-sky-600 text-sky-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Registrarse
            </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {isRegistering && (
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Nombre Completo
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre"
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition" required />
                    </div>
                </div>
            )}
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
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                    Contraseña
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition" required />
                </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 mt-4 text-center">{error}</p>}
          
          <button type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-wait"
          >
              {isLoading ? (
                  <span className="flex items-center justify-center">
                      <SpinnerIcon className="h-5 w-5 mr-2 animate-spin" />
                      Procesando...
                  </span>
              ) : (isRegistering ? 'Crear Cuenta' : 'Ingresar')}
          </button>
          {!isRegistering && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm font-medium text-sky-600 hover:underline focus:outline-none"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;