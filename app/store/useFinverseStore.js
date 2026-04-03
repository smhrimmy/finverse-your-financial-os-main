import { create } from 'zustand';
import { personas } from '../data/personas';

export const useFinverseStore = create((set) => ({
  activePersona: personas[0], // Default to Salaried
  
  // Set the active persona and load their specific mock data
  setActivePersona: (personaId) => {
    const selected = personas.find(p => p.id === personaId);
    if (selected) {
      set({ activePersona: selected });
    }
  },

  // Future API Integration State
  // userData: null,
  // transactions: [],
  // portfolio: [],
  // loans: [],
  // insurance: [],
}));
