export const currentDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString();
};
