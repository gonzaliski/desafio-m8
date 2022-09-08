import React from "react"
import { BorderButton, MainButton, SecondaryButton } from "../../ui/buttons"
import { MainInput } from "../../ui/inputs"
import defaultImg from "../../assets/default-image.jpg"
import { ReportContainer } from "./style"

export function ReportPet(){
    return (
        <ReportContainer>
        <div className="container">

        <div className="content">

        <div className="title__container">
           {/* <h2>{cs.editMode ? "Editar" : "Reportar"} mascota perdida</h2> */}
        </div>

       <div className="report-container">
         <div className="form-inputs">
           <label className="form-label">Nombre</label>
            <MainInput ></MainInput>
         </div>

         <div className="image-drop__container">
           <img className="report-dropzone__img"src={defaultImg}></img>
           <SecondaryButton >Agregar/modificar foto</SecondaryButton>
           </div>

           <div className="mapbox__container">
             {/* <div className="mapbox-map" style="width:-webkit-fill-available; height:200px;"></div> */}
             <div className="input-container">
             <label className="form-label">Ubicacion</label>
              <div className="input-items__container">
                <MainInput type="text"></MainInput>
                <SecondaryButton >Buscar</SecondaryButton>
               </div>
             </div>
           <p className="location-text">Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
         </div>

         <MainButton className="report-button">Reportar como perdido</MainButton>
         <SecondaryButton >Reportar como encontrado</SecondaryButton>
         <BorderButton >Cancelar</BorderButton>
         {/* <a className="{cs.editMode? "unpublish-pet__link active": "unpublish-pet__link"}">Despublicar</a> */}

       </div>
       </div>
       </div>

        </ReportContainer>
    )
}