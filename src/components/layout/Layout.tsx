import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loading } from "../loading/Loading";
import css from "./layout.css";
const NavBar = lazy(() => import("../navBar/NavBar"));
export function Layout() {
  return (
    <div>
      <NavBar></NavBar>
      <Suspense fallback={<Loading />}>
        <div className={css["layout-container"]}>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
}
