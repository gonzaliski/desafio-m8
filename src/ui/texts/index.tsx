import React from "react"
import css from "./texts.css"
export function LargeTitle(props){
    return <h2>{props.children}</h2>
}

export function Subtitle(props){
    return <h3>{props.children}</h3>
}

export function DisabledSubTitle(props){
    return <h3 className={css["disabled"]}>{props.children}</h3>
}

export function SecondarySubtitle(props){
    return <h5>{props.children}</h5>
}

export function ThinText(props){
    return <span className={css["thin"]}>{props.children}</span>
}

export function ErrorText(props){
    return <span className={css["error"]}>{props.children}</span>
}

export function UnderlineText(props){
    return <a onClick={props.onClick} className={css["underline"]}>{props.children}</a>
}

