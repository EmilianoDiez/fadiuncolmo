import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card } from './layout/Card';
import CompanionSelector from './CompanionSelector';
import { usePoolStore } from '../store/usePoolStore';
import { useReservationStore } from '../store/useReservationStore';
import { useAuth } from '../hooks/useAuth';

interface ReservationFormProps {
  onSubmit: (data: { date: string; companionIds: string[] }) => void;
  onCancel: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit, onCancel }) => {
  const { user } = useAuth();
  const { authorizedCompanions } = usePoolStore();
  const { addReservation, hasActiveReservation } = useReservationStore();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    companionIds: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setFormData(prev => ({ ...prev, date: newDate }));
    setErrors({});

    if (user && hasActiveReservation(user.id, newDate)) {
      setErrors({ date: 'Ya tenés una reserva activa para esta fecha' });
    }
  };

  const handleCompanionSelection = (selectedIds: string[]) => {
    setFormData(prev => ({ ...prev, companionIds: selectedIds }));
    if (errors.companions) {
      setErrors(prev => ({ ...prev, companions: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const selectedCompanions = authorizedCompanions.filter(
        companion => formData.companionIds.includes(companion.id)
      );

      const reservation = {
        date: formData.date,
        affiliateId: user.id,
        affiliateName: user.name,
        affiliateDni: user.dni,
        affiliateEmail: user.email,
        companions: selectedCompanions.map(companion => ({
          id: companion.id,
          name: companion.name,
          dni: companion.dni
        }))
      };

      addReservation(reservation);
      onSubmit(formData);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fecha de Reserva</h2>
          <div className="relative">
            <input
              type="date"
              value={formData.date}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full pl-10 pr-4 py-4 text-lg rounded-lg border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          </div>
          {errors.date && (
            <p className="mt-2 text-sm text-red-500">{errors.date}</p>
          )}
        </div>

        <div className="border-t pt-8">
          <CompanionSelector
            onSelect={handleCompanionSelection}
            selectedIds={formData.companionIds}
            maxSelections={3}
          />
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <div className="flex flex-col space-y-4 pt-8">
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className="w-full bg-blue-600 text-white py-4 text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Confirmar Reserva
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-100 text-gray-700 py-4 text-lg font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors shadow-lg"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Card>
  );
};

export default ReservationForm;