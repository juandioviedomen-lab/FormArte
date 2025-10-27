import React, { useState, useMemo } from 'react';
import Calendar from '../components/Calendar';
import { CheckCircleIcon } from '../components/Icons';
import TimeSlotPicker from '../components/TimeSlotPicker';
import { Booking } from '../types';

const availableTimes = ['17:00', '18:00', '19:00', '20:00'];

interface BookingPageProps {
    onAddBooking: (booking: Omit<Booking, 'id' | 'userEmail'>) => void;
    allBookings: Booking[];
}

const BookingPage: React.FC<BookingPageProps> = ({ onAddBooking, allBookings }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{date: Date, time: string} | null>(null);

  const bookedSlots = useMemo(() => {
    const slots = new Set<string>();
    allBookings.forEach(booking => {
        if (booking.status === 'upcoming') {
            slots.add(`${booking.date}-${booking.time}`);
        }
    });
    return slots;
  }, [allBookings]);

  const fullyBookedDates = useMemo(() => {
    const dateCounts = new Map<string, number>();
    bookedSlots.forEach(slot => {
        const date = slot.substring(0, 10);
        dateCounts.set(date, (dateCounts.get(date) || 0) + 1);
    });

    const fullDates = new Set<string>();
    dateCounts.forEach((count, date) => {
        // This logic assumes all booking types share the same time slots.
        // A more complex app might need to filter by booking type.
        if (count >= availableTimes.length) {
            fullDates.add(date);
        }
    });
    return fullDates;
  }, [bookedSlots]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setIsBookingConfirmed(false);
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
        onAddBooking({
            type: 'psychological',
            serviceTitle: 'Sesión de Apoyo Psicológico',
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            status: 'upcoming',
            price: 0,
        });
        setIsBookingConfirmed(true);
        setConfirmedBooking({ date: selectedDate, time: selectedTime });
        setSelectedDate(null);
        setSelectedTime(null);
    }
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };


  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Agenda tu Sesión de Apoyo</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Selecciona un día y una hora disponibles para reservar tu cita. El horario de atención es de 5:00 PM a 8:00 PM.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Calendar bookedDates={fullyBookedDates} onDateSelect={handleDateSelect} />
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 min-h-[20rem] flex flex-col justify-center">
          {isBookingConfirmed && confirmedBooking && (
             <div className="text-center transition-opacity duration-500">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">¡Cita Confirmada!</h3>
                <p className="text-slate-600 mt-2">
                    Tu sesión ha sido agendada para el <span className="font-semibold">{formatDate(confirmedBooking.date)}</span> a las <span className="font-semibold">{confirmedBooking.time}</span>.
                </p>
             </div>
          )}
          {!isBookingConfirmed && selectedDate && (
             <div className="space-y-4 transition-opacity duration-500">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 text-center">Fecha Seleccionada</h3>
                  <p className="text-slate-600 my-2 text-center">
                      <span className="font-semibold text-sky-600">{formatDate(selectedDate)}</span>
                  </p>
                </div>
                <TimeSlotPicker 
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                    availableTimes={availableTimes}
                    selectedDate={selectedDate}
                    bookedSlots={bookedSlots}
                />
                <button 
                  onClick={handleConfirmBooking}
                  disabled={!selectedTime}
                  className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors duration-300 shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  Confirmar mi reserva
                </button>
             </div>
          )}
          {!isBookingConfirmed && !selectedDate && (
            <div className="text-center text-slate-500 transition-opacity duration-500">
                <p>Por favor, selecciona una fecha en el calendario para ver los horarios disponibles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;