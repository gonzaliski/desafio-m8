import { processEmail, signIn } from "../../lib/api";
import React, { useEffect } from "react";
import { MainButton } from "../../ui/buttons";
import { FormContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { processUserData, useToken, useUserData } from "../../hooks";
import { MainInput } from "../../ui/inputs";

export function Password() {
    let navigate = useNavigate()
    const [userData,setUserData] = useUserData()
    const [token,setToken] = useToken()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        let token = await signIn(userData.email, e.target.password.value)
        if(token){
          setToken(token)
        }else{
          alert("la contraseña no coincide")
        }
        console.log("token", token);
        console.log(e.target.password.value);
    }
    useEffect(()=>{
      console.log("userData updated",token);
      
    },[token])

  return (
    <div>
        <FormContainer>

    <div className="content">
        <form  onSubmit={handleSubmit}  className="form__container">
        <div className="title__container">
            <h2>Ingrese la contraseña</h2>
            </div>
          <div className="form-inputs">
            <label className="form-label">Contraseña</label>
            <MainInput type="password" name="password"></MainInput>
          </div>
          <MainButton>Ingresar</MainButton>
        </form>
      </div>
        </FormContainer>
    </div>
  );
}
