import React, { Suspense } from "react";
import { NavBar } from "../navBar/NavBar";
import { Outlet } from "react-router-dom";
import { Loading } from "../loading/Loading";
import css from "./layout.css"
export function Layout() {
  return (
    <div>
      <NavBar></NavBar>
      <Suspense fallback={<Loading />}>
        <div className={css["layout-container"]}>
        <Outlet/>
        </div>
      </Suspense>
    </div>
  );
}
