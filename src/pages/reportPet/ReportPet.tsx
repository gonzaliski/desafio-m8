import React, { lazy } from "react";
const ReportPetForm = lazy(
  () => import("../../components/reportPetForm/ReportPetForm")
);

export function ReportPet() {
  return (
    <div>
      <ReportPetForm />
    </div>
  );
}
