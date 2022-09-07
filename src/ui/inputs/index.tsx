import React from "react"
import css from "./inputs.css"
console.log(css);

export function MainInput(props){
    return <input type={props.type || "text"} name={props.name} onChange={props.onChange}
    onBlur={props.onBlur} value={props.value} placeholder={props.placeholder} className={css["search__input"]}></input>
}