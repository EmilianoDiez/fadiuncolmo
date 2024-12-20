import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { usePoolStore } from '../store/usePoolStore';
import { AffiliateFormData, CompanionData } from '../types/registration';

export const useRegistrationFlow = (navigate: NavigateFunction) => {
  const [step, setStep] = useState(1);
  const [mainUser, setMainUser] = useState<AffiliateFormData>({
    name: '',
    email: '',
    phone: '',
    dni: ''
  });

  const { addAffiliate } = usePoolStore();

  const handleMainUserSubmit = (userData: AffiliateFormData) => {
    setMainUser(userData);
    setStep(2);
  };

  const handleSkipCompanions = () => {
    addAffiliate(mainUser);
    navigate('/reservations');
  };

  const handleCompanionsSubmit = (companions: CompanionData[]) => {
    addAffiliate(mainUser, companions);
    navigate('/reservations');
  };

  return {
    step,
    mainUser,
    handleMainUserSubmit,
    handleCompanionsSubmit,
    handleSkipCompanions
  };
};