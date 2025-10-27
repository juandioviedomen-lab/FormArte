import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} FormArte. Todos los derechos reservados.</p>
        <p className="text-xs text-slate-400 mt-1">Un espacio seguro para tu crecimiento personal y académico.</p>
      </div>
    </footer>
  );
};

export default Footer;