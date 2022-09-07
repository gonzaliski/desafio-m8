import { processEmail } from "../../lib/api";
import React from "react";
import { MainButton } from "../../ui/buttons";
import { MainInput } from "../../ui/inputs";
import { FormContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { processUserData, useUserData } from "../../hooks";

export function CheckEmail() {
    let navigate = useNavigate()
    const [userData,setUserData] = useUserData()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(e.target.email.value);
        const res = await processEmail(e.target["email"].value)
      if(res!=null){
        console.log(res);
        let data = processUserData(res)
        console.log(data);
        setUserData(data)
        console.log(userData);
        
        navigate(`/password`, { replace: true });
        // Router.go("/password")
    }else{
        setUserData({email:e.target.email.value})
        console.log(userData);
        
        navigate(`/myData`, { replace: true });
        // Router.go("/myData")
      }
      
    }

  return (
    <div>
        <FormContainer>

    <div className="content">
        <form  onSubmit={handleSubmit}  className="form__container">
            <div className="title__container">
            <h2>Ingresar</h2>
            </div>
          <div className="form-inputs">
            <label className="form-label">Email</label>
             <MainInput type="email" name="email"></MainInput>
          </div>
          <MainButton >Siguiente</MainButton>
        </form>
      </div>
        </FormContainer>
    </div>
  );
}
