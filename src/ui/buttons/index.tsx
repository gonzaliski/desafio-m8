import React from "react"
import css from "./buttons.css"

export function MainButton(props){
    return <button onClick={props.onClick} className={css['my-button']}>{props.children}</button>
}

export function SecondaryButton({children}){
    return <button className={css['my-button secondary']}>{children}</button>
}

export function BorderButton({children}){
    return <button className={css['my-button border']}>{children}</button>
}