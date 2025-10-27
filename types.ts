import React from 'react';

export type Page = 'home' | 'booking' | 'support' | 'academic-booking' | 'my-bookings';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: number;
}

export interface Tutor {
    id: number;
    name: string;
    specialty: string;
}

export interface User {
    name: string;
    email: string;
    password?: string;
}

export interface Booking {
  id: string;
  userEmail: string;
  type: 'psychological' | 'academic';
  serviceTitle: string;
  date: string; // YYYY-MM-DD
  time: string;
  tutorName?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
}
