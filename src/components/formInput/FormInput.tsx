import React from "react"
import { MainInput } from "../../ui/inputs"
import { ErrorText } from "../../ui/texts"

export function FormInput({id,register,error,label, ...inputProps}){
    
    return (<div>
            <label htmlFor={id} style={{display:"block"}}>{label}</label>
            <MainInput id={id} register={register} {...inputProps}></MainInput>
            { error && <ErrorText>{error.message}</ErrorText>}
        </div>)
    
}