import React, { useEffect, useState } from "react"
import { MainButton } from "../../ui/buttons"
import { LargeTitle, ThinText } from "../../ui/texts";
import css from "./nearPets.css"
import { nearPets } from "../../lib/api";
import { useNearPets } from "../../hooks";
import { PetList } from "../../components/petsList/PetsList";
export function NearPets(){
    const [petsNearUser, setPetsNearUser] = useNearPets()
    const [ubication, setUbication] = useState({lat:null,lng:null})
    console.log(ubication);
    const handleClick = async()=>{
        navigator.geolocation.getCurrentPosition((pos)=>{
            setUbication({
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            })
        })
       
        // navigate("/petsNear", { replace: true });
    } 
    async function fetchPets(){
        setPetsNearUser(await nearPets(ubication))

    }
    useEffect(()=>{
        if(ubication.lat && ubication.lng){
            fetchPets()
        }
        console.log(petsNearUser);
        
    },[ubication])


    return (petsNearUser.length > 0) ?
    (
    <div  className={css["pets-container"]}>
        <LargeTitle>Mascotas perdidas cerca tuyo</LargeTitle>
        <PetList caseNotFound={"No hay mascotas cera de tu ubicación"}/>
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

