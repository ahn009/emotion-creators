import { describe, it, expect } from 'vitest';
import { sanitizeText, sanitizeRichText } from './sanitize';

describe('sanitizeText', () => {
  it('returns plain text unchanged', () => {
    expect(sanitizeText('Hello World')).toBe('Hello World');
  });

  it('strips HTML tags', () => {
    expect(sanitizeText('<script>alert("xss")</script>')).toBe('');
    expect(sanitizeText('<b>bold</b>')).toBe('bold');
    expect(sanitizeText('Hello <img src=x onerror=alert(1)> World')).toBe('Hello  World');
  });

  it('handles empty strings', () => {
    expect(sanitizeText('')).toBe('');
  });

  it('preserves special characters that are not HTML', () => {
    expect(sanitizeText('Tom & Jerry')).toBe('Tom & Jerry');
    expect(sanitizeText('5 < 10')).toBe('5 &lt; 10');
  });
});

describe('sanitizeRichText', () => {
  it('allows basic formatting tags', () => {
    expect(sanitizeRichText('<b>bold</b>')).toBe('<b>bold</b>');
    expect(sanitizeRichText('<em>italic</em>')).toBe('<em>italic</em>');
    expect(sanitizeRichText('<strong>strong</strong>')).toBe('<strong>strong</strong>');
  });

  it('strips dangerous tags', () => {
    expect(sanitizeRichText('<script>alert("xss")</script>')).toBe('');
    expect(sanitizeRichText('<a href="evil">click</a>')).toBe('click');
  });

  it('strips attributes from allowed tags', () => {
    expect(sanitizeRichText('<b onclick="alert(1)">bold</b>')).toBe('<b>bold</b>');
  });
});
