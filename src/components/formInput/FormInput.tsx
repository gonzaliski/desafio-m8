import React from "react"
import { MainInput, TextAreaInput } from "../../ui/inputs"
import { ErrorText } from "../../ui/texts"

export function FormInput(props:inputProps){
    const {id,label,register,error,large,...inputProps} = props
    return (<div>
            <label htmlFor={id} style={{display:"block"}}>{label}</label>
            {!large ? <MainInput id={id} register={register} {...inputProps}></MainInput>
            :<TextAreaInput id={id} register={register} {...inputProps}></TextAreaInput>}
            { error && <ErrorText>{error.message}</ErrorText>}
        </div>)
    
}