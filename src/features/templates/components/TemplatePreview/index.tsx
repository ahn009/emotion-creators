// src/features/templates/components/TemplatePreview/index.tsx
import React from 'react';
import { MessageData } from '@/features/messages/types/message.types';
import { LoveTemplate } from '@/features/templates/templates/LoveTemplate';
import { SorryTemplate } from '@/features/templates/templates/SorryTemplate';
import { BirthdayTemplate } from '@/features/templates/templates/BirthdayTemplate';

interface TemplatePreviewProps {
  message: MessageData;
}

const templateComponents: Record<string, React.FC<{ message: MessageData }>> = {
  love: LoveTemplate,
  sorry: SorryTemplate,
  birthday: BirthdayTemplate,
};

export const TemplatePreview = ({ message }: TemplatePreviewProps) => {
  const Template = templateComponents[message.template];

  if (!Template) {
    console.error(`Template not found: ${message.template}`);
    return <div>Template not found: {message.template}</div>;
  }

  return <Template message={message} />;
};
