import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserPets } from "../../hooks";
import {
  SecondarySubtitle,
  Subtitle,
  Success,
  UnderlineText,
} from "../../ui/texts";
import { CardContainer } from "./style";

function PetCard(props) {
  const userPets = useUserPets();
  const navigate = useNavigate();
  function isUserPet(id) {
    const res = userPets.find((p) => p.id == id);
    return res;
  }
  const editPet = () => {
    navigate(`/editPet/${props.id}`, {
      replace: true,
      state: { prevPath: location.pathname },
    });
  };
  const handleReport = (e) => {
    e.preventDefault();
    props.onReportInfo({ id: props.id, name: props.name });
  };

  return (
    <CardContainer>
      <div className={props.found ? "card-container found" : "card-container"}>
        <img className="pet-img" src={props.source}></img>
        <div className="text-container">
          <div>
            <Subtitle>{props.name}</Subtitle>
            <SecondarySubtitle>
              {props.locationName.toUpperCase()}
            </SecondarySubtitle>
            {!isUserPet(props.id) && !props.found && (
              <UnderlineText onClick={handleReport}>
                Reportar información
              </UnderlineText>
            )}
            {props.found && <Success>Encontrado!</Success>}
          </div>
          {isUserPet(props.id) && (
            <FontAwesomeIcon
              onClick={editPet}
              icon={faPen as IconProp}
              className="edit-button"
            />
          )}
        </div>
      </div>
    </CardContainer>
  );
}
export { PetCard as default };
