/**
 * Get the full image link by appending it to the base media URL.
 * @param link - The partial image link.
 * @returns The complete image URL.
 */
export const getImageLink = (link: string | undefined) => {
  if (!link) return '';
  return `${import.meta.env.VITE_APP_MEDIA_URL}/${link}`;
};

/**
 * Format a number as currency (USD) and optionally include a currency prefix.
 * @param money - The amount to format as currency.
 * @param showPrefix - Flag to indicate whether to include the currency prefix. Default is true.
 * @returns The formatted currency string.
 */
export const formatMoney = (money: number, showPrefix = true) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  if (showPrefix) {
    return formatter.format(money);
  }
  return new Intl.NumberFormat().format(money);
};

/**
 * Format a product name into a URL-friendly format by converting spaces to hyphens.
 * @param name - The product name.
 * @returns The formatted product link.
 */
export const formatProductLink = (name: string) => {
  return name.toLowerCase().replace(' ', '-');
};

/**
 * Mask parts of an email address to enhance privacy.
 * @param email - The email address to mask.
 * @returns The masked email address.
 */
export const maskEmail = (email: string) => {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    const firstThreeChars = email.substring(0, Math.min(3, atIndex));
    const lastTwoChars = email.substring(atIndex - 2, atIndex);
    return firstThreeChars + '*'.repeat(Math.max(atIndex - 3, 0)) + lastTwoChars + email.substring(atIndex);
  }
  return email;
};

/**
 * Check if the user is accessing the application from a mobile device.
 * @returns True if the user is on a mobile device, otherwise false.
 */
export const isMobile = (): boolean => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Get the value of a Date object as the number of milliseconds since the Unix Epoch.
 * @param date - The Date object.
 * @returns The number of milliseconds since the Unix Epoch.
 */

export const dataTimeToNumber = (date: Date): number => {
  return date.getTime();
};

export const emailValidator = (email: string):boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
