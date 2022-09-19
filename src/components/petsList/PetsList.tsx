import { PetCard } from "../petCard/petCard";
import React, { useState } from "react";
import { useNearPets,useUserPets } from "../../hooks";
import { DisabledSubTitle } from "../../ui/texts";
import css from "./petList.css"
import { ReportInfo } from "../../components/reportInfo/ReportInfo";

export function PetList(props:petListProps) {
  const nearPets = useNearPets()
  const [showReportInfo,setShowReportInfo] = useState(false)
  const [petToReport,setPetToReport] = useState(null)
  const userPets = useUserPets()
    let reportedPets = nearPets
  if(props.from == "user") reportedPets=userPets

  const handleClick= (data)=>{
    setPetToReport(data)
    setShowReportInfo(true)
  }
  const dismount=()=>{
    setShowReportInfo(false)
  }
  return showReportInfo ? 
    (<ReportInfo onClose={dismount} pet={petToReport}/>)
    :
    (
    <div className={css["container"]}>
      {reportedPets.length > 0 ? (
        reportedPets.map((pet) => (
          <PetCard
            id={pet.id}
            key={pet.id}
            source={pet.imageURL}
            name={pet.name}
            locationName={pet.locationName}
            onReportInfo={handleClick}
          />
        ))
      ) : (
        <DisabledSubTitle>{props.caseNotFound}</DisabledSubTitle>
      )}
    </div>
  )
}
