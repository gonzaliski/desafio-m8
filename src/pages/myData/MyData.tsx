import { getUser, processEmail, signUp, updateUser } from "../../lib/api";
import React, { useState } from "react";
import { MainButton } from "../../ui/buttons";
import { MainInput } from "../../ui/inputs";
import { useNavigate } from "react-router-dom";
import { useToken, useUserData } from "../../hooks";
import {MyDataContainer} from "./style"

export function MyData() {
    let navigate = useNavigate()
    const [input, setInput] = useState({
        name: '',
        password: '',
        confirmPassword: ''
      });
      const [error, setError] = useState({
        name: '',
        password: '',
        confirmPassword: ''
      })
    const [userData,setUserData] = useUserData()
    const [token,setToken]= useToken()
    const [submited,setSubmited] = useState(false)

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
          ...prev,
          [name]: value
        }));
        if(!token) validateInput(e);
        
      }
      function validateInput(e){
          let { name, value } = e.target;
        
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
       
          switch (name) {
            case "name":
              if (!value) {
                stateObj[name] = "Ingrese su nombre";
              }
              break;
       
            case "password":
              if (!value) {
                stateObj[name] = "Ingrese una contraseña";
              } else if (input.confirmPassword && value !== input.confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
              }
              break;
       
            case "confirmPassword":
              if (!value) {
                stateObj[name] = "Debe confirmar la contraseña";
              } else if (input.password && value !== input.password) {
                stateObj[name] = "La contraseñas no coinciden";
              }
              break;
       
            default:
              break;
          }
       
          return stateObj;
        });
      }

    const handleSubmit = async(e) =>{
        console.log("e");
        
        e.preventDefault()
        //todo fetch Api
        const userExist = await getUser(userData.email)
        console.log("existe en la DB",userExist);
        let res
        if(userExist){
        res = await updateUser({
            fullName:input.name,
            password:input.password,
            token,
            id:userData.id} )
        }else{
            console.log("a");
            
            res = await signUp({
                email:userData.email,
                fullName:input.name,
                password:input.password
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
        <h2>Cambios realizados correctamente!</h2>
      </div>)
      :
      ( <div>
        <h2>Registrado correctamente!</h2>
      </div>)
  : 
     (
        <MyDataContainer>

        <div className="content">
            <form className="form__container" onSubmit={ handleSubmit}>
            <div className="title__container">
              <h2>Mis Datos</h2>
            </div>
              <ul className="form-inputs">
                <li>
                <label className="form-label">Nombre</label>
                {/* <input className="form-input name" name="name" type="text" placeholder={${cs.fullName || ""}}></input> */}
               <MainInput type="text" name="name" value={input.name} onChange={onInputChange} onBlur={!token && validateInput}
               placeholder={userData.fullName}></MainInput>
               {error.name && <span className='err'>{error.name}</span>}
                </li>
          
                <li>
                <label className="form-label">Contraseña</label>
                <li>
                <MainInput type="password" name="password" value={input.password} onChange={onInputChange} 
                onBlur={!token && validateInput}></MainInput>
                {error.password && <span className='err'>{error.password}</span>}
                </li>
              <label className="form-label">Repetir contraseña</label>
              <li>
              <MainInput type="password" name="confirmPassword" value={input.confirmPassword} onChange={onInputChange} 
              onBlur={!token && validateInput}></MainInput>
              {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
              </li>
                </li>
              </ul>
              <MainButton>Guardar</MainButton>
            </form>
          </div>
        </MyDataContainer>
  );
}
