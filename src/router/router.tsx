import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/home/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CheckEmail } from "../pages/checkEmail/checkEmail";
import { Password } from "../pages/password/Password";
import { MyData } from "../pages/myData/MyData";
import { MyReports } from "../pages/myReportedPets/MyReports";
import { ReportPet } from "../pages/reportPet/ReportPet";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/checkEmail" element={<CheckEmail/>} />
        <Route path="/password" element={<Password/>} />
        <Route path="/myData" element={<MyData/>} />
        <Route path="/myReportedPets" element={<MyReports/>} />
        <Route path="/reportPet" element={<ReportPet/>} />
      </Route>
    </Routes>
    
  );
}

export { AppRoutes };
