export const useDateFormatter = () => {
  const dateToString = (date?: Date) =>
    computed<string>(() => {
      if (!date) return "-";
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    });

  const ISOToString = (date?: string) =>
    computed<string>(() => {
      if (!date) return "-";
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      return `${day}-${month}-${year}`;
    });

  const ISOToDateInputString = (date?: string) =>
    computed<string>(() => {
      if (!date) return "";
      return date.slice(0, 10);
    });

  return {
    dateToString,
    ISOToString,
    ISOToDateInputString,
  };
};
