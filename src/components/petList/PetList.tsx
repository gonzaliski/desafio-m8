import { PetCard } from "../petCard/petCard"
import { getMyPets } from "../../lib/api"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useReportedPets, useToken, useUserData } from "../../hooks"
import { MyReportsContainer } from "./style"
import { DisabledSubTitle } from "../../ui/texts"

export function PetList(){
    const param = useParams()
    const [userData,setUserData] = useUserData()
    const [token,setToken] = useToken()
    const [reportedPets,setReportedPets] = useReportedPets()
    async function fetchReportedPets(){
        let res = await getMyPets(userData.id, token)
        setReportedPets(res)
    }
    useEffect(()=>{
        console.log("params cambio a myreports");
        
        fetchReportedPets()
    },[param])
    return (
            <MyReportsContainer>
            <div className="pets-container">
             <h2>Mis mascotas reportadas</h2>   
                {
                (reportedPets.length > 0) ? 
                    reportedPets.map((pet)=>(
                        <PetCard key={pet.id} source={pet.imageURL} name={pet.name} locationName={pet.locationName}/>
                        ))
                        :
                    <DisabledSubTitle>No has reportado mascotas</DisabledSubTitle>
                    }
            </div>
            </MyReportsContainer>
            )


}