export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  CREATE: '/create',
  PREVIEW: '/preview',
  MESSAGE: '/message',
  TEMPLATES: '/templates',
} as const;

export const APP_CONFIG = {
  NAME: 'MessageApp',
  DESCRIPTION: 'Create beautiful messages',
  MAX_MESSAGE_LENGTH: 1000,
} as const;
