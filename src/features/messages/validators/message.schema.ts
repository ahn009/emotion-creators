// Based on spec.md Section 8.1 - Zod Schemas

import { z } from 'zod';

export const messageSchema = z.object({
  sender: z
    .string()
    .min(1, 'Your name is required')
    .max(50, 'Name must be 50 characters or less'),
  receiver: z
    .string()
    .min(1, "Recipient's name is required")
    .max(50, 'Name must be 50 characters or less'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be 2000 characters or less'),
  options: z.object({
    aiEnhanced: z.boolean().optional(),
    musicEnabled: z.boolean().optional(),
  }).optional(),
});

export type MessageFormValues = z.infer<typeof messageSchema>;
