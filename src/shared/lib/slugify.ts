// Utility for generating URL-safe slugs

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateUniqueSlug = (base: string, suffix: string): string => {
  return `${slugify(base)}-${suffix}`;
};
