import React, { lazy, useState } from "react";
import { DisabledSubTitle } from "../../ui/texts";
import css from "./petList.css";
const PetCard = lazy(() => import("../petCard/petCard"));
const ReportInfo = lazy(() => import("../../components/reportInfo/ReportInfo"));
export function PetList(props: petListProps) {
  const { pets } = props;
  const [showReportInfo, setShowReportInfo] = useState(false);
  const [petToReport, setPetToReport] = useState(null);

  const handleClick = (data) => {
    setPetToReport(data);
    setShowReportInfo(true);
  };
  const dismount = () => {
    setShowReportInfo(false);
  };

  return showReportInfo ? (
    <ReportInfo onClose={dismount} pet={petToReport} />
  ) : (
    <div className={css["container"]}>
      {pets.length > 0 ? (
        pets.map((pet) => (
          <PetCard
            id={pet.id}
            key={pet.id}
            source={pet.imageURL}
            name={pet.name}
            found={pet.found}
            locationName={pet.locationName}
            onReportInfo={handleClick}
          />
        ))
      ) : (
        <DisabledSubTitle>{props.caseNotFound}</DisabledSubTitle>
      )}
    </div>
  );
}
