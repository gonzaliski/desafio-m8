import { HamburgerMenu } from "../hamburgerMenu/HamburgerMenu";
import React from "react";
import PawLogo from "../../assets/paw.png";
import css from "./layout.css";
export function Layout() {
  return (
    <div>
      <nav className={css["nav-bar"]}>
        <div className={css["logo-container"]}>
          <img src={PawLogo} className={css["logo-img"]}></img>
          <h2 className="logo-title">Pet Finder</h2>
        </div>
        <ul className={css["nav-menu"]}>
          <li className={css["nav-item"]}>
            <a className={css["nav-link"]}>Mis datos</a>
          </li>
          <li className={css["nav-item"]}>
            <a className={css["nav-link"]}>Mis mascotas reportadas</a>
          </li>
          <li className={css["nav-item"]}>
            <a className={css["nav-link"]}>Reportar mascota</a>
          </li>
          <li className={css["nav-item"]}>
            <a className={css["nav-link near-pets"]}>Mascotas cerca</a>
          </li>
          <li className={css["nav-item"]}>
            <a className={css["nav-link user"]}>
              <i className={css["fa-solid fa-user"]}></i>
            </a>
          </li>
          {/* <div className={css["user-info__container menu"]}>
            <p className={css["user-name__display"]}></p>
            <a id="log-out" className={css["log-out"]}>
              Cerrar sesión
            </a>
          </div> */}
        </ul>
        <HamburgerMenu></HamburgerMenu>
      </nav>
    </div>
  );
}
