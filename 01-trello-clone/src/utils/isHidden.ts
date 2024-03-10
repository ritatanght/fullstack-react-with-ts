import { DragItem } from "../DragItem";

/** Calculate if we need to hide the column
 * By compareing the type and id of the currently dragged item with the type and id we pass to it as args
 */
export const isHidden = (
  draggedItem: DragItem |undefined,
  itemType: string,
  id: string
): boolean =>
  Boolean(
    draggedItem && draggedItem.type === itemType && draggedItem.id === id
  );
