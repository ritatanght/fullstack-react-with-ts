import { XYCoord, useDragLayer } from "react-dnd";
import { CustomDragLayerContainer } from "./styles";
import React from "react";
import Column from "./Column";

// use a Column render a preview when dragging
const CustomDragLayer: React.FC = () => {
  // use useDragLayer to obtain isDragging flag and currently dragged item object
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        <Column id={item.id} text={item.text} index={item.index} isPreview />
      </div>
    </CustomDragLayerContainer>
  ) : null;
};

/**
 * Generate styles
 * accepts a currentOffset argument that has the XYCoord type
 * which contains a currently dragged item position
 * We take the x & y fields and generate the vlue for CSS transform property
 */
const getItemStyles = (currentOffset: XYCoord | null): React.CSSProperties => {
  if (!currentOffset) return { display: "none" };

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return { transform, WebkitTransform: transform };
};

export default CustomDragLayer;
