export const moveItem = <T>(array: T[], from: number, to: number) => {
  const startIndex = to < 0 ? array.length + to : to;
  const newArray = [...array];
  // remove the item with the 'from' index and store it in 'item'
  const item = newArray.splice(from, 1)[0];
  newArray.splice(startIndex, 0, item);
  return newArray;
};
