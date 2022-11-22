import React from "react";
import { MainButton } from "../../ui/buttons";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/formInput/FormInput";
import { LargeTitle } from "../../ui/texts";
import css from "./reportInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { reportInfo } from "../../lib/api";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const schema = object({
  name: string().required("Ingrese su nombre"),
  phoneNumber: string()
    .matches(/[0-9]{7}/, "Debe ingresar un numero valido")
    .required("Se necesita un telefono de contacto"),
  information: string().required("Por favor, indique alguna referencia"),
});

function ReportInfo(props) {
  const { pet } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    props.onClose();
  };

  const onSubmit = async (data) => {
    console.log(data);
    const formattedData = {
      lastSeenLocation: data.information,
      phoneNumber: data.phoneNumber,
      reporterName: data.name,
      petName: pet.name,
    };
    const res = await reportInfo(formattedData, pet.id);
    if (res) {
      alert("Se ha enviado el reporte");
      handleClose();
    }
  };

  return (
    <div className={css["container"]}>
      <div className={css["content"]}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={css["form__container"]}
        >
          <div>
            <div onClick={handleClose} className={css["close__content"]}>
              <FontAwesomeIcon icon={faX as IconProp} />
            </div>
          </div>
          <div className={css["title__container"]}>
            <LargeTitle>Reportar info de {props.pet.name}</LargeTitle>
          </div>
          <FormInput
            id="name"
            register={register}
            error={errors.name}
            label="Nombre"
          />
          <FormInput
            id="phoneNumber"
            register={register}
            error={errors.phoneNumber}
            label="Nro. Telefono"
          />
          <FormInput
            id="information"
            large="true"
            register={register}
            error={errors.information}
            label="¿Donde lo viste?"
          />
          <MainButton>Enviar</MainButton>
        </form>
      </div>
    </div>
  );
}
export { ReportInfo as default };
