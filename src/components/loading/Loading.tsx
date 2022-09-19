import React from "react"
import { Oval } from "react-loader-spinner";
import css from "./loading.css"
export function Loading(){
    return (
        <div className={css["container"]}>
           <Oval
            height={80}
            width={80}
            color="var(--main-color)"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="var(--border-color)"
            strokeWidth={2}
            strokeWidthSecondary={2}
            />
        </div>

    )
}