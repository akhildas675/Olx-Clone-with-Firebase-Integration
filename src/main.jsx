import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseContext } from "./store/Context.jsx";
import Context from "./store/Context.jsx";
import { app, auth } from "./Firebase/config.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseContext.Provider value={{ app, auth }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </StrictMode>
);
