import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AppRoutes } from "./router/router";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Suspense fallback={null}>
    <RecoilRoot>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RecoilRoot>
  </Suspense>
);
