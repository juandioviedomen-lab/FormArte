import React from 'react';

interface TimeSlotPickerProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  availableTimes: string[];
  selectedDate: Date | null;
  bookedSlots: Set<string>;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ 
  selectedTime, 
  onSelectTime, 
  availableTimes,
  selectedDate,
  bookedSlots
}) => {
  const dateString = selectedDate?.toISOString().split('T')[0];

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-700 mb-3">Selecciona una Hora</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {availableTimes.map(time => {
          const isSelected = selectedTime === time;
          const isBooked = dateString ? bookedSlots.has(`${dateString}-${time}`) : false;
          
          return (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              disabled={isBooked}
              className={`p-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isSelected 
                ? 'bg-sky-600 text-white shadow-md' 
                : isBooked
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed line-through'
                : 'bg-slate-100 text-slate-700 hover:bg-sky-100'
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;