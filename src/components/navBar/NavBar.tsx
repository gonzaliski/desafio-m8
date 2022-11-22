import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { lazy, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PawLogo from "../../assets/paw.png";
import { useHandleUserData, useToken } from "../../hooks";
import { LargeTitle, ThinText, UnderlineText } from "../../ui/texts";
import { NavContainer } from "./style";

const HamburgerMenu = lazy(() => import("../hamburgerMenu/HamburgerMenu"));

export default function NavBar() {
  const [token, setToken] = useToken();
  let navigate = useNavigate();
  const [userData, setUserData] = useHandleUserData();
  const [clicked, setClicked] = useState(false);
  const [userInfoClicked, setUserInfoClicked] = useState(false);
  function handleClick() {
    setClicked(!clicked);
  }
  const showUserInfo = () => {
    if (!token) {
      navigate("/checkEmail", { replace: true });
    } else {
      handleUserInfo();
    }
  };

  function handleUserInfo() {
    setUserInfoClicked(!userInfoClicked);
  }

  const logOut = () => {
    handleClick();
    setUserInfoClicked(!userInfoClicked);
    setUserData({});
    setToken("");
    navigate("/", { replace: true });
  };

  return (
    <div>
      <NavContainer>
        <nav className={"nav-bar"}>
          <div
            className={"logo-container"}
            onClick={() => {
              navigate("/");
            }}
          >
            <img alt="paw-image" width="40px" height="34px" src={PawLogo}></img>
            <LargeTitle>Pet Finder</LargeTitle>
          </div>
          <ul className={`nav-menu ${clicked ? "active" : ""}`}>
            <Link
              onClick={() => handleClick()}
              className={"nav-link"}
              to={token ? "/myData" : "/checkEmail"}
            >
              Mis datos
            </Link>
            <Link
              onClick={() => handleClick()}
              className={"nav-link"}
              to={token ? "/myReportedPets" : "/checkEmail"}
            >
              Mis mascotas reportadas
            </Link>
            <Link
              onClick={() => handleClick()}
              className={"nav-link"}
              to={token ? "/reportPet" : "/checkEmail"}
            >
              Reportar mascota
            </Link>
            <a onClick={showUserInfo} className={"nav-link user"}>
              <FontAwesomeIcon icon={faUser as IconProp} />
            </a>
            <div
              className={`user-info__container menu ${
                userInfoClicked ? "active" : ""
              }`}
            >
              {token ? (
                <>
                  <ThinText>{userData.email}</ThinText>
                  <UnderlineText
                    onClick={logOut}
                    className={`log-out ${!token ? "disabled" : ""}`}
                  >
                    Cerrar sesión
                  </UnderlineText>
                </>
              ) : null}
            </div>
          </ul>
          <div className="hamburger-container">
            <HamburgerMenu
              clicked={clicked}
              handleClick={() => handleClick()}
            />
          </div>
        </nav>
      </NavContainer>
    </div>
  );
}
