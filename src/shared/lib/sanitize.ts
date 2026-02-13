import DOMPurify from 'dompurify';

/**
 * Sanitize user-provided text content.
 * Strips all HTML tags by default (plain text only).
 */
export function sanitizeText(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitize user-provided rich content.
 * Allows basic formatting tags only.
 */
export function sanitizeRichText(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
    ALLOWED_ATTR: [],
  });
}
