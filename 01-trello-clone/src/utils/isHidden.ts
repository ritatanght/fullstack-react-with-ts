import { DragItem } from "../DragItem";

/** Calculate if we need to hide the column
 * By compareing the type and id of the currently dragged item with the type and id we pass to it as args
 */
export const isHidden = (
  isPreview: boolean | undefined,
  draggedItem: DragItem | undefined,
  itemType: string,
  id: string
): boolean =>
  Boolean(
    !isPreview &&
      draggedItem &&
      draggedItem.type === itemType &&
      draggedItem.id === id
  );
