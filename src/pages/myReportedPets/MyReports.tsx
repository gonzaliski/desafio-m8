import React, { lazy } from "react";
const UserPets = lazy(() => import("../../components/userPets/UserPets"));

export function MyReports() {
  return (
    <div>
      <UserPets />
    </div>
  );
}
