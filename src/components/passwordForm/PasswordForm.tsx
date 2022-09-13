import {signIn } from "../../lib/api";
import React, { useEffect } from "react";
import { MainButton } from "../../ui/buttons";
import { FormContainer } from "./style";
import { useNavigate } from "react-router-dom";
import {useToken, useUserData } from "../../hooks";
import { MainInput } from "../../ui/inputs";
import {string,object} from "yup"
import { yupResolver} from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/formInput/FormInput";

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
        console.log(token);
        
        if(token){
          setToken(token)
          navigate("/",{replace:true})
        }else{
          alert("la contraseña no coincide")
        }
       
    }
    useEffect(()=>{
      console.log("userData updated",token);
      
    },[token])

  return (
    <div>
        <FormContainer>

    <div className="content">
        <form  onSubmit={handleSubmit(onSubmit)}  className="form__container">
        <div className="title__container">
            <h2>Ingrese la contraseña</h2>
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
