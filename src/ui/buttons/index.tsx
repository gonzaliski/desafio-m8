import React from "react";
import css from "./buttons.css";

export function MainButton(props) {
  return (
    <button onClick={props.onClick} className={css["main"]}>
      {props.children}
    </button>
  );
}

export function SecondaryButton(props) {
  return (
    <button onClick={props.onClick} className={css["secondary"]}>
      {props.children}
    </button>
  );
}

export function BorderButton(props) {
  return (
    <button onClick={props.onClick} className={css["border"]}>
      {props.children}
    </button>
  );
}
