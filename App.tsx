import React, { useState, useCallback, useEffect } from 'react';
import { Page, Service, Booking } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import SupportPage from './pages/SupportPage';
import AcademicBookingPage from './pages/AcademicBookingPage';
import MyBookingsPage from './pages/MyBookingsPage';

const GUEST_USER_EMAIL = 'guest@formarte.com';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    // Load bookings from localStorage
    try {
      const storedBookings = localStorage.getItem('allBookings');
      const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];
      if (Array.isArray(parsedBookings)) {
        setBookings(parsedBookings);
      }
    } catch (e) {
      console.error("Could not parse bookings from localStorage.", e);
    }
  }, []);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    navigateTo('academic-booking');
  };

  const handleAddBooking = (newBookingData: Omit<Booking, 'id' | 'userEmail'>) => {
    const newBooking: Booking = {
      ...newBookingData,
      id: Date.now().toString(),
      userEmail: GUEST_USER_EMAIL,
    };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('allBookings', JSON.stringify(updatedBookings));
  };

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('allBookings', JSON.stringify(updatedBookings));
  };
  
  const renderPage = () => {
    const userBookings = bookings.filter(b => b.userEmail === GUEST_USER_EMAIL);
    
    switch (currentPage) {
      case 'booking':
        return <BookingPage onAddBooking={handleAddBooking} allBookings={bookings} />;
      case 'support':
        return <SupportPage onSelectService={handleSelectService} />;
      case 'academic-booking':
        return <AcademicBookingPage service={selectedService} navigateTo={navigateTo} onAddBooking={handleAddBooking} allBookings={bookings} />;
      case 'my-bookings':
        return <MyBookingsPage bookings={userBookings} onCancelBooking={handleCancelBooking} />;
      case 'home':
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;