import React from "react"
import {MdModeEdit} from 'react-icons/md'
import {CardContainer} from './style'

export function PetCard(props){
    return(
        <CardContainer>

        <div className="card-container">
            <img className="pet-img" src={props.source}></img>
            <div className="text-container">
              <div>
                <h3 className="pet-name__title">{props.name}</h3>
                <h5 className="pet-name__title">{(props.locationName).toUpperCase()}</h5>
              </div>
            <MdModeEdit  className="edit-button"></MdModeEdit>
            
            <a className="report-pet-info">Reportar información</a>
            {/* <h3 className="found-title">Encontrado!</h3> */}
            </div>
            {/* <a className="delete-pet__link">Eliminar</a> */}
        </div>
        </CardContainer>
    )
}