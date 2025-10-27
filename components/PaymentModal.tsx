import React, { useState } from 'react';
import { Service } from '../types';
import { XIcon, CreditCardIcon, CheckCircleIcon } from './Icons';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingDetails: {
    service: Service | null;
    date: Date | null;
    time: string | null;
  };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onConfirm, bookingDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  if (!isOpen) return null;

  const { service, date, time } = bookingDetails;
  const price = service?.price || 0;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 2000); // Simulate network delay
  };

  const handleClose = () => {
    if (isPaid) {
        onConfirm();
    }
    setIsPaid(false);
    onClose();
  }

  const formattedDate = date?.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) || 'N/A';
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
          <XIcon className="h-6 w-6" />
        </button>

        {isPaid ? (
            <div className="text-center py-8">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-800">¡Pago Exitoso!</h2>
                <p className="text-slate-600 mt-2">Tu reserva ha sido confirmada.</p>
                <button onClick={handleClose} className="mt-6 w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors">
                    Finalizar
                </button>
            </div>
        ) : (
            <>
                <div className="text-center mb-6">
                    <CreditCardIcon className="h-10 w-10 text-sky-600 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-slate-800">Confirmar y Pagar</h2>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-6 space-y-2 border border-slate-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Servicio:</span>
                        <span className="font-semibold text-slate-800">{service?.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Fecha:</span>
                        <span className="font-semibold text-slate-800">{formattedDate} a las {time}</span>
                    </div>
                    <div className="border-t border-slate-200 my-2"></div>
                    <div className="flex justify-between text-lg">
                        <span className="font-bold text-slate-600">Total:</span>
                        <span className="font-extrabold text-sky-600">{formattedPrice}</span>
                    </div>
                </div>

                <form onSubmit={handlePayment}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Número de Tarjeta</label>
                            <input type="text" placeholder="**** **** **** 1234" className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="text-sm font-medium text-slate-700">Vencimiento</label>
                                <input type="text" placeholder="MM/YY" className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div className="w-1/2">
                                <label className="text-sm font-medium text-slate-700">CVC</label>
                                <input type="text" placeholder="123" className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                            </div>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="mt-6 w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-400 disabled:cursor-wait"
                    >
                        {isProcessing ? 'Procesando...' : `Pagar ${formattedPrice}`}
                    </button>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;