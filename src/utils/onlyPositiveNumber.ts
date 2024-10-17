export const onlyPositiveNumber = (numberValue: number | null): number | null => {
  if (numberValue === null) return null;
  if (numberValue <= 0) return 0;

  return numberValue;
};
