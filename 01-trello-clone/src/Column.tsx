import { ColumnContainer, ColumnTitle } from "../styles";
import AddNewItem from "./AddNewItem";
import Card from "./Card";
import { useAppState } from "./AppStateContext";
import { useItemDrag } from "./useItemDrag";
import isValidProp from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
interface ColumnProps {
  text: string;
  index: number;
  id: string;
}

const Column = ({ text, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  // pass an obj that will represent the draged item
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

  // attach the drag function to the draggable portion of the DOM
  return (
    <ColumnContainer ref={drag}>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <StyleSheetManager
        shouldForwardProp={(dark: string) => isValidProp(dark)}
      >
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
