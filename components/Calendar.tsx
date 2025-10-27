
import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface CalendarProps {
  bookedDates: Set<string>;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ bookedDates, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const firstDayOfMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), [currentDate]);
  const daysInMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(), [currentDate]);

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const renderDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add blank days for the start of the month
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="border rounded-md border-transparent"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];

      const isPast = date < today;
      const isBooked = bookedDates.has(dateString);
      const isToday = date.getTime() === today.getTime();

      let buttonClasses = "w-full h-12 text-center rounded-md transition-all duration-200 flex items-center justify-center font-semibold ";

      if (isPast || isBooked) {
        buttonClasses += "bg-slate-200 text-slate-400 cursor-not-allowed line-through";
      } else {
        buttonClasses += "bg-white hover:bg-sky-100 hover:shadow-md cursor-pointer text-slate-700";
      }
      
      if (isToday && !isPast && !isBooked) {
        buttonClasses += " ring-2 ring-sky-500 text-sky-600";
      }

      days.push(
        <div key={day} className="p-1">
          <button
            onClick={() => onDateSelect(date)}
            disabled={isPast || isBooked}
            className={buttonClasses}
          >
            {day}
          </button>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
          <ChevronLeftIcon className="h-6 w-6 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
          <ChevronRightIcon className="h-6 w-6 text-slate-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-slate-500 mb-2">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
          <div className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-slate-200 mr-2 border border-slate-300"></span>
              <span>Reservado</span>
          </div>
          <div className="flex items-center">
              <span className="w-4 h-4 rounded-full border-2 border-sky-500 mr-2"></span>
              <span>Hoy</span>
          </div>
      </div>
    </div>
  );
};

export default Calendar;
