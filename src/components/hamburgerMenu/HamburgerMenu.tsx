import React,{useState} from "react"
import css from "./hamburgerMenu.css"
export function HamburgerMenu(){
    const [active, setActiveValue] = useState(false)
    const [hamburgerClass, sethamburgerClass] = useState(css["hamburger-menu"])
    const toggleActive = ()=>{
        if(!active){
            sethamburgerClass(css["hamburger-menu-active"])
        }else{
            sethamburgerClass(css["hamburger-menu"])
        }
        
        setActiveValue(!active)
    }
    return(
        <div className={hamburgerClass} onClick={toggleActive} >
            <span className={css["bar"]}></span>
            <span className={css["bar"]}></span>
            <span className={css["bar"]}></span>
      </div>
    )
}