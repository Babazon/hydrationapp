export const getDecimalForFixed = (value: number) => {
  return (value % 1 >= 0.1 ? 1 : 0);
};
