export const validateNumber = (value: string, min: number, max: number): boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

export const formatInputLabel = (key: string): string => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
};