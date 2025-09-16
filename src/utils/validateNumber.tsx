export const validateNumber = (val: string, minAllowed: number = 1): string => {
  const num = Number(val);
  if (!val || num < minAllowed) {
    return String(minAllowed);
  }
  return val;
};