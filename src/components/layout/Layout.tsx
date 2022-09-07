import React from "react";
import { NavBar } from "../navBar/NavBar";
import { Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
}
