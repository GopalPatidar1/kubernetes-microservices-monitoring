export const sortLargeArray = () => {
  const arr = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000));

  arr.sort((a, b) => a - b);

  return arr[0];
};
