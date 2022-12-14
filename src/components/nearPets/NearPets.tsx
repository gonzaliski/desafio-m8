import React, { Suspense, useEffect, useState } from "react";
import { Loading } from "../../components/loading/Loading";
import { PetList } from "../../components/petsList/PetsList";
import { useUserLocation } from "../../hooks";
import { nearPets } from "../../lib/api";
import { MainButton } from "../../ui/buttons";
import { LargeTitle, ThinText } from "../../ui/texts";
import css from "./nearPets.css";

function NearPets() {
  const [petsNearUser, setPetsNearUser] = useState([] as petData[]);
  const [ubication, setUbication] = useUserLocation();
  const handleClick = async () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUbication({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
    // navigate("/petsNear", { replace: true });
  };
  async function fetchPets() {
    console.log("aa");
    if (ubication.lat && ubication.lng) {
      const petsNearRes = await nearPets(ubication);
      const petsNear = petsNearRes.filter((p) => !p.found);
      setPetsNearUser(petsNear);
    }
  }
  useEffect(() => {
    fetchPets();
  }, [ubication]);

  return petsNearUser.length > 0 ? (
    <div className={css["pets-container"]}>
      <Suspense fallback={<Loading />}>
        <LargeTitle>Mascotas perdidas cerca tuyo</LargeTitle>
        <PetList
          from="near"
          caseNotFound={"No hay mascotas cera de tu ubicación"}
          pets={petsNearUser}
        />
      </Suspense>
    </div>
  ) : (
    <div className={css["container"]}>
      <div className={css["content"]}>
        <LargeTitle>Mascotas perdidas cerca tuyo</LargeTitle>
        <ThinText>
          Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
          conocer tu ubicación.
        </ThinText>
        <MainButton onClick={handleClick}>Dar mi ubicación</MainButton>
      </div>
    </div>
  );
}

export { NearPets as default };
