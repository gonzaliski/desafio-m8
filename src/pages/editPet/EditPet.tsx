import React, { lazy } from "react";
const EditPetForm = lazy(
  () => import("../../components/ediPetForm/EditPetForm")
);
export function EditPet() {
  return <EditPetForm />;
}
