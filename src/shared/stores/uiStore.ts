// Based on spec.md Section 5.4 - UI State Management

import { create } from 'zustand';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIState {
  isLoading: boolean;
  modals: {
    preview: boolean;
  };
  toast: Toast | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  openPreviewModal: () => void;
  closePreviewModal: () => void;
  showToast: (toast: Toast) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  modals: {
    preview: false,
  },
  toast: null,
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  openPreviewModal: () => set((state) => ({
    modals: { ...state.modals, preview: true }
  })),
  
  closePreviewModal: () => set((state) => ({
    modals: { ...state.modals, preview: false }
  })),
  
  showToast: (toast) => {
    set({ toast });
    setTimeout(() => set({ toast: null }), 4000);
  },
  
  hideToast: () => set({ toast: null }),
}));
