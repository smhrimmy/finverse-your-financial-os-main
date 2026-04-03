import { create } from 'zustand';
import { type PersonaType, type PersonaData, personas } from '@/data/personas';

interface FinverseState {
  // Active persona
  activePersona: PersonaType;
  setActivePersona: (persona: PersonaType) => void;

  // Get current persona data
  getPersonaData: () => PersonaData;

  // UI state
  isFabOpen: boolean;
  setFabOpen: (open: boolean) => void;

  // Active screen for nav highlight
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useFinverseStore = create<FinverseState>((set, get) => ({
  activePersona: 'salaried',
  setActivePersona: (persona) => set({ activePersona: persona }),

  getPersonaData: () => personas[get().activePersona],

  isFabOpen: false,
  setFabOpen: (open) => set({ isFabOpen: open }),

  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
