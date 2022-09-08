import React, { Suspense } from "react";
import { NavBar } from "../navBar/NavBar";
import { Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div>
      <NavBar></NavBar>
      <Suspense fallback={<div>Cargando...</div>}>
        <Outlet/>
      </Suspense>
    </div>
  );
}
