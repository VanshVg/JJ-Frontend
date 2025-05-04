import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { IRoutes } from "./types/index.ts";
import { Suspense } from "react";

createRoot(document.getElementById("root")!).render(<App />);
