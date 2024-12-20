import React from 'react';
import { useForm } from '../../hooks/useForm';
import { AffiliateFormData } from '../../types/registration';
import FormField from '../common/FormField';

interface RegistrationFormProps {
  onSubmit: (data: AffiliateFormData) => void;
  initialData: AffiliateFormData;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, initialData }) => {
  const { formData, errors, handleChange, handleSubmit } = useForm<AffiliateFormData>({
    initialData,
    validationRules: {
      name: (value) => !value.trim() ? 'El nombre es obligatorio' : '',
      email: (value) => {
        if (!value.trim()) return 'El email es obligatorio';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Formato de email inválido';
        return '';
      },
      phone: (value) => {
        if (!value.trim()) return 'El teléfono es obligatorio';
        if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) return 'El teléfono debe tener 10 dígitos';
        return '';
      },
      dni: (value) => {
        if (!value.trim()) return 'El DNI es obligatorio';
        if (!/^\d{7,8}$/.test(value)) return 'DNI inválido (7-8 dígitos)';
        return '';
      }
    },
    onSubmit
  });

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <FormField
        label="Nombre Completo"
        name="name"
        value={formData.name}
        error={errors.name}
        onChange={handleChange}
        placeholder="Ingresá tu nombre completo"
      />

      <FormField
        label="DNI"
        name="dni"
        value={formData.dni}
        error={errors.dni}
        onChange={handleChange}
        placeholder="Ingresá tu DNI"
      />

      <FormField
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
        placeholder="Ingresá tu email"
      />

      <FormField
        label="Teléfono"
        name="phone"
        type="tel"
        value={formData.phone}
        error={errors.phone}
        onChange={handleChange}
        placeholder="Ingresá tu número de teléfono"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Continuar
      </button>
    </form>
  );
};

export default RegistrationForm;