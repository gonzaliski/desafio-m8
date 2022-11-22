import React, { lazy } from "react";
const NearPets = lazy(() => import("../../components/nearPets/NearPets"));

export function Home() {
  return (
    <div>
      <NearPets />
    </div>
  );
}
