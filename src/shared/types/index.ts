export type { MessageData } from "./message";
export type { TemplateType } from "./template";
// src/shared/types/index.ts
export interface MessageFormData {
  sender: string;
  receiver: string;
  message: string;
  options: Record<string, any>;
}