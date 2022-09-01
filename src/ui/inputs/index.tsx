import React from "react"
import css from "./inputs.css"
console.log(css);

export function SearchInput(){
    return <input type="text" name="search" className={css["search__input"]}></input>
}