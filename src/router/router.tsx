import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/home/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/search/:query" element={null} />
        <Route path="/item/:id" element={null} />
      </Route>
    </Routes>
    
  );
}

export { AppRoutes };
