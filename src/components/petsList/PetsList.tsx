import { PetCard } from "../petCard/petCard";
import React, { useEffect, useState } from "react";
import { useToken} from "../../hooks";
import { DisabledSubTitle } from "../../ui/texts";
import css from "./petList.css"
import { ReportInfo } from "../../components/reportInfo/ReportInfo";

export function PetList(props:petListProps) {
  const {pets} = props
  const [token,setToken] = useToken()
  const [showReportInfo,setShowReportInfo] = useState(false)
  const [petToReport,setPetToReport] = useState(null)
  

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
      {(pets.length > 0) ? (
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
  )
}
