import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./chartSetup";
import { ThemeSwitchProvider } from "./context/themeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ThemeSwitchProvider>
    <App />
  </ThemeSwitchProvider>,
);
