import React from "react";
import { processEmail } from "../../lib/api";
import { MainButton } from "../../ui/buttons";
import { FormContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { processUserData, useUserData } from "../../hooks";
import {string,object} from "yup"
import { yupResolver} from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/formInput/FormInput";
import { LargeTitle } from "../../ui/texts";

const schema = object({
  email:string().email('Debe ingresar un email válido').required('Se necesita un email'),
})



export function EmailForm() {
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
    const onSubmit = async (e)=>{
        console.log(e.email);
        const res = await processEmail(e.email)
      if(res!=null){
        console.log(res);
        
        let data = processUserData(res)
        setUserData(data)
        navigate(`/password`, { replace: true });
    }else{
        setUserData({email:e.email})
        navigate(`/myData`, { replace: true });
      }
    }

  return (
    <div>
        <FormContainer>

    <div className="content">
        <form  onSubmit={handleSubmit(onSubmit)}  className="form__container">
            <div className="title__container">
            <LargeTitle>Ingresar</LargeTitle>
            </div>
          <div className="form-inputs">
             <FormInput type="email" name="email" id="email" register={register} error={errors.email} label="Email"></FormInput>
          </div>
          <MainButton >Siguiente</MainButton>
        </form>
      </div>
        </FormContainer>
    </div>
  );
}
