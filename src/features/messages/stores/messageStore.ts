// Based on spec.md Section 5.4 - State Management

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TemplateType, MessageFormData as FormData, MessageData } from '@/shared/types';
import { v4 as uuidv4 } from 'uuid';

interface MessageState {
  currentTemplate: TemplateType;
  formData: FormData;
  generatedSlug: string | null;
  messages: MessageData[];
  
  // Actions
  setTemplate: (template: TemplateType) => void;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  createMessage: () => MessageData;
  getMessage: (slug: string) => MessageData | undefined;
}

const initialFormData: FormData = {
  sender: '',
  receiver: '',
  message: '',
  options: {},
};

const slugify = (sender: string, receiver: string): string => {
  const base = `for-${receiver.toLowerCase().replace(/\s+/g, '-')}`;
  const suffix = uuidv4().slice(0, 8);
  return `${base}-${suffix}`;
};

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      currentTemplate: 'love',
      formData: initialFormData,
      generatedSlug: null,
      messages: [],
      
      setTemplate: (template) => set({ currentTemplate: template }),
      
      setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      
      resetForm: () => set({ 
        formData: initialFormData, 
        generatedSlug: null 
      }),
      
      createMessage: () => {
        const state = get();
        const slug = slugify(state.formData.sender, state.formData.receiver);
        
        const newMessage: MessageData = {
          id: uuidv4(),
          slug,
          template: state.currentTemplate,
          data: {
            sender: state.formData.sender,
            receiver: state.formData.receiver,
            message: state.formData.message,
            ...state.formData.options,
          },
          createdAt: new Date().toISOString(),
          views: 0,
        };
        
        set((state) => ({
          messages: [...state.messages, newMessage],
          generatedSlug: slug,
        }));
        
        return newMessage;
      },
      
      getMessage: (slug) => {
        return get().messages.find((m) => m.slug === slug);
      },
    }),
    {
      name: 'emotion-creator-messages',
    }
  )
);
