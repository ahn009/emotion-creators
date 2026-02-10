// Shared message type definitions

export type TemplateType = 'love' | 'sorry' | 'birthday' | 'base';

export interface MessageData {
  id: string;
  slug: string;
  template: TemplateType;
  data: {
    sender: string;
    receiver: string;
    message: string;
    aiEnhanced?: boolean;
    musicEnabled?: boolean;
  };
  createdAt: string;
  views: number;
}

export interface MessageFormData {
  sender: string;
  receiver: string;
  message: string;
  options: {
    aiEnhanced?: boolean;
    musicEnabled?: boolean;
  };
}