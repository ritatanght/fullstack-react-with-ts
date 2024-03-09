// the object that will be passed in to react-dnd that describes the item we are currently dragging
export type ColumnDragItem = {
  index: number;
  id: string;
  text: string;
  type: "COLUMN";
};

export type DragItem = ColumnDragItem;
