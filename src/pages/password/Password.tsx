import React, { lazy } from "react";
const PasswordForm = lazy(
  () => import("../../components/passwordForm/PasswordForm")
);
export function Password() {
  return (
    <div>
      <PasswordForm />
    </div>
  );
}
