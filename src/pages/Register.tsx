import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationSteps from '../components/registration/RegistrationSteps';
import RegistrationForm from '../components/registration/RegistrationForm';
import CompanionRegistration from '../components/registration/CompanionRegistration';
import { useRegistrationFlow } from '../hooks/useRegistrationFlow';

const Register = () => {
  const navigate = useNavigate();
  const { 
    step,
    mainUser,
    handleMainUserSubmit,
    handleCompanionsSubmit,
    handleSkipCompanions 
  } = useRegistrationFlow(navigate);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Registro de Afiliado</h1>
        <h3 className="text-sm text-gray-900 mb-4"> El registro es por única vez y requiere validación por FADIUNC para que puedas generar la reserva. </h3>
        <RegistrationSteps currentStep={step} />
      </div>

      {step === 1 ? (
        <RegistrationForm onSubmit={handleMainUserSubmit} initialData={mainUser} />
      ) : (
        <CompanionRegistration 
          onSubmit={handleCompanionsSubmit}
          onSkip={handleSkipCompanions}
        />
      )}
    </div>
  );
};

export default Register;