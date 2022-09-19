import {signIn } from "../../lib/api";
import React, { useEffect } from "react";
import { MainButton } from "../../ui/buttons";
import { FormContainer } from "./style";
import { useNavigate } from "react-router-dom";
import {useToken, useUserData } from "../../hooks";
import {string,object} from "yup"
import { yupResolver} from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/formInput/FormInput";
import { LargeTitle } from "../../ui/texts";

const schema = object({
  password:string()
  .required('Ingrese su contraseña')
  .matches(
    /^[ A-Za-z0-9]*$/
,
    "Debe contener solamente numeros y/o letras"
  ),
})


export function PasswordForm() {
  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm({
    mode:"onBlur",
    resolver: yupResolver(schema),
  })
    let navigate = useNavigate()
    const [userData,setUserData] = useUserData()
    const [token,setToken] = useToken()
    const onSubmit = async (e)=>{
        let token = await signIn(userData.email, e.password)
        if(token){
          setToken(token)
          navigate("/",{replace:true})
        }else{
          alert("la contraseña no coincide")
        }
       
    }
    useEffect(()=>{
      if(!userData.email){
        navigate("/",{replace:true})
      }
    },[userData.email])

  return (
    <div>
        <FormContainer>

    <div className="content">
        <form  onSubmit={handleSubmit(onSubmit)}  className="form__container">
        <div className="title__container">
            <LargeTitle>Ingrese la contraseña</LargeTitle>
            </div>
          <div className="form-inputs">
            <FormInput type="password" name="password" id="password" register={register} error={errors.password} label="Contraseña"></FormInput>
          </div>
          <MainButton>Ingresar</MainButton>
        </form>
      </div>
        </FormContainer>
    </div>
  );
}
