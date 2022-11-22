import React from "react";
import css from "./inputs.css";
console.log(css);

export function MainInput({ id, register, ...inputProps }) {
  return (
    <input
      id={id}
      {...(register ? { ...register(id) } : undefined)}
      {...inputProps}
      className={css["search__input"]}
    ></input>
  );
}

export function TextAreaInput({ id, register, ...inputProps }) {
  return (
    <textarea
      id={id}
      {...(register ? { ...register(id) } : undefined)}
      {...inputProps}
      className={css["search__input"]}
      rows="5"
    ></textarea>
  );
}
