import React, { useState } from "react";
import { BorderButton, MainButton, SecondaryButton } from "../../ui/buttons";
import { MainInput } from "../../ui/inputs";
import { ReportContainer } from "./style";
import { MyDropzone } from "../dropzone/MyDropzone";
import { useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorText } from "../../ui/texts";
import { FormInput } from "../formInput/FormInput";
import { MapboxSeach } from "../../components/mapbox/Mapbox";

const schema = object({
  name: string().required("Se necesita el nombre de la mascota"),
  image: string().required("Se necesita una imagen de la mascota"),
  locationName: string().required("Debe indicar la ubicacion"),
});

export function ReportPetForm() {
  const [imgURL, setImgURL] = useState("");
  const [location, setLocation] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    clearErrors ,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {

    console.log("la data",data)
  };

  const uploadURL = (value) => {
    setImgURL(value);
    setValue('image',value)
    clearErrors('image');
  };
  function handleMapboxChange(data) {
    // voy agregando data al state interno del form
    setLocation({
      data
    });
    setValue('locationName',data.query)
    clearErrors('locationName');
  }
  console.log(location);


  return (
    <ReportContainer>
      <div className="container">
        <div className="content">
          <div className="title__container">
            {/* <h2>{cs.editMode ? "Editar" : "Reportar"} mascota perdida</h2> */}
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
            <p className="location-text">
              Buscá un punto de referencia para reportar a tu mascota. Puede ser
              una dirección, un barrio o una ciudad.
            </p>

            <MainButton className="report-button">
              Reportar como perdido
            </MainButton>
          </form>
            <SecondaryButton>Reportar como encontrado</SecondaryButton>
            <BorderButton onClick={() => reset()}>Cancelar</BorderButton>
            {/* <a className="{cs.editMode? "unpublish-pet__link active": "unpublish-pet__link"}">Despublicar</a> */}
        </div>
      </div>
    </ReportContainer>
  );
}
