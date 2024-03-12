import React, { createContext, useReducer, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { findItemIndexById } from "./utils/findItemIndexById";
import { moveItem } from "./moveItem";
import { DragItem } from "./DragItem";
import { save } from "./api";
import { withData } from "./withData";

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: List[];
  draggedItem: DragItem | undefined;
}

export const AppStateProvider = withData(
  ({
    children,
    initialState,
  }: React.PropsWithChildren<{ initialState: AppState }>) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState);
    useEffect(() => {
      save(state);
    }, [state]);
    return (
      <AppStateContext.Provider value={{ state, dispatch }}>
        {children}
      </AppStateContext.Provider>
    );
  }
);

export const useAppState = () => {
  return useContext(AppStateContext);
};

type Action =
  | { type: "ADD_LIST"; payload: string }
  | { type: "ADD_TASK"; payload: { text: string; taskId: string } }
  | { type: "MOVE_LIST"; payload: { dragIndex: number; hoverIndex: number } }
  | { type: "SET_DRAGGED_ITEM"; payload: DragItem | undefined }
  | {
      type: "MOVE_TASK";
      payload: {
        dragIndex: number;
        hoverIndex: number;
        sourceColumn: string;
        targetColumn: string;
      };
    };

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      return { ...state };
    }
    case "ADD_TASK": {
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.taskId
      );
      state.lists[targetLaneIndex].tasks.push({
        id: uuidv4(),
        text: action.payload.text,
      });
      return { ...state };
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;
      const lists = moveItem(state.lists, dragIndex, hoverIndex);
      return { ...state, lists };
    }
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload };
    }
    case "MOVE_TASK": {
      const { dragIndex, hoverIndex, sourceColumn, targetColumn } =
        action.payload;
      const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn);
      const targetLaneIndex = findItemIndexById(state.lists, targetColumn);
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0];
      // insert the task at hoverIndex
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item);

      return { ...state };
    }
    default: {
      return state;
    }
  }
};
