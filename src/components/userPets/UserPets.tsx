import { PetCard } from "../petCard/petCard"
import { getMyPets } from "../../lib/api"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useReportedPets, useToken, useUserData } from "../../hooks"
import { MyReportsContainer } from "./style"
import { DisabledSubTitle, LargeTitle } from "../../ui/texts"
import { PetList } from "../../components/petsList/PetsList"

export function UserPets(){
    const param = useParams()
    const [userData,setUserData] = useUserData()
    const [token,setToken] = useToken()
    const [reportedPets,setReportedPets] = useState([] as petData[])
    async function fetchReportedPets(){
        let res = await getMyPets(userData.id, token)
        setReportedPets(res)
    }
    useEffect(()=>{
        fetchReportedPets()
    },[param])
    return (
            <MyReportsContainer>
            <div className="pets-container">
             <LargeTitle>Mis mascotas reportadas</LargeTitle>   
                <PetList from="user" caseNotFound="No has reportado mascotas" pets={reportedPets}/>
            </div>
            </MyReportsContainer>
            )


}