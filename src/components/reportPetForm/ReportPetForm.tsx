import React, { useState } from "react";
import { BorderButton, MainButton, SecondaryButton } from "../../ui/buttons";
import { ReportContainer } from "./style";
import { MyDropzone } from "../dropzone/MyDropzone";
import { useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../formInput/FormInput";
import { MapboxSeach } from "../../components/mapbox/Mapbox";
import { useToken, useUserData } from "../../hooks";
import { reportPet } from "../../lib/api";
import { useNavigate
} from "react-router-dom";
import { LargeTitle, ThinText } from "../../ui/texts";

const schema = object({
  name: string().required("Se necesita el nombre de la mascota"),
  image: string().required("Se necesita una imagen de la mascota"),
  locationName: string().required("Debe indicar la ubicacion"),
});

export function ReportPetForm() {
  const navigate = useNavigate()
  //despues cambiar por un hook que solamente me traiga el userData y no el setter (con token lo mismo)
  const [userData, setUserData] = useUserData();
  const [token, setToken] = useToken();
  const [location, setLocation] = useState([]);
  const {
    register,
    handleSubmit,
    clearErrors ,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const formattedData = {
      imageURL:data.image,
      petName: data.name,
      lng:location[0],
      lat:location[1],
      locationName:data.locationName,
    }
    console.log(formattedData)
    const createReport = await reportPet(formattedData,token,userData.id)
    console.log(createReport)
  };

  const uploadURL = (value) => {
    setValue('image',value)
    clearErrors('image');
  };
  function handleMapboxChange(data) {
    // voy agregando data al state interno del form
    setLocation(
      data.coords
    );
    setValue('locationName',data.query)
    clearErrors('locationName');
  }

  return (
    <ReportContainer>
      <div className="container">
        <div className="content">
          <div className="title__container">
          <LargeTitle>Reportar mascota</LargeTitle>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="report-container">
            <div className="form-inputs">
              <FormInput
                id="name"
                register={register}
                error={errors.name}
                label="Nombre"
                name="name"
                type="text"
              />
            </div>
            <MyDropzone
              upload={uploadURL}
              name="image"
              error={errors.image}
              register={register}
              className="dropzone"
            ></MyDropzone>
            <div className="form-inputs">
              <MapboxSeach onChange={handleMapboxChange} register={register} error={errors.locationName}/>
            </div>
            <ThinText className="location-text">
              Buscá un punto de referencia para reportar a tu mascota. Puede ser
              una dirección, un barrio o una ciudad.
            </ThinText>

            <MainButton className="report-button">
              Reportar como perdido
            </MainButton>
          </form>
            <SecondaryButton>Reportar como encontrado</SecondaryButton>
            <BorderButton onClick={() => navigate("/",{replace:true})}>Cancelar</BorderButton>
        </div>
      </div>
    </ReportContainer>
  );
}
