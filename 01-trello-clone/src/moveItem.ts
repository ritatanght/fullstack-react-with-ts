export const moveItem = <T>(array: T[], from: number, to: number) => {
  const startIndex = to < 0 ? array.length + to : to;
  // remove the item with the 'from' index and store it in 'item'
  const item = array.splice(from, 1)[0];
  array.splice(startIndex, 0, item);
  return array;
};
