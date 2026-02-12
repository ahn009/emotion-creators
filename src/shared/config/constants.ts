export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  CREATE: '/create',
  PREVIEW: '/preview',
  MESSAGE: '/message',
  TEMPLATES: '/templates',
  PROFILE: '/profile',
  MY_MESSAGES: '/my-messages',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  COOKIE_POLICY: '/cookies',
  CONTACT: '/contact',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_EMAIL: '/verify-email',
} as const;

export const APP_CONFIG = {
  NAME: 'MessageApp',
  DESCRIPTION: 'Create beautiful messages',
  MAX_MESSAGE_LENGTH: 1000,
} as const;
