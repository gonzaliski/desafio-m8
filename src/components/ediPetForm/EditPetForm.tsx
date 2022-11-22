import React, { lazy, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToken, useUserPets } from "../../hooks";
import { deletePet, reportFound, updatePet } from "../../lib/api";
import { BorderButton, MainButton, SecondaryButton } from "../../ui/buttons";
import { LargeTitle, ThinText, UnderlineText } from "../../ui/texts";
import { FormInput } from "../formInput/FormInput";
import { ReportContainer } from "../reportPetForm/style";

const MyDropzone = lazy(() => import("../dropzone/MyDropzone"));
const MapboxSeach = lazy(() => import("../mapbox/Mapbox"));

function EditPetForm() {
  const pathLocation = useLocation();
  const navigate = useNavigate();
  const { prevPath } = pathLocation.state as prevPathState;
  const userPets = useUserPets();
  const [pet, setPet] = useState({} as petData);
  const param = useParams();
  //despues cambiar por un hook que solamente me traiga el userData y no el setter (con token lo mismo)
  const token = useToken();
  const [location, setLocation] = useState([]);
  const { handleSubmit, setValue, register } = useForm();

  const getPet = () => {
    return userPets.find((p) => p.id == param.id);
  };

  const onSubmit = async (data) => {
    const formattedData = {
      imageURL: data.image,
      petName: data.name,
      lng: location[0],
      lat: location[1],
      locationName: data.locationName,
    };
    const createReport = await updatePet(formattedData, token, pet.id);
    console.log(createReport);
    alert("Mascota actualizada");
    backToPrev();
  };

  const uploadURL = (value) => {
    setValue("image", value);
  };
  async function setFound() {
    await reportFound(pet.id, token);
    alert("Mascota actualizada");
    backToPrev();
  }
  function handleMapboxChange(data) {
    // voy agregando data al state interno del form
    setLocation(data.coords);
    setValue("locationName", data.query);
  }
  function backToPrev() {
    navigate(`${prevPath}`, { replace: true });
  }
  async function deleteActualPet() {
    await deletePet(pet.id, token);
    alert("Mascota despublicada");
    backToPrev();
  }

  useEffect(() => {
    const foundPet = getPet();
    setPet(foundPet);
    console.log(foundPet);

    if (!foundPet) {
      backToPrev();
    }
  }, [param]);

  return (
    <ReportContainer>
      <div className="container">
        <div className="content">
          <div className="title__container">
            <LargeTitle>Editar mascota</LargeTitle>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="report-container">
            <div className="form-inputs">
              <FormInput
                id="name"
                register={register}
                error={undefined}
                label="Nombre"
                name="name"
                type="text"
                defaultValue={pet.name}
              />
            </div>
            <MyDropzone
              upload={uploadURL}
              existingImage={pet.imageURL}
              name="image"
              error={undefined}
              register={undefined}
              className="dropzone"
            ></MyDropzone>
            <div className="form-inputs">
              <MapboxSeach
                onChange={handleMapboxChange}
                register={register}
                error={undefined}
                defaultValue={pet.locationName}
              />
            </div>
            <ThinText className="location-text">
              Buscá un punto de referencia para reportar a tu mascota. Puede ser
              una dirección, un barrio o una ciudad.
            </ThinText>

            <MainButton>Guardar</MainButton>
          </form>
          <SecondaryButton onClick={() => setFound()}>
            Reportar como encontrado
          </SecondaryButton>
          <BorderButton onClick={() => backToPrev()}>Cancelar</BorderButton>
          <UnderlineText
            onClick={() => deleteActualPet()}
            className="unpublish"
          >
            Despublicar
          </UnderlineText>
        </div>
      </div>
    </ReportContainer>
  );
}

export { EditPetForm as default };
