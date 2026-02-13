// src/features/templates/components/TemplatePreview/index.tsx
import React from 'react';
import { MessageData } from '@/features/messages/types/message.types';
import { LoveTemplate } from '@/features/templates/templates/LoveTemplate';
import { SorryTemplate } from '@/features/templates/templates/SorryTemplate';
import { BirthdayTemplate } from '@/features/templates/templates/BirthdayTemplate';
import { GratitudeTemplate } from '@/features/templates/templates/GratitudeTemplate';
import { CongratulationsTemplate } from '@/features/templates/templates/CongratulationsTemplate';
import { EncouragementTemplate } from '@/features/templates/templates/EncouragementTemplate';
import { MissYouTemplate } from '@/features/templates/templates/MissYouTemplate';
import { FriendshipTemplate } from '@/features/templates/templates/FriendshipTemplate';
import { GetWellTemplate } from '@/features/templates/templates/GetWellTemplate';

interface TemplatePreviewProps {
  message: MessageData;
}

const templateComponents: Record<string, React.FC<{ message: MessageData }>> = {
  love: LoveTemplate,
  sorry: SorryTemplate,
  birthday: BirthdayTemplate,
  gratitude: GratitudeTemplate,
  congratulations: CongratulationsTemplate,
  encouragement: EncouragementTemplate,
  'miss-you': MissYouTemplate,
  friendship: FriendshipTemplate,
  'get-well': GetWellTemplate,
};

export const TemplatePreview = ({ message }: TemplatePreviewProps) => {
  const Template = templateComponents[message.template];

  if (!Template) {
    console.error(`Template not found: ${message.template}`);
    return <div>Template not found: {message.template}</div>;
  }

  return <Template message={message} />;
};
