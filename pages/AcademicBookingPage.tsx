import React, { useState, useMemo } from 'react';
import { Page, Service, Tutor, Booking } from '../types';
import Calendar from '../components/Calendar';
import TimeSlotPicker from '../components/TimeSlotPicker';
import PaymentModal from '../components/PaymentModal';
import { UsersIcon, CheckCircleIcon } from '../components/Icons';

// Mock data
const mockTutors: Tutor[] = [
    { id: 1, name: 'Valentina Acevedo', specialty: 'Ciencias Exactas' },
    { id: 2, name: 'Cristian Portilla', specialty: 'Humanidades y Redacción' },
    { id: 3, name: 'Paula Salcedo', specialty: 'Proyectos y Exposiciones' },
    { id: 4, name: 'Jhojan Valdivieso', specialty: 'Programación y Tecnología' },
];

const academicAvailableTimes = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00'
];

interface AcademicBookingPageProps {
  service: Service | null;
  navigateTo: (page: Page) => void;
  onAddBooking: (booking: Omit<Booking, 'id' | 'userEmail'>) => void;
  allBookings: Booking[];
}

const AcademicBookingPage: React.FC<AcademicBookingPageProps> = ({ service, navigateTo, onAddBooking, allBookings }) => {
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(mockTutors[0]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const bookedSlots = useMemo(() => {
    const slots = new Set<string>();
    allBookings.forEach(booking => {
        if (booking.status === 'upcoming') {
            slots.add(`${booking.date}-${booking.time}`);
        }
    });
    return slots;
  }, [allBookings]);
  
  // For the calendar, we might not want to show it as "fully booked" if just one academic slot is taken.
  // This can be enhanced later. For now, we pass an empty set so all days look available initially.
  const calendarBookedDates = useMemo(() => new Set<string>(), []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  }
  
  const handleConfirmAndPay = () => {
    if (selectedTutor && selectedDate && selectedTime) {
      setIsPaymentModalOpen(true);
    }
  }

  const handlePaymentSuccess = () => {
    if (service && selectedDate && selectedTime) {
        onAddBooking({
            type: 'academic',
            serviceTitle: service.title,
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            tutorName: selectedTutor?.name,
            status: 'upcoming',
            price: service.price
        });
    }
    setIsPaymentModalOpen(false);
    setIsBookingComplete(true);
  };

  if (!service) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-700">Servicio no seleccionado</h2>
            <p className="text-slate-500 mt-2">Por favor, regresa y selecciona un servicio de apoyo académico.</p>
            <button onClick={() => navigateTo('support')} className="mt-6 bg-sky-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-700">
                Volver a Servicios
            </button>
        </div>
    );
  }

  if (isBookingComplete) {
      return (
        <div className="text-center max-w-lg mx-auto bg-white p-10 rounded-2xl shadow-lg">
            <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-800">¡Reserva Completada!</h1>
            <p className="text-slate-600 mt-4">
                Tu sesión de <strong>{service.title}</strong> con <strong>{selectedTutor?.name}</strong> ha sido agendada para el <strong>{selectedDate?.toLocaleDateString('es-ES')}</strong> a las <strong>{selectedTime}</strong>.
            </p>
            <p className="mt-2">Puedes ver los detalles en la sección <button onClick={() => navigateTo('my-bookings')} className="font-bold text-sky-600 hover:underline">Mis Reservas</button>.</p>
            <button onClick={() => navigateTo('home')} className="mt-8 bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700">
                Volver al Inicio
            </button>
        </div>
      )
  }

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(service.price);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Agendar Servicio Académico</h1>
        <p className="text-slate-600 text-xl font-medium">{service.title}</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Step 1 & 2: Tutor and Date */}
        <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Select Tutor */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><UsersIcon className="h-6 w-6 mr-3 text-sky-600"/>Paso 1: Elige tu Tutor</h2>
                <div className="flex flex-wrap gap-3">
                    {mockTutors.map(tutor => (
                        <button key={tutor.id} onClick={() => setSelectedTutor(tutor)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                                selectedTutor?.id === tutor.id 
                                ? 'bg-sky-600 text-white border-sky-600'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-sky-500'
                            }`}
                        >
                            {tutor.name}
                        </button>
                    ))}
                </div>
            </div>
            {/* Step 2: Select Date */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                 <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><span className="text-sky-600 mr-3 font-extrabold text-2xl">2</span>Paso 2: Elige la Fecha</h2>
                <Calendar bookedDates={calendarBookedDates} onDateSelect={handleDateSelect} />
            </div>
        </div>

        {/* Step 3 & Confirmation */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Resumen de tu Reserva</h2>
            <div className="space-y-6">
                {selectedDate && (
                    <TimeSlotPicker 
                        selectedTime={selectedTime} 
                        onSelectTime={handleTimeSelect}
                        availableTimes={academicAvailableTimes}
                        selectedDate={selectedDate}
                        bookedSlots={bookedSlots}
                    />
                )}

                <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
                    <p><strong>Servicio:</strong> {service.title}</p>
                    <p><strong>Tutor:</strong> {selectedTutor?.name || 'No seleccionado'}</p>
                    <p><strong>Fecha:</strong> {selectedDate?.toLocaleDateString('es-ES') || 'No seleccionada'}</p>
                    <p><strong>Hora:</strong> {selectedTime || 'No seleccionada'}</p>
                </div>

                <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-800">Total</span>
                        <span className="text-2xl font-extrabold text-sky-600">{formattedPrice}</span>
                    </div>
                </div>

                <button
                    onClick={handleConfirmAndPay}
                    disabled={!selectedTutor || !selectedDate || !selectedTime}
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    Confirmar y Pagar
                </button>
            </div>
        </div>
      </div>
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handlePaymentSuccess}
        bookingDetails={{ service, date: selectedDate, time: selectedTime }}
      />
    </div>
  );
};

export default AcademicBookingPage;