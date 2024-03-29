import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App.tsx";
import "./index.css";
import { AppStateProvider } from "./AppStateContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <DndProvider backend={HTML5Backend}>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </DndProvider>
);
