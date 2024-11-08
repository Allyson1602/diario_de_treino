export const isNumber = (value: unknown) => {
  const valueNumber = Number(value);

  if (isNaN(valueNumber)) {
    return null;
  }

  return valueNumber;
};
