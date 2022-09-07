import { HamburgerMenu } from "../hamburgerMenu/HamburgerMenu";
import React, { useState } from "react";
import PawLogo from "../../assets/paw.png";
import styled from "styled-components";
import {FaUserAlt} from "react-icons/fa"
import { Link } from "react-router-dom";
import { useToken,useUserData } from "../../hooks";
export function NavBar() {
  const [token, setToken] = useToken()
  const [userData, setUserData] = useUserData()
  const [clicked, setClicked] = useState(false);
  const [userInfoClicked, setUserInfoClicked] = useState(false)
  const handleClick = () => {
    setClicked(!clicked);
  };
  const showUserInfo = ()=>{
    setUserInfoClicked(!userInfoClicked)
  }
  const logOut = ()=>{
    setUserData({})
    setToken("")
  }

  return (
    <div>
      <NavContainer>
        <nav className={"nav-bar"}>
          <div className={"logo-container"}>
            <Link  to={"/"}>
            <img src={PawLogo} className={"logo-img"}>

            </img>
            </Link>
            <h2 className="logo-title">Pet Finder</h2>
          </div>
          <ul className={`nav-menu ${clicked ? 'active' : ''}`}>
              <Link onClick={handleClick} className={"nav-link"} to={token ? "/myData" : "/checkEmail"}>Mis datos</Link>
              <Link onClick={handleClick} className={"nav-link"} to={token ? "/myReportedPets" : "/checkEmail"}>Mis mascotas reportadas</Link>
              <Link onClick={handleClick} className={"nav-link"} to={token ? "/reportPet" : "/checkEmail"}>Reportar mascota</Link> 
              <a onClick={showUserInfo} className={"nav-link user"}>
                <FaUserAlt></FaUserAlt>
              </a>
            <div  className={`user-info__container menu ${userInfoClicked ? 'active' : ''}`}>
            <p className={"user-name__display"}>{token ? userData.email : ""}</p>
            <a onClick={logOut}className={`log-out ${!token ? 'disabled' : ''}`}>
            Cerrar sesión
            </a>
        </div>
          </ul>
          <div className="hamburger-container">
          <HamburgerMenu
            clicked={clicked}
            handleClick={handleClick}
            />
            </div>
        </nav>
      </NavContainer>
    </div>
  );
}
const NavContainer = styled.nav`
  .nav-bar {
    font-family: "Poppins";
    background-color: var(--main-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 14px 20px 14px;
    height: var(--header-height);
  }
  .logo-container {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    .logo-container {
      gap: 10px;
    }
  }

  .line {
    background-color: black;
    height: 5px;
    width: 52px;
  }
  li {
    list-style: none;
  }

  .nav-menu {
    display: flex;
    position: fixed;
    height: auto;
    left: -100%;
    top: 70px;
    gap: 0;
    flex-direction: column;
    background-color: #d95b5b;
    width: 100%;
    gap: 30px;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    box-shadow: 0px 20px 25px -10px rgba(0, 0, 0, 0.5);
  }
  @media (min-width: 768px) {
    .nav-menu {
      flex-direction: row;
      position: static;
      width: auto;
      height: 100%;
      background-color: transparent;
      gap: 30px;
      box-shadow: none;
    }
    .user-info__container.menu {
      display: flex;
      position: fixed;
      height: 15%;
      right: 0;
      top: -700px;
      gap: 0;
      flex-direction: column;
      background-color: #d95b5b;
      width: 30%;
      gap: 30px;
      transition: 0.3s;
      justify-content: center;
      box-shadow: 0px 20px 25px -10px rgb(0 0 0 / 50%);
      z-index: -1;
      align-items: center;
    }
    burger-menu {
      display: none;
    }
  }
  .nav-menu.active {
    position: absolute;
    top: 70px;
    padding: 5% 0 ;
    left: 0;
    z-index: 9;
  }
  .nav-link {
    text-decoration: none;
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    transition: 0.7s ease;
    cursor: pointer;
  }
  .nav-link:hover {
    color: white;
  }

  .nav-link.user {
    display: none;
  }
  @media (min-width: 768px) {
    .nav-link.user {
      display: inline;
    }
  }
  .user-info__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    padding-bottom: 10px;
  }

  .log-out {
    color: blue;
    text-decoration: underline blue;
    cursor: pointer;
  }
  .log-out.disabled {
    display:none;
  }

  .user-info__container.menu.active {
    position: absolute;
    top: 0;
    height:20%;
    padding-bottom:20px;
    gap:5px;
    z-index: -1;
    justify-content:flex-end;
  }

  .nav-link.user:active {
    color: white;
  }
  @media(min-width:768px){
      .hamburger-container{
        display:none;         
    }
}

`;
