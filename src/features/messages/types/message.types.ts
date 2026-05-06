// Based on spec.md Section 6.3 - TypeScript Types

export type TemplateType =
  | 'love'
  | 'sorry'
  | 'birthday'
  | 'gratitude'
  | 'congrats'
  | 'congratulations'
  | 'encouragement'
  | 'motivation'
  | 'missing-you'
  | 'miss-you'
  | 'friendship'
  | 'get-well';

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
  isPremium?: boolean;
  userId?: string | null;
}

export interface FormData {
  sender: string;
  receiver: string;
  message: string;
  options: {
    aiEnhanced?: boolean;
    musicEnabled?: boolean;
  };
}
