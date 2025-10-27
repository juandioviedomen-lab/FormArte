import React from 'react';
import { Booking } from '../types';
import { BrainIcon, AcademicCapIcon, TrashIcon, CalendarDaysIcon } from '../components/Icons';

interface MyBookingsPageProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

const BookingCard: React.FC<{ booking: Booking; onCancel: () => void; }> = ({ booking, onCancel }) => {
    const isPast = new Date(booking.date) < new Date() && booking.status === 'upcoming';
    const statusText = booking.status === 'cancelled' ? 'Cancelada' : isPast ? 'Completada' : 'Próxima';
    const statusColor = {
        upcoming: 'bg-sky-100 text-sky-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    
    const currentStatusColor = booking.status === 'cancelled' ? statusColor.cancelled : isPast ? statusColor.completed : statusColor.upcoming;

    const formattedDate = new Date(`${booking.date}T00:00:00`).toLocaleDateString('es-ES', {
        weekday: 'long', day: 'numeric', month: 'long'
    });

    return (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col sm:flex-row">
            <div className={`flex-shrink-0 w-full sm:w-24 flex items-center justify-center p-4 ${booking.type === 'psychological' ? 'bg-sky-50' : 'bg-amber-50'}`}>
                {booking.type === 'psychological' 
                    ? <BrainIcon className="h-10 w-10 text-sky-600" />
                    : <AcademicCapIcon className="h-10 w-10 text-amber-600" />
                }
            </div>
            <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold text-slate-500">{booking.type === 'psychological' ? 'Apoyo Psicológico' : 'Apoyo Académico'}</p>
                        <h3 className="text-lg font-bold text-slate-800">{booking.serviceTitle}</h3>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${currentStatusColor}`}>
                        {statusText}
                    </span>
                </div>
                <div className="text-sm text-slate-600 mt-2 space-y-1">
                    <p><strong>Fecha:</strong> {formattedDate} a las {booking.time}</p>
                    {booking.tutorName && <p><strong>Tutor:</strong> {booking.tutorName}</p>}
                </div>
            </div>
            {booking.status === 'upcoming' && !isPast && (
                <div className="flex items-center justify-center p-4 border-t sm:border-t-0 sm:border-l border-slate-200">
                    <button onClick={onCancel} title="Cancelar Reserva" className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors">
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

const MyBookingsPage: React.FC<MyBookingsPageProps> = ({ bookings, onCancelBooking }) => {
  const sortedBookings = [...bookings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const upcomingBookings = sortedBookings.filter(b => b.status === 'upcoming' && new Date(b.date) >= new Date());
  const pastBookings = sortedBookings.filter(b => b.status !== 'upcoming' || new Date(b.date) < new Date());

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Mis Reservas</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Aquí puedes ver el historial de todas tus sesiones y tutorías agendadas.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg border border-slate-200">
            <CalendarDaysIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-700">Aún no tienes reservas</h2>
            <p className="text-slate-500 mt-2">Parece que no has agendado ninguna sesión. ¡Anímate a reservar tu primer apoyo!</p>
        </div>
      ) : (
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Próximas Sesiones</h2>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map(b => <BookingCard key={b.id} booking={b} onCancel={() => onCancelBooking(b.id)} />)}
              </div>
            ) : (
              <p className="text-slate-500 bg-white p-6 rounded-lg border">No tienes sesiones futuras agendadas.</p>
            )}
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Historial de Sesiones</h2>
             {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map(b => <BookingCard key={b.id} booking={b} onCancel={() => {}} />)}
              </div>
            ) : (
                <p className="text-slate-500 bg-white p-6 rounded-lg border">Tu historial de sesiones está vacío.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;