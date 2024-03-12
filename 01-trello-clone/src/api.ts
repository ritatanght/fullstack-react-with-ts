import { AppState } from "./AppStateContext";

// accept the current state and send it to the backend
export const save = (payload: AppState) => {
  return fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .catch(console.log);
};

// will load the previously saved data from the backend
export const load = () => {
  return fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/load`).then(
    (response) => response.json() as Promise<AppState>
  );
};
