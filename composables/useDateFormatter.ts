export const useDateFormatter = () => {
  return function toDateString(dateTimeString?: string | Date): string {
    if (!dateTimeString) return "-";
    const date =
      typeof dateTimeString === "string"
        ? new Date(dateTimeString)
        : dateTimeString;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
};
