export const truncateString = (str: string, frontDigits = 7, endDigits = 5) =>
  str.slice(0, frontDigits) + "..." + str.slice(-endDigits);

export const now = () => Math.floor(Date.now() / 1000);
