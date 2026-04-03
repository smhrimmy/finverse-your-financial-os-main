import { create } from 'zustand';
import { bootstrapRemotePersonas, getFallbackPersonas } from '../services/finverseService';

const fallbackPersonas = getFallbackPersonas();
const defaultPersona = fallbackPersonas[0];

export const useFinverseStore = create((set, get) => ({
  personas: fallbackPersonas,
  activePersona: defaultPersona,
  loading: true,
  refreshing: false,
  initialized: false,
  dataSource: 'mock',
  error: null,
  authUser: null,
  isAuthenticated: false,
  actionSheetVisible: false,
  formModalVisible: false,
  formModalType: 'expense',
  formModalMode: 'create',
  formModalRecord: null,
  initializeApp: async (force = false) => {
    if (get().initialized && !force) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const result = await bootstrapRemotePersonas();
      const personas = result.personas?.length ? result.personas : fallbackPersonas;
      const authUser = result.user || null;

      set({
        personas,
        activePersona: personas[0] || defaultPersona,
        loading: false,
        initialized: true,
        dataSource: result.source || 'mock',
        error: null,
        authUser,
        isAuthenticated: Boolean(authUser),
      });
    } catch (error) {
      set({
        personas: fallbackPersonas,
        activePersona: defaultPersona,
        loading: false,
        initialized: true,
        dataSource: 'mock',
        error: error?.message || 'Unable to load your data right now.',
        authUser: null,
        isAuthenticated: false,
      });
    }
  },
  refreshApp: async () => {
    if (!get().isAuthenticated) {
      return;
    }

    set({ refreshing: true, error: null });

    try {
      const result = await bootstrapRemotePersonas();
      const personas = result.personas?.length ? result.personas : fallbackPersonas;
      const currentId = get().activePersona?.id;
      const activePersona = personas.find((item) => item.id === currentId) || personas[0] || defaultPersona;

      set({
        personas,
        activePersona,
        refreshing: false,
        dataSource: result.source || 'mock',
        error: null,
        authUser: result.user || null,
        isAuthenticated: Boolean(result.user),
      });
    } catch (error) {
      set({
        refreshing: false,
        error: error?.message || 'Unable to refresh your data right now.',
      });
    }
  },
  setActivePersona: (personaId) => {
    const selected = get().personas.find((item) => item.id === personaId);

    if (selected) {
      set({ activePersona: selected });
    }
  },
  openActionSheet: () => set({ actionSheetVisible: true }),
  closeActionSheet: () => set({ actionSheetVisible: false }),
  openFormModal: ({ type, mode = 'create', record = null }) =>
    set({
      actionSheetVisible: false,
      formModalVisible: true,
      formModalType: type,
      formModalMode: mode,
      formModalRecord: record,
    }),
  closeFormModal: () =>
    set({
      formModalVisible: false,
      formModalRecord: null,
      formModalMode: 'create',
      formModalType: 'expense',
    }),
  resetAuthState: () =>
    set({
      personas: fallbackPersonas,
      activePersona: defaultPersona,
      dataSource: 'mock',
      authUser: null,
      isAuthenticated: false,
      initialized: true,
      loading: false,
      refreshing: false,
      actionSheetVisible: false,
      formModalVisible: false,
      formModalRecord: null,
      error: null,
    }),
}));
