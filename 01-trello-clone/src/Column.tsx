import isValidProp from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
import { useDrop } from "react-dnd";
import { useRef } from "react";
import { ColumnContainer, ColumnTitle } from "./styles";
import AddNewItem from "./AddNewItem";
import Card from "./Card";
import { useAppState } from "./AppStateContext";
import { useItemDrag } from "./useItemDrag";
import { DragItem } from "./DragItem";
import { isHidden } from "./utils/isHidden";
interface ColumnProps {
  text: string;
  index: number;
  id: string;
}

const Column = ({ text, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  // pass an obj that will represent the draged item
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });
  const [, drop] = useDrop({
    accept: "COLUMN",
    // the hover cb is triggered whenever the dragged item is above the drop target
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;

      // make sure we aren't hovering above the dragged item
      if (dragIndex === hoverIndex) return;

      dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });
      item.index = hoverIndex;
    },
  });

  // attach the drag and drop function to COLUMN in the DOM
  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      $isHidden={isHidden(state.draggedItem, "COLUMN", id)}
    >
      <StyleSheetManager
        shouldForwardProp={(dark: string) => isValidProp(dark)}
      >
        <ColumnTitle>{text}</ColumnTitle>
        {state.lists[index].tasks.map((task) => (
          <Card text={task.text} key={task.id} />
        ))}
        <AddNewItem
          toggleButtonText="+ Add another task"
          onAdd={(text) =>
            dispatch({ type: "ADD_TASK", payload: { taskId: id, text } })
          }
          dark
        />
      </StyleSheetManager>
    </ColumnContainer>
  );
};

export default Column;
