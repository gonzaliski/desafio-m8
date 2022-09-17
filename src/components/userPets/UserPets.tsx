import { PetCard } from "../petCard/petCard"
import { getMyPets } from "../../lib/api"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useReportedPets, useToken, useUserData } from "../../hooks"
import { MyReportsContainer } from "./style"
import { DisabledSubTitle } from "../../ui/texts"
import { PetList } from "../../components/petsList/PetsList"

export function UserPets(){
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
                <PetList from="user" caseNotFound="No has reportado mascotas"/>
            </div>
            </MyReportsContainer>
            )


}