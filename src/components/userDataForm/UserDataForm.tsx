import { getUser, signUp, updateUser } from "../../lib/api";
import React, { useState } from "react";
import { MainButton } from "../../ui/buttons";
import { useNavigate } from "react-router-dom";
import { useToken, useUserData } from "../../hooks";
import {MyDataContainer} from "./style"
import { useForm } from "react-hook-form"
import {string,object, ref} from "yup"
import { yupResolver} from "@hookform/resolvers/yup"
import {LargeTitle } from "../../ui/texts"
import { FormInput } from "../formInput/FormInput"

const newUserSchema = object({
  name:string().required('Ingrese su nombre'),
  password:string()
  .required('Ingrese su contraseña')
  .matches(
    /^[ A-Za-z0-9]*$/
,
    "Debe contener solamente numeros y/o letras"
  ),
  passwordConfirmation:string()
  .oneOf([ref('password'), null], 'Las contraseñas deben coincidir')
})
const updateUserSchema = object({
  name:string(),
  password:string()
  .matches(
    /^[ A-Za-z0-9]*$/
,
    "Debe contener solamente numeros y/o letras"
  ),
  passwordConfirmation:string()
  .oneOf([ref('password'), null], 'Las contraseñas deben coincidir')
})

export function UserDataForm() {
  const [token,setToken]= useToken()
  let schema = token ? updateUserSchema : newUserSchema 
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
    const [submited,setSubmited] = useState(false)


    const onSubmit = async(e) =>{
        console.log(e);
        //todo fetch Api
        const userExist = await getUser(userData.email)
        console.log("existe en la DB",userExist);
        let res
        if(userExist){
        res = await updateUser({
            fullName:e.name,
            password:e.password,
            token,
            id:userData.id} )
        }else{
            console.log("a");
            
            res = await signUp({
                email:userData.email,
                fullName:e.name,
                password:e.password
            })
        }
        console.log(res);
        if(res.fullName){
          setUserData(prev =>({
            ...prev,
            fullName:res.fullName
          }))
        }
        setSubmited(true)
        setTimeout(()=>{
          navigate(`/`, { replace: true })
        },2000)   
        
    }

  return submited ? 
    token ?
      ( <div>
          <LargeTitle>Cambios realizados correctamente!</LargeTitle>
        </div>)
        :
        ( <div>
          <LargeTitle>Registrado correctamente!</LargeTitle>
        </div>)
  : 
     (
        <MyDataContainer>

        <div className="content">
            <form className="form__container" onSubmit={ handleSubmit(onSubmit)}>
            <div className="title__container">
              <LargeTitle>Mis Datos</LargeTitle>
            </div>
                  {/* <input className="form-input name" name="name" type="text" placeholder={${cs.fullName || ""}}></input> */}
                  <FormInput type="text" name="name" id="name" register={register} error={errors.name} label="Nombre"
                  defaultValue={token ? userData.fullName : ""}></FormInput>
                 <FormInput type="password" name="password" id="password"register={register} error={errors.password} label="Contraseña"></FormInput>
                 <FormInput type="password" name="passwordConfirmation" id="passwordConfirmation" register={register} 
                 error={errors.passwordConfirmation} label="Confirmar contraseña" ></FormInput>
              <MainButton>Guardar</MainButton>
            </form>
          </div>
        </MyDataContainer>
  );
}