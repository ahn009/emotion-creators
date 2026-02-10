// Sorry Template - calm, respectful, clean lines

import { MessageData } from '@/shared/types';
import { BaseTemplate } from './BaseTemplate';

interface SorryTemplateProps {
  message: MessageData;
}

export const SorryTemplate = ({ message }: SorryTemplateProps) => {
  return (
    <BaseTemplate 
      message={message}
      gradientFrom="from-sky-500"
      gradientTo="to-cyan-600"
      icon="🌿"
    />
  );
};
