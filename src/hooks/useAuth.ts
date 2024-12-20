import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';
import { usePoolStore } from '../store/usePoolStore';

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signIn: async (dni: string) => {
        const { affiliates, authorizedCompanions } = usePoolStore.getState();
        const affiliate = affiliates.find(a => a.dni === dni);
        
        if (!affiliate) {
          return false;
        }

        const userCompanions = authorizedCompanions.filter(c => c.affiliateId === affiliate.id);
        
        const user: User = {
          id: affiliate.id,
          name: affiliate.name,
          dni: affiliate.dni,
          email: affiliate.email,
          phone: affiliate.phone,
          companions: userCompanions.map(c => ({
            id: c.id,
            name: c.name,
            dni: c.dni,
            age: c.age.toString(),
            phone: c.phone
          }))
        };

        set({ user, isAuthenticated: true });
        return true;
      },
      signOut: () => set({ user: null, isAuthenticated: false })
    }),
    {
      name: 'auth-store'
    }
  )
);