import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PetList } from "../../components/petsList/PetsList";
import { useToken, useUserData } from "../../hooks";
import { getMyPets } from "../../lib/api";
import { LargeTitle } from "../../ui/texts";
import { MyReportsContainer } from "./style";

function UserPets() {
  const param = useParams();
  const userData = useUserData();
  const token = useToken();
  const [reportedPets, setReportedPets] = useState([] as petData[]);
  async function fetchReportedPets() {
    let res = await getMyPets(userData.id, token);
    setReportedPets(res);
  }
  useEffect(() => {
    fetchReportedPets();
  }, [param]);
  return (
    <MyReportsContainer>
      <div className="pets-container">
        <LargeTitle>Mis mascotas reportadas</LargeTitle>
        <PetList
          from="user"
          caseNotFound="No has reportado mascotas"
          pets={reportedPets}
        />
      </div>
    </MyReportsContainer>
  );
}
export { UserPets as default };
