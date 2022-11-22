import React, { lazy } from "react";
const UserDataForm = lazy(
  () => import("../../components/userDataForm/UserDataForm")
);
export function MyData() {
  return (
    <div>
      <UserDataForm />
    </div>
  );
}
