import React, { Suspense, useEffect, useState } from "react"
import { MainButton } from "../../ui/buttons"
import { LargeTitle, ThinText } from "../../ui/texts";
import css from "./nearPets.css"
import { useNearPets, useUserLocation } from "../../hooks";
import { PetList } from "../../components/petsList/PetsList";
import { Loading } from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
export function NearPets(){
    const params = useParams()
    const petsNearUser = useNearPets()
    const [ubication, setUbication] = useUserLocation()
    const handleClick = async()=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
            setUbication({
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            })
        })
       
        // navigate("/petsNear", { replace: true });
    } 


    return (petsNearUser) ?
    (
    <div  className={css["pets-container"]}>
        <Suspense fallback={<Loading/>}>

        <LargeTitle>Mascotas perdidas cerca tuyo</LargeTitle>
        <PetList caseNotFound={"No hay mascotas cera de tu ubicación"}/>
        </Suspense>
        </div>
        )
        :
        (<div className={css["container"]}>
            <div className={css["content"]}>
            <LargeTitle>Mascotas perdidas cerca tuyo</LargeTitle>
            <ThinText>Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</ThinText>
            <MainButton onClick={handleClick}>Dar mi ubicación</MainButton>
            </div>
        </div>)
    
}


