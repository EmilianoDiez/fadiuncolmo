import React, { useState } from 'react';
import { Check, X, Search, Filter, Users } from 'lucide-react';
import { usePoolStore } from '../../store/usePoolStore';
import { formatDate } from '../../utils/calendar/formatting';

const RegistrationApprovals = () => {
  const { pendingRegistrations, updateRegistrationStatus } = usePoolStore();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredRegistrations = pendingRegistrations.filter(registration => {
    const matchesFilter = filter === 'all' || registration.status === filter;
    const matchesSearch = registration.data.name.toLowerCase().includes(search.toLowerCase()) ||
                         registration.data.dni.includes(search);
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (id: string) => {
    updateRegistrationStatus(id, 'approved');
  };

  const handleReject = (id: string) => {
    updateRegistrationStatus(id, 'rejected');
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Solicitudes de Registro</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o DNI"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendientes</option>
              <option value="approved">Aprobados</option>
              <option value="rejected">Rechazados</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DNI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRegistrations.map((registration) => (
              <tr key={registration.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(registration.registrationDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${registration.type === 'affiliate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    <Users className="w-4 h-4 mr-1" />
                    {registration.type === 'affiliate' ? 'Afiliado' : 'Acompañante'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{registration.data.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{registration.data.dni}</td>
                <td className="px-6 py-4 whitespace-nowrap">{registration.data.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${registration.status === 'approved' ? 'bg-green-100 text-green-800' :
                      registration.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {registration.status === 'approved' ? 'Aprobado' :
                     registration.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(registration.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => handleReject(registration.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationApprovals;