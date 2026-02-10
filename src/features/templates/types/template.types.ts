// Based on spec.md Section 6.3 - Template Types

import { TemplateType } from './message';

export type ColorTheme = 'warm' | 'calm' | 'bright';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea';
  placeholder: string;
  required: boolean;
  maxLength?: number;
  minLength?: number;
}

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  icon: string;
  description: string;
  colorTheme: ColorTheme;
  fields: FormField[];
  gradient: string;
}
