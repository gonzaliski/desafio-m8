import React, { useEffect, useState } from "react"
import { MainButton } from "../../ui/buttons"
import css from "./home.css"
import { useNavigate } from "react-router-dom";
import { nearPets } from "../../lib/api";
import { PetCard } from "../../components/petCard/petCard";
export function Home(){
    const [petsNearUser, setPetsNearUser] = useState([])
    const [ubication, setUbication] = useState({lat:null,lng:null})
    console.log(ubication);
    let navigate = useNavigate()
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
            console.log(petsNearUser.length > 0 ? "hay" : " no hay");
            fetchPets()
        }
        console.log(petsNearUser);
        
    },[ubication])


    return (petsNearUser.length > 0) ?
    (<div  className={css["pets-container"]}>
        <h2>Mascotas perdidas cerca tuyo</h2>
        {petsNearUser.map((pet)=>(
         <PetCard source={pet.imageURL} name={pet.name} locationName={pet.locationName}/>
        ))}
        </div>)
        :
        (<div className={css["container"]}>
            <div className={css["content"]}>

            <h2>Mascotas perdidas cerca tuyo</h2>
            <p>Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</p>
            <MainButton onClick={handleClick}>Dar mi ubicación</MainButton>
            </div>
        </div>)
    
}

