// Utility for sharing message links

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const getShareUrl = (slug: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/m/${slug}`;
};

export const getMessageUrl = (slug: string): string => {
  return `/m/${slug}`;
};

export const shareMessage = async (slug: string, title: string): Promise<boolean> => {
  const url = getShareUrl(slug);
  
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        url,
      });
      return true;
    } catch {
      // User cancelled or share failed
      return false;
    }
  }
  
  // Fallback to clipboard
  return copyToClipboard(url);
};
