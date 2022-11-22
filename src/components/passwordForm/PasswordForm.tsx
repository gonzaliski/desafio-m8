import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { FormInput } from "../../components/formInput/FormInput";
import { useHandleToken, useToken, useUserData } from "../../hooks";
import { signIn } from "../../lib/api";
import { MainButton } from "../../ui/buttons";
import { LargeTitle } from "../../ui/texts";
import { FormContainer } from "./style";

const schema = object().shape({
  password: string()
    .required("Ingrese su contraseña")
    .matches(/^[ A-Za-z0-9]*$/, "Debe contener solamente numeros y/o letras"),
});

function PasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  let navigate = useNavigate();
  const userData = useUserData();
  const [token, setToken] = useHandleToken();
  const onSubmit = async (e) => {
    let token = await signIn(userData.email, e.password);
    if (token) {
      setToken(token);
      navigate("/", { replace: true });
    } else {
      alert("la contraseña no coincide");
    }
  };
  useEffect(() => {
    if (!userData.email) {
      navigate("/", { replace: true });
    }
  }, [userData.email]);

  return (
    <div>
      <FormContainer>
        <div className="content">
          <form onSubmit={handleSubmit(onSubmit)} className="form__container">
            <div className="title__container">
              <LargeTitle>Ingrese la contraseña</LargeTitle>
            </div>
            <div className="form-inputs">
              <FormInput
                type="password"
                name="password"
                id="password"
                register={register}
                error={errors.password}
                label="Contraseña"
              ></FormInput>
            </div>
            <MainButton>Ingresar</MainButton>
          </form>
        </div>
      </FormContainer>
    </div>
  );
}
export { PasswordForm as default };
