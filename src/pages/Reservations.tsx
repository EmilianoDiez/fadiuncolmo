import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ReservationCalendar from '../components/ReservationCalendar';
import ReservationList from '../components/ReservationList';
import ReservationForm from '../components/ReservationForm';
import PricingDisplay from '../components/pricing/PricingDisplay';

const Reservations = () => {
  const { user, isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.status === 'pending') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-yellow-900 mb-2">
            Registro Pendiente de Aprobación
          </h2>
          <p className="text-yellow-700">
            Tu registro está siendo revisado por FADIUNC. Una vez aprobado, podrás realizar reservas.
          </p>
        </div>
      </div>
    );
  }

  if (user?.status === 'rejected') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-red-900 mb-2">
            Registro Rechazado
          </h2>
          <p className="text-red-700">
            Tu registro ha sido rechazado. Por favor, contactá a FADIUNC para más información.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Reservas</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <ReservationList />
          
          {!showForm ? (
            <>
              <ReservationCalendar />
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Hacer una Reserva
              </button>
            </>
          ) : (
            <ReservationForm
              onSubmit={() => setShowForm(false)}
              onCancel={() => setShowForm(false)}
            />
          )}
        </div>
        
        <div className="space-y-6">
          <PricingDisplay />
        </div>
      </div>
    </div>
  );
};

export default Reservations;