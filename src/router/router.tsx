import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { CheckEmail } from "../pages/checkEmail/checkEmail";
import { EditPet } from "../pages/editPet/EditPet";
import { Home } from "../pages/home/Home";
import { MyData } from "../pages/myData/MyData";
import { MyReports } from "../pages/myReportedPets/MyReports";
import { Password } from "../pages/password/Password";
import { ReportPet } from "../pages/reportPet/ReportPet";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="checkEmail" element={<CheckEmail />} />
        <Route path="password" element={<Password />} />
        <Route path="myData" element={<MyData />} />
        <Route path="myReportedPets" element={<MyReports />} />
        <Route path="reportPet" element={<ReportPet />} />
        <Route path="editPet/:id" element={<EditPet />} />
      </Route>
    </Routes>
  );
}

export { AppRoutes };
