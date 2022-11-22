import { yupResolver } from "@hookform/resolvers/yup";
import React, { lazy, Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Loading } from "../../components/loading/Loading";
import { useToken, useUserData } from "../../hooks";
import { reportPet } from "../../lib/api";
import { BorderButton, MainButton } from "../../ui/buttons";
import { LargeTitle, ThinText } from "../../ui/texts";
import { FormInput } from "../formInput/FormInput";
import { ReportContainer } from "./style";

const MyDropzone = lazy(() => import("../dropzone/MyDropzone"));
const MapboxSeach = lazy(() => import("../../components/mapbox/Mapbox"));

const schema = object({
  name: string().required("Se necesita el nombre de la mascota"),
  image: string().required("Se necesita una imagen de la mascota"),
  locationName: string().required("Debe indicar la ubicacion"),
});

function ReportPetForm() {
  const navigate = useNavigate();
  //despues cambiar por un hook que solamente me traiga el userData y no el setter (con token lo mismo)
  const userData = useUserData();
  const token = useToken();
  const [location, setLocation] = useState([]);
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const formattedData = {
      imageURL: data.image,
      petName: data.name,
      lng: location[0],
      lat: location[1],
      locationName: data.locationName,
    };
    const createReport = await reportPet(formattedData, token, userData.id);
    alert("reporte creado");
    navigate("/", { replace: true });
  };

  const uploadURL = (value) => {
    setValue("image", value);
    clearErrors("image");
  };
  function handleMapboxChange(data) {
    // voy agregando data al state interno del form
    setLocation(data.coords);
    setValue("locationName", data.query);
    clearErrors("locationName");
  }

  return (
    <Suspense fallback={<Loading />}>
      <ReportContainer>
        <div className="container">
          <div className="content">
            <div className="title__container">
              <LargeTitle>Reportar mascota</LargeTitle>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="report-container"
            >
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
                <MapboxSeach
                  onChange={handleMapboxChange}
                  register={register}
                  error={errors.locationName}
                />
              </div>
              <ThinText className="location-text">
                Buscá un punto de referencia para reportar a tu mascota. Puede
                ser una dirección, un barrio o una ciudad.
              </ThinText>

              <MainButton className="report-button">
                Reportar como perdido
              </MainButton>
            </form>
            <BorderButton onClick={() => navigate("/", { replace: true })}>
              Cancelar
            </BorderButton>
          </div>
        </div>
      </ReportContainer>
    </Suspense>
  );
}

export { ReportPetForm as default };
