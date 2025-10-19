import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WorkoutContextProvider } from "./context/WorkoutContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutContextProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "2px solid #ff4444",
          },
          success: {
            iconTheme: {
              primary: "#44ff88",
              secondary: "#1a1a1a",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4444",
              secondary: "#1a1a1a",
            },
          },
        }}
      />
    </WorkoutContextProvider>
  </React.StrictMode>
);
