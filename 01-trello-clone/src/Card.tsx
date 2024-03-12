import { CardContainer } from "./styles";
import { useDrop } from "react-dnd";
import { CardDragItem } from "./DragItem";
import { useAppState } from "./AppStateContext";
import { useItemDrag } from "./hooks/useItemDrag";
import { useRef } from "react";
import { isHidden } from "./utils/isHidden";

interface CardProps {
  text: string;
  index: number;
  id: string;
  columnId: string;
  isPreview?: boolean;
}

const Card = ({ text, index, id, columnId, isPreview }: CardProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "CARD", index, id, columnId, text });
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
      if (item.id === id) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
      });
      item.index = hoverIndex;
      item.columnId = targetColumn;
    },
  });

  drag(drop(ref));

  return (
    <CardContainer
      ref={ref}
      $isHidden={isHidden(isPreview, state.draggedItem, "CARD", id)}
      $isPreview={isPreview}
    >
      {text}
    </CardContainer>
  );
};

export default Card;
