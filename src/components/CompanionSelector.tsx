import React from 'react';
import { Users, Check, Clock, X } from 'lucide-react';
import { usePoolStore } from '../store/usePoolStore';

interface CompanionSelectorProps {
  onSelect: (companions: string[]) => void;
  selectedIds: string[];
  maxSelections: number;
}

const CompanionSelector: React.FC<CompanionSelectorProps> = ({
  onSelect,
  selectedIds,
  maxSelections
}) => {
  const { authorizedCompanions } = usePoolStore();
  const approvedCompanions = authorizedCompanions.filter(c => c.status === 'approved');

  const handleCompanionToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelect(selectedIds.filter(selectedId => selectedId !== id));
    } else if (selectedIds.length < maxSelections) {
      onSelect([...selectedIds, id]);
    }
  };

  const getStatusIcon = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'approved':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <X className="w-5 h-5 text-red-500" />;
    }
  };

  if (approvedCompanions.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay acompañantes autorizados
        </h3>
        <p className="text-gray-600">
          Registrá tus acompañantes y esperá la aprobación de FADIUNC
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Acompañantes Autorizados
        </h3>
        <span className="text-sm text-gray-500">
          {selectedIds.length}/{maxSelections} seleccionados
        </span>
      </div>

      <div className="grid gap-4">
        {approvedCompanions.map((companion) => (
          <div
            key={companion.id}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              selectedIds.includes(companion.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            } cursor-pointer transition-colors`}
            onClick={() => handleCompanionToggle(companion.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{companion.name}</p>
                <p className="text-sm text-gray-500">
                  DNI: {companion.dni} • {companion.age} años
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(companion.status)}
              <input
                type="checkbox"
                checked={selectedIds.includes(companion.id)}
                onChange={() => {}}
                className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanionSelector;