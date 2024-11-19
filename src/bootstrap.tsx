import React from "react";
import { createRoot } from "react-dom/client";
import loadable from "@loadable/component";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";

const AppDocument = loadable(() => import("./pages/AppDocument"), {
  fallback: <div>Loading...</div>,
});
const DocumentList = loadable(() => import("luminsign/DocumentList"), {
  fallback: <div>Loading...</div>,
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="documents" element={<AppDocument />} />
      <Route path="sign" element={<DocumentList />} />
    </Route>
  )
);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
