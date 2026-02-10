// Template Preview - renders the correct template based on type

import React from 'react';
import { MessageData, TemplateType } from '@/features/messages/types/message.types';
import { LoveTemplate } from '@/features/templates/templates/LoveTemplate';
import { SorryTemplate } from '@/features/templates/templates/SorryTemplate';
import { BirthdayTemplate } from '@/features/templates/templates/BirthdayTemplate';

interface TemplatePreviewProps {
  message: MessageData;
}

const templateComponents: Record<TemplateType, React.ComponentType<{ message: MessageData }>> = {
  love: LoveTemplate,
  sorry: SorryTemplate,
  birthday: BirthdayTemplate,
};

export const TemplatePreview = ({ message }: TemplatePreviewProps) => {
  const Template = templateComponents[message.template];
  return <Template message={message} />;
};
